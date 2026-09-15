# Solutions — Largest Merge Of Two Strings

Each move takes the next character from one of the two queues, so the
merge is built left to right and every greedy decision asks only:
which queue's head leads to the larger final string?

## Consume from the larger remaining string

Compare the two remaining suffixes lexicographically and take from
the larger one. When the heads differ this is just "take the bigger
head" — but the suffix comparison also settles the hard case: when
the heads tie, the larger remaining suffix is the one whose future
offers more, because a strict suffix comparison means every completion
that consumes it first can be matched or beaten... concretely, if
`word1 > word2` as strings, taking from `word1` first dominates: the
character emitted is at least as large, and the comparison of what
remains can only have improved relative to the alternative. When one
suffix is a strict prefix of the other, the longer (larger) one wins
the comparison the same way — the tie breaks once the shorter queue
runs out against the longer one's continuation.

On `("cabaa", "bcaaa")` the comparison sequence c>b, b>a, c>a, a=a
(tie: `"abaa" > "aaa"`), a=a (`"baa" > "aaa"`) produces
`"cbcabaaaaa"`. Full-tie inputs like `("z"*3000, "z"*3000)` simply
interleave into `z * 6000`. Suffix comparison is worst-case linear
per step in the tie-run length, which the `n <= 3000` bound absorbs.

**Complexity:** `O((n + m)^2)` time worst case (long equal runs),
`O(n + m)` space (output).
