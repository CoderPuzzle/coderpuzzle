# Solutions — Maximum Product of the Length of Two Palindromic Subsequences

## Palindromic bitmasks

Represent each subsequence by the bitmask of the indices it selects. Enumerate every nonempty mask, build its subsequence in index order, and store its length when it is a palindrome. This makes the disjointness condition a bitwise operation: after choosing one palindrome, every valid second mask must be a submask of the indices that remain.

For each palindromic mask, enumerate all nonempty submasks of its complement and use the stored length of every palindromic one to update the answer. Across all first masks, complementary-submask enumeration visits `3^n` index assignments, while the preprocessing examines `2^n` subsequences.

**Complexity:** `O(n * 2^n + 3^n)` time, `O(2^n)` space.
