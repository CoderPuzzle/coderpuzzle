# Reformat The String

## Description

You are given an alphanumeric string `s`. (Alphanumeric string is a string
consisting of lowercase English letters and digits).

You have to find a permutation of the string where no letter is followed
by another letter and no digit is followed by another digit. That is, no
two adjacent characters have the same type.

Return the reformatted string or return an empty string if it is
impossible to reformat the string.

Many permutations can reformat the same string — the original judge
accepts any of them. For a deterministic answer, the expected output is
pinned to the canonical interleave: partition `s` into its letters and
its digits, each keeping first-occurrence order; if the counts differ by
more than one the answer is empty; otherwise alternate the two groups
starting with the more numerous one, and with the letters when the counts
are equal. `"a0b1c2"` under this rule stays `"a0b1c2"`.

### Example 1

```text
Input: s = "a0b1c2"
Output: "a0b1c2"
Explanation: No two adjacent characters have the same type. "0a1b2c" and
"0c2a1b" are also valid permutations on the original judge; the pinned
procedure produces exactly this output.
```

### Example 2

```text
Input: s = "leetcode"
Output: ""
Explanation: "leetcode" has only characters so we cannot separate them by
digits.
```

### Example 3

```text
Input: s = "1229857369"
Output: ""
Explanation: "1229857369" has only digits so we cannot separate them by
characters.
```

### Constraints

- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters and/or digits.

## Hints

### Hint 1

Count the number of letters and digits in the string. if `cntLetters -
cntDigits` has any of the values `[-1, 0, 1]` we have an answer, otherwise
we don't have any answer.

### Hint 2

Build the string anyway as you wish. Keep in mind that you need to start
with the type that has more characters if `cntLetters ≠ cntDigits`.
