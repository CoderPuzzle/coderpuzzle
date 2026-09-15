# Solutions — String Compression III

## Run-length sweep with nine-wide slices

The algorithm in the statement is run-length encoding where each removal
takes at most nine copies of one character, so the output is fully decided
by the maximal runs of equal characters: a run of length `g` is emitted as
`floor(g / 9)` chunks of `"9c"` followed, when there is a remainder `r`, by
one final chunk `"{r}c"` — taking fewer than nine per cut could only
produce more chunks for the same characters, which is why the greedy
maximum prefix matches the optimal encoding.

Each port therefore makes one linear sweep with two indices: from position
`i`, walk forward while the character repeats and at most nine have been
counted; append the chunk length and the character; jump `i` to the end of
the chunk. Chunks are single digits because lengths never exceed 9, and the
compressed length is bounded by twice the input length (every single
character becomes its own `"1x"` pair), so building the result in a string
builder or pre-sized byte buffer keeps the whole pass allocation-light.

**Complexity:** `O(n)` time, `O(n)` space.
