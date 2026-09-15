# Maximum Distance Between Unequal Words in Array II

## Description

You are given a string array words.

Choose two distinct indices i < j whose words are not equal — that is,
words[i] != words[j]. The pair's distance is j - i + 1, the number of array
slots its two ends span. Return the largest distance over all such pairs, or
0 when no valid pair exists (the array holds a single word, or every word in
it is equal).

### Example 1

```text
Input: words = ["leetcode","leetcode","codeforces"]
Output: 3
Explanation: words[0] and words[2] are not equal and span the widest range:
2 - 0 + 1 = 3.
```

### Example 2

```text
Input: words = ["a","b","c","a","a"]
Output: 4
Explanation: words[1] = "b" and words[4] = "a" give the largest distance,
4 - 1 + 1 = 4.
```

### Example 3

```text
Input: words = ["z","z","z"]
Output: 0
Explanation: All the words are equal, so no valid pair exists and the answer
is 0.
```

### Constraints

- `1 <= words.length <= 10⁵`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.

## Hints

### Hint 1

Think of this as a two-pointer problem.

### Hint 2

Fix the first word as words[i] and find the rightmost unequal words[j].

### Hint 3

Fix the last word as words[i] and find the leftmost unequal words[j].
