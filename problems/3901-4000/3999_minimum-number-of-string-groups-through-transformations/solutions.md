# Solutions

The solution uses Booth canonical rotations for parity subsequences.

## Booth canonical rotations for parity subsequences

Split each word into its even-indexed and odd-indexed subsequences. Two words are equivalent exactly when the corresponding subsequences in both pairs are cyclic rotations, so each subsequence needs a rotation-independent canonical form.

Booth's algorithm finds the lexicographically smallest rotation in linear time. Store the pair of canonical rotations for every word in a set; the number of distinct pairs is the minimum number of groups.

**Complexity:** O(total input length) time and O(total input length) space.
