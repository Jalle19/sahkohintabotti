#!/bin/bash

set -euo pipefail

rm -rf "$TTX_OUTPUT_DIRECTORY"
mkdir -p "$TTX_OUTPUT_DIRECTORY"

echo "Generating TTI files from $MPEGTS_OUTPUT_PATH, PID $TELETEXT_PID, output directory $TTX_OUTPUT_DIRECTORY"

/usr/local/bin/TtxFromTS \
  -i "$MPEGTS_OUTPUT_PATH" \
  --pid "$TELETEXT_PID" \
  --no-config \
  -o "$TTX_OUTPUT_DIRECTORY"

NUM_TTX_FILES=$(ls -1q "$TTX_OUTPUT_DIRECTORY" | wc -l)

test $NUM_TTX_FILES -gt 0

echo "TTI generation done"
