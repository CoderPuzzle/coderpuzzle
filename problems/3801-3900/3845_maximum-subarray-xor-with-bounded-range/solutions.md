# Solutions — Maximum Subarray XOR with Bounded Range

A sliding window names the legal start positions at each right end, and a
counting trie over prefix xors answers the maximum-xor question inside that
window.

## Sliding window with monotonic deques and a counting trie

XOR over a range telescopes through prefix xors: with `pref[0] = 0` and
`pref[i + 1] = pref[i] ^ nums[i]`, the value of `nums[l..r]` is exactly
`pref[r + 1] ^ pref[l]`, so maximizing the subarray value means maximizing
that xor over eligible pairs. Eligibility is a window property: enlarging a
window can only raise its maximum and lower its minimum, so for each right
end `r` the starts `l` whose spread is at most `k` form one contiguous range
`[L, r]` — a single element always qualifies, since its spread is 0 ≤ k —
and `L` never moves left as `r` advances. Two monotonic deques of indices
carry the window's max and min candidates; whenever the front spread
exceeds `k`, index `left` retires: each deque front equal to it is popped,
and `pref[left]` leaves the candidate set.

That candidate set lives in a binary trie with a counter per node, which is
what makes deletion possible: inserting a value walks bits 14 down to 0,
creating nodes as needed and bumping every counter on its path; erasing one
walks the already-existing path decrementing instead — nodes stay
allocated, but a zero counter marks a dead branch. After the window
shrinks and `pref[r]` is inserted (start `r` just became eligible), a
greedy query walks `pref[r + 1]` down the same 15 levels, at each level
taking the opposite-bit child when it is alive — which sets that bit of the
result — and otherwise falling back to the same-bit child, guaranteed alive
because the current node's count is positive. The best result over all `r`
is the answer.

Width is bounded everywhere: every `nums[i] < 2¹⁵`, and the bits of
`a ^ b` are a subset of the bits of `a` and `b` together, so every prefix
xor, every subarray value, and the answer itself stay below `2¹⁵ = 32768`.
Fifteen trie levels therefore cover the whole universe, and every
intermediate fits in 32-bit integers — JavaScript's bitwise operators,
which truncate to 32 bits, are exact throughout, with no 2⁵³ concerns at
all. Each of the `n` prefixes is inserted once and erased at most once,
each walk touches 15 nodes, and the trie never exceeds `15n + 1` nodes,
giving `O(n log V)` time and space for `V = 2¹⁵`.

**Complexity:** `O(n log V)` time, `O(n log V)` space.
