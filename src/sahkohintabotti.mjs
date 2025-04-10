import { writeFileSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import yargs from 'yargs'
import { WebClient } from '@slack/web-api'
import { getRandomComment } from './comments.mjs'
import * as fs from 'node:fs'
import { Readable, finished } from 'stream'

const argv = yargs(process.argv.slice(2))
  .usage('node $0 [options]')
  .options({
    'ttiBaseUrl': {
      description: 'The URL to a location containing .tti files',
      demand: true,
      alias: 't',
    },
    'ttiPage': {
      description: 'The teletext page number to use',
      default: 189,
      alias: 'p',
    },
    'outputPath': {
      description: 'The directory to place output files in',
      demand: true,
      alias: 'o',
    },
  }).argv

// Construct paths to the TTI and PNG files
const ttiPath = `${argv.outputPath}/P${argv.ttiPage}.tti`
const pngFilePath = `${argv.outputPath}/${argv.ttiPage}-0.png`

;(async () => {
  // Remove any leftovers from the previous run
  console.log('Cleaning up potential leftovers from previous run')
  rmSync(ttiPath, { force: true })
  rmSync(pngFilePath, { force: true })

  // Acquire the TTI file
  const ttiUrl = `${argv.ttiBaseUrl}/P${argv.ttiPage}.tti`
  console.log(`Downloading ${ttiUrl}`)
  const response = await fetch(ttiUrl)
  let body = await response.text()
  const originalBody = body

  // Replace some strings
  body = body.replace('YLE TEKSTI-TV', 'NITOR SLACK')
    .replace('YLE TEKSTI-Tv', 'NITOR SLACK')
    .replace('Nord Pool', 'Nitor')
    .replace('P|rssis{hk|', 'S{hk|asiat')

  // Save to disk
  console.log(`Saving as ${ttiPath}`)
  writeFileSync(ttiPath, body)

  // Call TTI2IMG
  execFileSync('/usr/local/bin/TTI2IMG', ['-i', ttiPath, '-o', argv.outputPath])
  console.log(`Output file is ${pngFilePath}`)

  // Fall back to Yle image if parsing failed
  if (!originalBody.includes("Nord Pool")) {
    const appId = process.env.YLE_APP_ID
    const appKey = process.env.YLE_APP_KEY

    const yleResponse = await fetch(`https://external.api.yle.fi/v1/teletext/images/189/1.png?app_id=${appId}&app_key=${appKey}`)
    const readStream = Readable.fromWeb(yleResponse.body)
    const stream = fs.createWriteStream(pngFilePath)

    await readStream.pipe(stream)
    console.log(`Fell back to YLE image`)
  }

  // Post to Slack
  const channelId = process.env.CHANNEL_ID
  const botToken = process.env.BOT_TOKEN
  const web = new WebClient(botToken)

  const uploadResult = await web.filesUploadV2({
    channel_id: channelId,
    file: pngFilePath,
    filename: `${Date.now()}-${argv.ttiPage}.png`,
    initial_comment: getRandomComment(),
  })

  console.dir(uploadResult.files[0].files)
})()
