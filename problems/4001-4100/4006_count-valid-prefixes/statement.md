# Count Valid Prefixes

## Description

You are given a binary string `s`.

A prefix of `s` is considered valid if its characters can be rearranged
to form an alternating string.

Return the number of valid prefixes of `s`.

A string is considered alternating if no two adjacent characters are equal.

### Example 1

```text
Input: s = "00101"
Output: 3
Explanation:

The valid prefixes are:

	"0": It is already an alternating string.
	"001": It can be rearranged into "010", which is an alternating string.
	"00101": It can be rearranged into "01010", which is an alternating string.

Thus, the answer is 3.
```

### Example 2

```text
Input: s = "101"
Output: 3
Explanation:

All prefixes of s = "101" are already alternating strings. Thus, the answer is 3.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists only of '0' and '1'.

## Hints

### Hint 1

A binary string can be rearranged into an alternating string if the numbers of '0' and '1' differ by at most one.

### Hint 2

Scan s from left to right, maintain the counts of both characters in the current prefix, and count the prefixes satisfying this condition.
