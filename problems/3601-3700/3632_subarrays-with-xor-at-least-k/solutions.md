# Solutions — Subarrays with XOR at Least K

## Prefix XOR pairs with a binary trie

With prefix XORs `P[0] = 0` and `P[j] = nums[0] ^ ... ^ nums[j-1]`, the XOR
of subarray `nums[i..j)` is exactly `P[i] ^ P[j]`, so the answer is the
number of prefix pairs `i < j` whose XOR reaches `k`. Every prefix is
inserted into a binary trie and then queried against everything now in it,
which charges each pair exactly once at its right endpoint. The query
walks down from bit 29 comparing the XOR bit the current branch would
produce with `k`'s bit: where `k`'s bit is 0, every trie prefix taking the
flipped branch produces a 1 there and beats `k` regardless of the lower
bits, so its whole subtree count joins the answer; where `k`'s bit is 1,
only the flipped branch can still reach it. A walk that dies early has run
out of prefixes still tied to `k`, and a walk that survives all 30 bits
lands on prefixes whose XOR equals `k` exactly — still qualifying, so its
count joins too.

The trie stores subtree occurrence counts, so each query step either
terminates a branch or charges an entire subtree in O(1); every prefix is
inserted once along a single root-to-leaf path. Because the query runs
after inserting the current prefix, the walk also meets the `n + 1`
self-pairs, whose XOR is 0 and which qualify only when `k = 0`; those are
subtracted at the end (equivalently, `k = 0` degenerates to all
`n(n+1)/2` subarrays). With values bounded by 10⁹ < 2³⁰, thirty levels
cover all prefixes, giving linear-in-bits time and at most `30(n+1) + 1`
trie nodes, kept in flat arrays so the millions of nodes stay compact.

The count itself outgrows 32 bits before the array does: at `n = 10⁵` up
to `n(n+1)/2 = 5,000,050,000` subarrays qualify, so fixed-width languages
accumulate and return through 64-bit integers (`long long`, `long`,
`int64`, `i64`). JavaScript numbers stay exact far past that bound, and
Python integers are unbounded.

**Complexity:** `O(30n)` time, `O(30n)` space.
