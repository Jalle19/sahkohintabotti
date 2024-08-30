import { writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import yargs from 'yargs'
import { WebClient } from '@slack/web-api'
import {getRandomComment} from './comments.mjs'

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

;(async () => {
  // Acquire the TTI file
  const ttiUrl = `${argv.ttiBaseUrl}/P${argv.ttiPage}.tti`
  console.log(`Downloading ${ttiUrl}`)
  const response = await fetch(ttiUrl)
  let body = await response.text()

  // Replace some strings
  body = body.replace('YLE TEKSTI-TV', 'NITOR SLACK')
    .replace('Nord Pool', 'Nitor')
    .replace('P|rssis{hk|', 'S{hk|asiat')

  // Save to disk
  const ttiPath = `${argv.outputPath}/P${argv.ttiPage}.tti`
  console.log(`Saving as ${ttiPath}`)
  writeFileSync(ttiPath, body)

  // Call TTI2IMG
  execFileSync('/usr/local/bin/TTI2IMG', ['-i', ttiPath, '-o', argv.outputPath])
  const pngFilePath = `${argv.outputPath}/${argv.ttiPage}-0.png`
  console.log(`Output file is ${pngFilePath}`)

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
