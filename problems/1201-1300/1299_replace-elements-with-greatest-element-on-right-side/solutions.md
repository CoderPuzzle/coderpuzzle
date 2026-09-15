# Solutions — Replace Elements with Greatest Element on Right Side

## One reverse pass carrying the running maximum

The greatest element to the right of index `i` is the same question as the
greatest element to the right of index `i + 1`, except possibly one value
larger — the one sitting at `i + 1` itself. That dependency only points
right-to-left, so a single sweep from the end of the array answers every
position: walk `i` from the last index down, write the running maximum into
`answer[i]`, then offer `arr[i]` to that maximum for the next iteration.
The last element has nothing to its right and receives `-1`, which is
exactly what the running maximum is initialized to.

Scanning backwards is what makes one pass enough. A left-to-right pass
would have no cheap way to know the suffix maximum ahead of it; recomputing
it per position costs `O(n²)`. Here each array element is read once,
written once, and compared once against the carried maximum, so the work is
linear with constant extra space. The output can reuse the input's storage
or be built fresh — either way the values written are decided before each
cell is overwritten, so in-place mutation changes nothing about correctness.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output.
