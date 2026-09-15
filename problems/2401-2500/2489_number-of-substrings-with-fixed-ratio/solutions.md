# Solutions — Number of Substrings With Fixed Ratio

## Prefix keys in a hash map

A substring with `z` zeros and `o` ones has ratio `num1 : num2` exactly
when `z * num2 == o * num1`. Expressing `z` and `o` through prefix counts
turns this into a pair-counting problem: the substring between prefix
positions `l` and `r` qualifies exactly when `Z[r]*num2 - O[r]*num1 ==
Z[l]*num2 - O[l]*num1`. So every valid substring corresponds to a pair of
equal prefix keys, and the answer is the number of such pairs among the
`n + 1` prefix keys.

One left-to-right pass computes each prefix key as it goes. A hash map
counts how many times each key has been seen; when a key is reached for the
`k`-th time it forms `k - 1` new pairs with the earlier equal keys, so the
running count adds the previous frequency and then increments it. The
initial key `0` (the empty prefix) is seeded with frequency 1, which is what
lets substrings starting at the first character be counted.

The equivalence between the ratio condition and the key equality is exact,
so the pair count neither over- nor under-counts. Keys reach
`10^5 * 10^5 = 10^10` and answers can exceed `2^31` (the alternating string
of length `10^5` with `num1 = num2 = 1` yields `2.5e9`), so the compiled
languages store the key and the accumulator in 64-bit types, and JavaScript
stays inside the exact-integer range of a double.

**Complexity:** `O(n)` time, `O(n)` space.
