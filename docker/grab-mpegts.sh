#!/bin/bash

set -euo pipefail

echo "Grabbing MPEG-TS from $MPEGTS_URL, saving to $MPEGTS_OUTPUT_PATH"
rm -f "$MPEGTS_OUTPUT_PATH"

timeout 30 \
  wget "$MPEGTS_URL" \
  -q -O "$MPEGTS_OUTPUT_PATH" || true

test -s "$MPEGTS_OUTPUT_PATH"

echo "Grab done"
