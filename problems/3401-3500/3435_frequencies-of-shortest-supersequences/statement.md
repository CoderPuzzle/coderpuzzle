# Frequencies of Shortest Supersequences

## Description

You are given an array of strings `words`. Find all shortest common supersequences (SCS) of `words` that are not permutations of each other.

A **shortest common supersequence** is a string of minimum length that contains each string in `words` as a subsequence.

Return a 2D array of integers `freqs` that represent all the SCSs. Each `freqs[i]` is an array of size `26`, representing the frequency of each letter in the lowercase English alphabet for a single SCS. You may return the frequency arrays in any order.

### Example 1

```text
Input: words = ["ab","ba"]
Output: [[1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
Explanation: The two SCSs are "aba" and "bab". The output is the letter frequencies for each one.
```

### Example 2

```text
Input: words = ["aa","ac"]
Output: [[2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
Explanation: The two SCSs are "aac" and "aca". Since they are permutations of each other, keep only "aac".
```

### Example 3

```text
Input: words = ["aa","bb","cc"]
Output: [[2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
Explanation: "aabbcc" and all its permutations are SCSs.
```

### Constraints

- `1 <= words.length <= 256`
- `words[i].length == 2`
- All strings in `words` will altogether be composed of no more than `16` unique lowercase letters.
- All strings in `words` are unique.

## Hints

### Hint 1

Each SCS contains at most 2 occurrences of each character. Why?

### Hint 2

Construct every subset of possible characters (1 or 2 occurrences) and check whether a supersequence could be constructed using topological sort.
