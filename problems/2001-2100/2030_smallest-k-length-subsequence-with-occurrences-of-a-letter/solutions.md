# Solutions — Smallest K-Length Subsequence With Occurrences of a Letter

## Monotonic Stack Greedy with Suffix Counts

The lexicographically smallest subsequence of fixed length is built with the classic monotonic-stack greedy: scan left to right, and before pushing the current character, pop stacked characters that are strictly larger whenever enough characters remain (`stack length - 1 + remaining suffix >= k`) to still reach length `k`. Two extra guards make the letter constraint safe. A precomputed suffix array `suffix[i]` — how many occurrences of `letter` remain in `s[i:]` — lets the greedy check, in constant time, that popping a stacked `letter` would not make the quota unreachable: the letters that would remain in the stack (adjusted for the incoming character) plus the suffix supply must still be at least `repetition`.

The stack that survives the scan is the lexicographically smallest subsequence of length at most `k` that already contains as many letters as greedily possible, but it may be longer than `k`, so it is trimmed from the right end down to exactly `k` characters. The trim removes non-letter characters first, and only removes a letter when the letters that would remain still meet `repetition`; scanning from the right and rebuilding the result backwards drops the largest (rightmost, least useful) characters, which is optimal because any lexicographic improvement would have been captured by the stack phase.

Both phases walk each character a constant number of times: each index is pushed and popped at most once from the stack, and the trim pass is a single reverse walk. Equal characters are never popped (the pop condition is strictly greater), which preserves runs like the `"bb"` example where the whole stack is the answer.

**Complexity:** `O(n)` time, `O(n)` space.
