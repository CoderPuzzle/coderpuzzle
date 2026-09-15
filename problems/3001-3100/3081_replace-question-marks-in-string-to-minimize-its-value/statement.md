# Replace Question Marks in String to Minimize Its Value

## Description

You are given a string `s`. `s[i]` is either a lowercase English letter or
`'?'`.

For a string `t` having length `m` containing only lowercase English letters,
we define the function `cost(i)` for an index `i` as the number of characters
equal to `t[i]` that appeared before it, i.e. in the range `[0, i - 1]`.

The value of `t` is the sum of `cost(i)` for all indices `i`.

For example, for the string `t = "aab"`:

- cost(0) = 0
- cost(1) = 1
- cost(2) = 0
- Hence, the value of "aab" is 0 + 1 + 0 = 1.

Your task is to replace all occurrences of `'?'` in `s` with any lowercase
English letter so that the value of `s` is minimized.

Return a string denoting the modified string with replaced occurrences of
`'?'`. If there are multiple strings resulting in the minimum value, return
the lexicographically smallest one.

### Example 1

```text
Input: s = "???"
Output: "abc"
Explanation: In this example, we can replace the occurrences of '?' to make s equal to "abc".
For "abc", cost(0) = 0, cost(1) = 0, and cost(2) = 0.
The value of "abc" is 0.
Some other modifications of s that have a value of 0 are "cba", "abz", and, "hey".
Among all of them, we choose the lexicographically smallest.
```

### Example 2

```text
Input: s = "a?a?"
Output: "abac"
Explanation: In this example, the occurrences of '?' can be replaced to make s equal to "abac".
For "abac", cost(0) = 0, cost(1) = 0, cost(2) = 1, and cost(3) = 0.
The value of "abac" is 1.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is either a lowercase English letter or `'?'`.

## Hints

### Hint 1

The cost does not depend on the order of characters. If a character c appears x times, the cost is exactly 0 + 1 + 2 + … + (x − 1) = x * (x − 1) / 2.

### Hint 2

We know the total number of question marks; for each one, we should select the letter with the minimum frequency to replace it.

### Hint 3

The letter selection can be achieved by a min-heap (or even by brute-forcing the 26 possibilities).

### Hint 4

So, we know the extra letters we need to replace finally. However, we must put those letters in order from left to right so that the resulting string is the lexicographically smallest one.
