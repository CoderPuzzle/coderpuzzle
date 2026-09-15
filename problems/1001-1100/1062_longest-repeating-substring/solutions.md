# Solutions — Longest Repeating Substring

## Binary Search on Length with a Hash Set

Feasibility is monotone: if some substring of length L occurs twice (occurrences may overlap), then its length-(L−1) prefixes also occur twice, so the set of feasible lengths is downward closed. That makes the answer binary-searchable. The code searches over [0, n−1] with the upper-mid convention (lo + hi + 1) // 2 so the loop always terminates when lo < hi, keeping lo as the largest length for which a repeat exists; the initial hi of n−1 is safe because the whole string cannot repeat within itself.

Each feasibility probe materializes every substring of the candidate length L as a Python slice and inserts it into a set, returning true the moment a slice is already present. Because occurrences may overlap, the probe scans all n − L + 1 windows with no spacing constraint. Slicing and hashing each window costs O(L), so one probe is O(n·L).

Edge cases: a string of all-distinct characters fails every probe for length ≥ 1 and the search stays at 0; length 0 is defined as trivially true but never wins over any positive result. With n ≤ 2000 the O(n·L) probe is comfortably fast at every probed length, so the simple slice-and-set check beats a rolling-hash implementation on constant factors while remaining exact — no hash-collision verification is needed because equality is checked on the actual strings.

**Complexity:** `O(n² log n)` time worst case, `O(n²)` space worst case.
