# Lexicographically Smallest Beautiful String

## Description

A string is beautiful if:

It consists of the first k letters of the English lowercase alphabet.
It does not contain any substring of length 2 or more which is a palindrome.

You are given a beautiful string s of length n and a positive integer k.

Return the lexicographically smallest string of length n, which is larger than
s and is beautiful. If there is no such string, return an empty string.

A string a is lexicographically larger than a string b (of the same length) if
in the first position where a and b differ, a has a character strictly larger
than the corresponding character in b.

For example, "abcd" is lexicographically larger than "abcc" because the first
position they differ is at the fourth character, and d is greater than c.

### Example 1

```text
Input: s = "abcz", k = 26
Output: "abda"
Explanation: The string "abda" is beautiful and lexicographically larger than
the string "abcz".
It can be proven that there is no string that is lexicographically larger than
the string "abcz", beautiful, and lexicographically smaller than the string
"abda".
```

### Example 2

```text
Input: s = "dc", k = 4
Output: ""
Explanation: It can be proven that there is no string that is lexicographically
larger than the string "dc" and is beautiful.
```

### Constraints

- `1 <= n == s.length <= 10⁵`
- `4 <= k <= 26`
- s is a beautiful string.

## Hints

### Hint 1

If the string does not contain any palindromic substrings of lengths 2 and 3,
then the string does not contain any palindromic substrings at all.

### Hint 2

Iterate from right to left and if it is possible to increase character at index
i without creating any palindromic substrings of lengths 2 and 3, then increase
it.

### Hint 3

After increasing the character at index i, set every character after index i
equal to character a. With this, we will ensure that we have created a
lexicographically larger string than s, which does not contain any palindromes
before index i and is lexicographically the smallest.

### Hint 4

Finally, we are just left with a case to fix palindromic substrings, which come
after index i. This can be done with a similar method mentioned in the second
hint.
