# Find K-Length Substrings With No Repeated Characters

## Description

Given a string `s` and an integer `k`, return the number of substrings
in `s` of length `k` with no repeated characters.

### Example 1

```text
Input: s = "havefunonleetcode", k = 5
Output: 6
Explanation: There are 6 substrings they are: 'havef','avefu','vefun',
'efuno','etcod','tcode'.
```

### Example 2

```text
Input: s = "home", k = 5
Output: 0
Explanation: Notice k can be larger than the length of s. In this case,
it is not possible to find any substring.
```

### Constraints

- `1 <= s.length <= 10⁴`
- `s` consists of lowercase English letters.
- `1 <= k <= 10⁴`

## Hints

### Hint 1

How to check efficiently each K-length substring?

### Hint 2

First store the first leftmost K-length substring in a hashTable or
array of frequencies.

### Hint 3

Then iterate through the rest of characters and erase the first element
and add the next element from the right. If in the hashTable we have K
different character we add 1 to the counter. After that return as answer
the counter.
