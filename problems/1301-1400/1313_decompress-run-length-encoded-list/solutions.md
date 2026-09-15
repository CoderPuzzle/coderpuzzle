# Decompress Run-Length Encoded List

## Approach: Pairwise expansion

The input is a flat sequence of `[freq, val]` pairs, so it splits into
`len(nums) / 2` pairs read off by stepping the index two at a time. Each
pair contributes `freq` copies of `val` to the output, and the pairs'
contributions concatenate in input order — which is exactly what appending
each expansion to one output buffer in a left-to-right pass produces.

The output length is the sum of the frequencies, known before writing, so
the buffer can be sized once and filled; no intermediate sublists are
needed.

**Complexity:** O(n) time and space, where n is the decompressed length
(the sum of all frequencies).
