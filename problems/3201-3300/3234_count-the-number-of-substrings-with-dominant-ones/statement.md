# Count the Number of Substrings With Dominant Ones

## Description

You are given a binary string `s`.

Return the number of substrings with **dominant** ones.

A string has **dominant** ones if the number of ones in the string is
**greater than or equal to** the **square** of the number of zeros in the
string.

### Example 1

```text
Input: s = "00011"
Output: 5
Explanation: The substrings with dominant ones are shown in the table below.
s[3..3] = "1" has 0 zeros and 1 one.
s[4..4] = "1" has 0 zeros and 1 one.
s[2..3] = "01" has 1 zero and 1 one.
s[3..4] = "11" has 0 zeros and 2 ones.
s[2..4] = "011" has 1 zero and 2 ones.
```

### Example 2

```text
Input: s = "101101"
Output: 16
Explanation: The substrings with non-dominant ones are shown in the table
below. Since there are 21 substrings total and 5 of them have non-dominant
ones, it follows that there are 16 substrings with dominant ones.
s[1..1] = "0" has 1 zero and 0 ones.
s[4..4] = "0" has 1 zero and 0 ones.
s[1..4] = "0110" has 2 zeros and 2 ones.
s[0..4] = "10110" has 2 zeros and 3 ones.
s[1..5] = "01101" has 2 zeros and 3 ones.
```

### Constraints

- `1 <= s.length <= 4 * 10⁴`
- `s` consists only of characters `'0'` and `'1'`.

## Hints

### Hint 1

Let us fix the starting index l of the substring and count the number of indices r such that l <= r and the substring s[l..r] has dominant ones.

### Hint 2

A substring with dominant ones has at most sqrt(n) zeros.

### Hint 3

We cannot iterate over every r and check if the s[l..r] has dominant ones. Instead, we iterate over the next sqrt(n) zeros to the left of l and count the number of substrings with dominant ones where the current zero is the rightmost zero of the substring.
