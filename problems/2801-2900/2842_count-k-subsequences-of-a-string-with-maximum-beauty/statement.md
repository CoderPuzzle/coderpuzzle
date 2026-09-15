# Count K-Subsequences of a String With Maximum Beauty

## Description

You are given a string `s` and an integer `k`.

A k-subsequence is a subsequence of `s`, having length `k`, and all its
characters are unique, i.e., every character occurs once.

Let `f(c)` denote the number of times the character `c` occurs in `s`.

The beauty of a k-subsequence is the sum of `f(c)` for every character `c` in
the k-subsequence.

For example, consider `s = "abbbdd"` and `k = 2`:

- `f('a') = 1`, `f('b') = 3`, `f('d') = 2`
- Some k-subsequences of `s` are:

```text
"abbbdd" -> "ab" having a beauty of f('a') + f('b') = 4
"abbbdd" -> "ad" having a beauty of f('a') + f('d') = 3
"abbbdd" -> "bd" having a beauty of f('b') + f('d') = 5
```

Return an integer denoting the number of k-subsequences whose beauty is the
maximum among all k-subsequences. Since the answer may be too large, return it
modulo 10⁹ + 7.

A subsequence of a string is a new string formed from the original string by
deleting some (possibly none) of the characters without disturbing the
relative positions of the remaining characters.

Notes

- `f(c)` is the number of times a character `c` occurs in `s`, not a
  k-subsequence.
- Two k-subsequences are considered different if one is formed by an index
  that is not present in the other. So, two k-subsequences may form the same
  string.

### Example 1

```text
Input: s = "bcca", k = 2
Output: 4
Explanation: From s we have f('a') = 1, f('b') = 1, and f('c') = 2.
The k-subsequences of s are:
bcca having a beauty of f('b') + f('c') = 3
bcca having a beauty of f('b') + f('c') = 3
bcca having a beauty of f('b') + f('a') = 2
bcca having a beauty of f('c') + f('a') = 3
bcca having a beauty of f('c') + f('a') = 3
There are 4 k-subsequences that have the maximum beauty, 3.
Hence, the answer is 4.
```

### Example 2

```text
Input: s = "abbcd", k = 4
Output: 2
Explanation: From s we have f('a') = 1, f('b') = 2, f('c') = 1, and
f('d') = 1.
The k-subsequences of s are:
abbcd having a beauty of f('a') + f('b') + f('c') + f('d') = 5
abbcd having a beauty of f('a') + f('b') + f('c') + f('d') = 5
There are 2 k-subsequences that have the maximum beauty, 5.
Hence, the answer is 2.
```

### Constraints

- `1 <= s.length <= 2 * 10⁵`
- `1 <= k <= s.length`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Since every character appears once in a k-subsequence, we can solve the
following problem first: Find the total number of ways to select k characters
such that the sum of their frequencies is maximum.

### Hint 2

An obvious case to eliminate is if `k` is greater than the number of distinct
characters in `s`, then the answer is 0.

### Hint 3

We are now interested in the top frequencies among the characters. Using a map
data structure, let cnt[x] denote the number of characters that have a
frequency of x.

### Hint 4

Starting from the maximum value x in cnt. Let i = min(k, cnt[x]) we add to our
result cnt[x]Ci * xi representing the number of ways to select i characters
from all characters with frequency x, multiplied by the number of ways to
choose each individual character. Subtract i from k and continue downwards to
the next maximum value.

### Hint 5

Powers, combinations, and additions should be done modulo 10⁹ + 7.
