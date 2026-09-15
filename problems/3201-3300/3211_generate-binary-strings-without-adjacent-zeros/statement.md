# Generate Binary Strings Without Adjacent Zeros

## Description

You are given a positive integer `n`.

A binary string `x` is **valid** when every substring of `x` of length `2`
contains at least one `"1"` — equivalently, `"00"` never occurs inside
`x`.

Return all valid strings of length `n`. For a deterministic answer, return
them sorted in ascending lexicographic order; since every returned string
has the same length `n`, that is also ascending order when the strings are
read as binary numbers.

### Example 1

```text
Input: n = 3
Output: ["010","011","101","110","111"]
Explanation: These are exactly the five length-3 binary strings in which
no two adjacent characters are both zeros.
```

### Example 2

```text
Input: n = 1
Output: ["0","1"]
Explanation: A single character cannot hold two adjacent zeros, so both
binary strings qualify.
```

### Constraints

- `1 <= n <= 18`

## Hints

### Hint 1

If we have a string s of length x, we can generate all strings of length
x + 1.

### Hint 2

If s has 0 as the last character, we can only append 1, whereas if the last
character is 1, we can append both 0 and 1.

### Hint 3

We can use recursion and backtracking to generate all such strings.
