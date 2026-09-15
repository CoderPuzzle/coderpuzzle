# Count Different Palindromic Subsequences

## Description

Given a string `s`, return the number of different non-empty palindromic
subsequences in `s`. Since the answer may be very large, return it modulo
10⁹ + 7.

A subsequence of a string is obtained by deleting zero or more characters from
the string.

A sequence is palindromic if it is equal to the sequence reversed.

Two sequences a₁, a₂, … and b₁, b₂, … are different if there is some `i` for
which aᵢ != bᵢ.

### Example 1

```text
Input: s = "bccb"
Output: 6
Explanation: The 6 different non-empty palindromic subsequences are 'b', 'c',
'bb', 'cc', 'bcb', 'bccb'. Note that 'bcb' is counted only once, even though
it occurs twice.
```

### Example 2

```text
Input: s = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"
Output: 104860361
Explanation: There are 3104860382 different non-empty palindromic
subsequences, which is 104860361 modulo 10⁹ + 7.
```

### Constraints

- `1 <= s.length <= 1000`
- `s[i]` is either `'a'`, `'b'`, `'c'`, or `'d'`.

## Hints

### Hint 1

Let `dp(i, j)` be the answer for the string `T = s[i..j]`, including the empty
sequence. The answer is the number of unique characters in `T`, plus
palindromes of the form `"a_a"`, `"b_b"`, `"c_c"`, and `"d_d"`, where `"_"`
represents zero or more characters.
