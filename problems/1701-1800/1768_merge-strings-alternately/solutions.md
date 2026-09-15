# Solutions — Merge Strings Alternately

The output interleaves the two words one character at a time, `word1`
first; once the shorter word runs out, whatever remains of the longer
word is copied onto the end unchanged. Nothing about the letters
themselves matters — only their positions do.

## Two pointers with a tail append

Walk one pointer per word in lockstep, emitting one character from
`word1` then one from `word2` while both pointers are in range. When
either word is exhausted the loop stops with both pointers sitting at
`min(len(word1), len(word2))`, so slicing each word from its own pointer
yields exactly the unmerged tail — one slice is always empty, the other
carries the surplus of the longer word. Collecting into a growable
buffer and joining once keeps the build linear.

On `("ab", "pqrs")` the pointers advance two rounds producing `"apbq"`,
then `word1` is exhausted and slicing `word2` from index 2 appends
`"rs"`, giving `"apbqrs"`. Equal lengths never reach the tail branch:
both slices come out empty and the interleaving is already the whole
answer.

**Complexity:** `O(n + m)` time, `O(n + m)` space, where `n` and `m`
are the lengths of the two words.
