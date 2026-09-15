# Solutions — Sorting the Sentence

The tag digit is not a sort key to compare — it _is_ the destination
index. With at most 9 words, direct placement beats any comparison sort:
split the sentence, write each de-tagged word into its slot, join.

## Place by trailing digit

Split on spaces; for every token the final character encodes its
1-indexed position. Strip it, store the remainder at that offset in a
result array sized by the word count, and finally join with single
spaces. Every word lands exactly once because the tags form a
permutation.

One pass over the tokens with constant work per token.

**Complexity:** `O(n)` time in the sentence length `n`, `O(n)` space.
