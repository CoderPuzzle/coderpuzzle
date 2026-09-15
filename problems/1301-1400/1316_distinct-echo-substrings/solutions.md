# Solutions — Distinct Echo Substrings

## Brute Force Half Comparison with Deduplication

A string is an echo exactly when it has even length and its two halves are identical, so every echo is characterized by a half-length `half` and a starting index `i` where `text[i .. i+half) == text[i+half .. i+2·half)`. The solution enumerates every half length from 1 to n/2 and every start position that leaves room for the full doubled substring, compares the two halves directly with a slice equality, and on a match inserts the whole substring into a set. The set silently discards repeats, so its final size is the number of distinct echoes.

This is exhaustive and correct by construction: any echo of `text` appears for exactly its own half length and start index, and no non-echo can pass the half comparison. Distinctness needs no extra logic because equal substrings hash and compare identically.

The cost is a double loop of O(n²) (start, half) pairs, where each pair pays up to O(half) for the slice comparison — Θ(n³) in the adversarial worst case (for example highly repetitive strings where halves match for many lengths). With n ≤ 2000 this stays practical: the comparisons are memcmp-speed, and mismatches usually fail on the first differing character, so the effective cost is far below the bound on typical inputs.

The all-same-letter string illustrates the space behavior: it contributes exactly one echo per even length, and the set retains those n/2 strings of growing length, which is the largest shape the stored data takes.

**Complexity:** `O(n³)` time worst case, `O(n²)` space.
