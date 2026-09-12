#!/bin/bash

set -euo pipefail

timeout 30 \
  wget "$MPEGTS_URL" \
  -q -O "$MPEGTS_OUTPUT_PATH" || true

test -s "$MPEGTS_OUTPUT_PATH"
