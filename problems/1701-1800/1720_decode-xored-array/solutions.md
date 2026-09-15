# Solutions — Decode XORed Array

XOR is its own inverse — `a ^ b ^ a = b` — so encoding and decoding are
the same operation read in opposite directions. The encoding rule
`encoded[i] = arr[i] ^ arr[i + 1]` hides `arr[i + 1]` behind exactly one
other value, the already-recoverable `arr[i]`, and XOR-ing both sides
with `arr[i]` cancels it out, leaving `arr[i + 1] = encoded[i] ^ arr[i]`.
Seeded with `first`, that one step unrolls the entire chain left to
right; each element is pinned the moment its predecessor is, which is
also why the answer exists and is unique.

## Rolling XOR reconstruction

Open the output with `first` and sweep `encoded` once, appending
`arr[i] ^ encoded[i]` at each step: the running element is the only
unknown in the next equation, so the decode never looks back, never
branches, and touches each `encoded[i]` exactly once. The worked example
falls out immediately — `[1,2,3]` with `first = 1` walks `1 ^ 1 = 0`,
`0 ^ 2 = 2`, `2 ^ 3 = 1`, reproducing `[1,0,2,1]`.

With `encoded[i]` and `first` at most `10⁵`, every value on the wire
fits in 17 bits, and every recovered element — an XOR of such values —
stays below `2^17 = 131072`, far inside the 32-bit element type; no
intermediate ever needs anything wider than the array's own integers.
The output array is the only allocation, and one pass over `n - 1`
inputs produces its `n` elements.

**Complexity:** `O(n)` time, `O(n)` space (output).
