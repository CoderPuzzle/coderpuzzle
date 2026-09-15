# Solutions — Repeated DNA Sequences

Two scans over the same `n - 9` windows, differing in what a window _is_ while
it is being compared. One treats it as the ten letters themselves and stores
those slices; the other compresses the alphabet first — four letters fit in two
bits each, so a whole window becomes one small integer that slides through the
string with a shift and a mask. Both remember what they have seen and collect a
window the moment it is seen twice.

## Sliding Window with Hash Set

Every 10-letter sequence occurs at some starting index, so the solution slides a fixed-length window of size 10 across the string and asks one question per position: has this exact substring been seen before? A `seen` set records every window as it passes, and the moment a window is already present, it has occurred at least twice and goes into a `repeated` set.

Using a second set for the answers (rather than a list) handles windows that appear three or more times — such a window is "rediscovered" several times but is collected exactly once. The loop runs over `range(len(s) - 9)`, which naturally produces an empty result for strings shorter than 10 since no full window fits. Each iteration slices and hashes a 10-character string, which is constant work per index.

The result is emitted from `sorted(repeated)`, giving a deterministic output order regardless of the order in which duplicates were encountered. The hash set is the working horse that turns a pairwise O(n^2) substring comparison into a single linear scan.

**Complexity:** `O(n)` time, `O(n)` space.

## Rolling Bits

The alphabet has exactly four letters, and four states fit in two bits, so the
ten-letter window never has to be stored as letters at all. Fix an encoding —
`A = 00`, `C = 01`, `G = 10`, `T = 11` — and a window reads as twenty bits,
one small integer with `4^10` possible values. Different windows map to
different integers and every integer decodes back to its window, so equality
of integers is exactly equality of windows.

The register slides instead of being rebuilt. When the next letter arrives,
shift the register left by two bits, insert the new letter's pair at the
bottom, and mask off everything past the twentieth bit — the oldest letter
falls out of the top exactly as the new one enters. Two operations per
position maintain the code of the current window, versus slicing and hashing
ten characters; after the tenth letter every position holds a complete code.

The bookkeeping around the codes is the same as before, only cheaper to
compare: a `seen` set of integers, a second set for the ones that arrive
again, and a decode of the survivors back into letters at the very end —
answers must be returned as strings, so the integers are only a working
representation. `"GGGGGTTTTTGGGGGTTTTTGCGCGCATAT"` repeats `GGGGGTTTTT` and
the overlap window `GGGGTTTTTG`; both are caught as integers and both come
back out as letters, sorted for a fixed order.

Twenty-bit integers make the sets smaller than ten-character slices on any
real machine, though both are `O(n)` overall — the honest gain of the
encoding is the constant factor in the comparison and the two-operation
update, not the asymptotics.

**Complexity:** `O(n)` time, `O(n)` space.
