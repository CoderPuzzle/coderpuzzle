#!/usr/bin/env bash
# Format files (or check them) with coderpuzzle's pinned toolchain, without
# installing anything locally — the runner image carries every formatter.
#
#   scripts/format.sh path/to/file.go …        format in place
#   scripts/format.sh --check problems-adapt   report unformatted, exit 1
#   scripts/format.sh --report json file.py    tri-state JSON per file:
#                                              formatted | unformatted
#                                              (+formatted text) |
#                                              error (+diagnostics)
#
# Everything after the flags is forwarded to `coderpuzzle format` in the
# image; paths are relative to the current directory, which is mounted
# at /work inside the container.
#
# The checkout's runner/cli.py is bind-mounted over the image's copy so
# the wrapper always matches the working tree, image build age
# notwithstanding.

set -euo pipefail

IMAGE="${CODERPUZZLE_IMAGE:-ghcr.io/coderpuzzle/coderpuzzle:latest}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

exec docker run --rm --user 0:0 \
    -v "$ROOT/runner/cli.py:/runner/cli.py:ro" \
    -v "$ROOT/runner/formatters.py:/runner/formatters.py:ro" \
    -v "$PWD:/work" -w /work \
    "$IMAGE" coderpuzzle format "$@"
