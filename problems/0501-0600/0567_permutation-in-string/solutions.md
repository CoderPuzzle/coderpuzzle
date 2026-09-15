# Solutions — Permutation in String

## Sliding Window Frequency Count

Two strings are permutations of each other exactly when their character frequency tables match. So the question becomes: does any window of `s2` of length `len(s1)` have the same 26-letter frequency vector as `s1`? Comparing counts, not order, is what makes this tractable — a permutation of `s1` matches no matter how its letters are arranged.

The solution builds `need`, the count vector for `s1`, and `window`, the counts of the first `len(s1)` characters of `s2`, using two length-26 arrays. It then slides the window one position at a time: the entering character's count is incremented, the leaving character's (at index `i - m`) is decremented, and after each slide the two arrays are compared with a direct list equality check. Equality of the vectors means the window is a permutation of `s1`.

Rebuilding the counts from scratch for every window would be quadratic; the incremental add/remove keeps each step O(1) per bookkeeping update, with the final equality comparison costing a constant 26 comparisons. If `len(s1) > len(s2)`, no window can exist and the function returns false immediately, which also protects the initial slice from overrunning.

The alphabet is fixed at 26 lowercase letters, so the arrays occupy constant space regardless of input size.

**Complexity:** `O(26n)` time, `O(1)` space.
