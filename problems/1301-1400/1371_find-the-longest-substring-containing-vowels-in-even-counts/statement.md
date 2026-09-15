# Find the Longest Substring Containing Vowels in Even Counts

## Description

Given the string `s`, return the size of the longest substring containing
each vowel an even number of times. That is, `'a'`, `'e'`, `'i'`, `'o'`, and
`'u'` must appear an even number of times.

### Example 1

```text
Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels e, i and o and zero of the vowels a and u.
```

### Example 2

```text
Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.
```

### Example 3

```text
Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels a, e, i, o and u appear zero times.
```

### Constraints

- `1 <= s.length <= 5 * 10^5`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

Represent the parity (odd or even) of each vowel count with a single 5-bit mask.

### Hint 2

Precompute the prefix XOR of the vowel bitmask; a substring has all vowels even exactly when its two endpoint masks are equal.

### Hint 3

Keep the first index at which each mask value appears; the best substring ending at i is i - first[mask_i].
