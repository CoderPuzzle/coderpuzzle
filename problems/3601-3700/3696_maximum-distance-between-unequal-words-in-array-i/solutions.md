# Solutions — Maximum Distance Between Unequal Words in Array I

## Brute force over all index pairs

Every candidate answer belongs to one pair of indices, and the constraints
keep the pair count tiny — at most `100 × 99 / 2` of them. So walk every
combination `i < j`, compare `words[i]` with `words[j]`, and whenever the two
words differ record `j - i + 1` as a candidate, keeping the largest seen.
Whole-string comparison handles every shape of difference uniformly — equal
lengths, one word a prefix of the other, completely different words — because
each language's string equality already does the character-level work.

The sentinel needs no special case. The running best starts at `0` and only a
genuinely unequal pair can raise it, so an array whose words are all equal —
including a single-element array, which has no pairs at all — finishes with
that initial `0`, exactly what the statement asks for.

**Complexity:** `O(n² · L)` time, `O(1)` space, where `n` is
`words.length` and `L` is the longest word length.
