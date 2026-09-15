# Solutions — Decode XORed Permutation

The encoding chains each neighbor pair together through
`encoded[i] = perm[i] ^ perm[i + 1]`, and XOR-ing both sides with the
running element cancels it out — but the chain hangs from an unknown
head, and unlike the given-the-first-element variant, nothing here hands
`perm[0]` over. The permutation premise supplies it instead: `perm` is
exactly the integers `1..n`, so their total XOR is known in advance, and
`n` being odd makes everything but the head recoverable from `encoded`
alone.

## XOR-total head recovery

Let `total = 1 ^ 2 ^ ... ^ n`, the XOR of everything the permutation
must contain. The equations at odd positions — `encoded[1] =
perm[1] ^ perm[2]`, `encoded[3] = perm[3] ^ perm[4]`, and so on up to
`encoded[n - 2] = perm[n - 2] ^ perm[n - 1]` — telescope when XOR-ed
together into `perm[1] ^ perm[2] ^ ... ^ perm[n - 1]`, the whole
permutation minus its head. That tidy cover is exactly where oddness
pays: `n - 1` is even, so the indices `1..n - 1` tile into adjacent
pairs with nothing dangling past the last one, while an even `n` would
leave a final element unpaired and the head still free. XOR-ing the
all-but-head chain into `total` now cancels every value except one:
`perm[0] = total ^ encoded[1] ^ encoded[3] ^ ... ^ encoded[n - 2]`.

From there the decode is a plain sweep — open the output with the
recovered head and append `perm[i] ^ encoded[i]`, each element pinned
the moment its predecessor is, which is also why the answer is unique.
On Example 1, `total = 1 ^ 2 ^ 3 = 0` and the odd chain is the single
entry `encoded[1] = 1`, so `perm[0] = 0 ^ 1 = 1`; unrolling walks
`1 ^ 3 = 2`, then `2 ^ 1 = 3`, reproducing `[1,2,3]`.

Every value on the wire is a permutation element or an XOR of two, all
at most `n < 10⁵` and so below `2^17 = 131072` — far inside the 32-bit
element type, with no intermediate ever wider. Three linear sweeps (the
total, the odd chain, the unroll) do all the work, and the output array
is the only allocation.

**Complexity:** `O(n)` time, `O(n)` space (output).
