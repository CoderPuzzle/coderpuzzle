# Decoded String at Index

## Description

You are given an encoded string `s`. To decode the string to a tape, the
encoded string is read one character at a time and the following steps are
taken:

- If the character read is a letter, that letter is written onto the tape.
- If the character read is a digit `d`, the entire current tape is repeatedly
  written `d - 1` more times in total.

Given an integer `k`, return the `k`th letter (1-indexed) in the decoded
string.

### Example 1

```text
Input: s = "leet2code3", k = 10
Output: "o"
Explanation: The decoded string is "leetleetcodeleetleetcodeleetleetcode".
The 10th letter in the string is "o".
```

### Example 2

```text
Input: s = "ha22", k = 5
Output: "h"
Explanation: The decoded string is "hahahaha". The 5th letter is "h".
```

### Example 3

```text
Input: s = "a2345678999999999999999", k = 1
Output: "a"
Explanation: The decoded string is "a" repeated 8301530446056247680 times.
The 1st letter is "a".
```

### Constraints

- `2 <= s.length <= 100`
- `s` consists of lowercase English letters and digits `2` through `9`.
- `s` starts with a letter.
- `1 <= k <= 10^9`
- It is guaranteed that `k` is less than or equal to the length of the decoded
  string.
- The decoded string is guaranteed to have less than `2^63` letters.

## Hints

### Hint 1

The decoded tape can be astronomically long — never build it; only track its length.

### Hint 2

Walk s backwards: dividing the length by a digit d reverses one repetition step, and k can then be reduced with a modulo of the new length.

### Hint 3

Keep k 1-indexed: after shrinking to a prefix of length L, the k-th letter of the tape equals the ((k-1) mod L + 1)-th letter of that prefix; stop when k equals the current length at a letter.
