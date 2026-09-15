# Minimum Operations to Transform Binary String

## Description

You are given two binary strings s1 and s2 of the same length n.

You can perform the following operations on s1 any number of times, in any order:

- Choose an index i such that s1[i] == '0', and change it to '1'.
- Choose an index i such that 0 <= i < n - 1, and both s1[i] and s1[i + 1] are '1'. Change both characters to '0'.

Return the minimum number of operations required to make s1 equal to s2. If it is impossible, return -1.

### Example 1

```text
Input: s1 = "11", s2 = "00"

Output: 1

Explanation:

Change indices 0 and 1 from '1' to '0' in one operation, so "11" becomes "00". Thus, the answer is 1.
```

### Example 2

```text
Input: s1 = "01", s2 = "10"

Output: 3

Explanation:

    Change index 0 from '0' to '1', so "01" becomes "11".
    Change indices 0 and 1 from '1' to '0', so "11" becomes "00".
    Change index 0 from '0' to '1', so "00" becomes "10".
    Thus, the answer is 3.
```

### Example 3

```text
Input: s1 = "1", s2 = "0"

Output: -1

Explanation:

The first operation cannot change '1' to '0', and the second operation requires two adjacent characters. Therefore, it is impossible.
```

### Constraints

- `1 <= n == s1.length == s2.length <= 10⁵`
- s1 and s2 consist only of '0' and '1'.

## Hints

### Hint 1

The first operation is the only way to change a '0' into a '1'.

### Hint 2

The second operation is the only way to change a '1' into a '0', but it affects two adjacent positions at once.

### Hint 3

Use dynamic programming from left to right. When processing position i, keep enough information to know whether position i has already been affected by an operation involving position i - 1.

### Hint 4

For each position, either make it match directly, or use the second operation on the pair (i, i + 1) after making both characters '1' if necessary.

### Hint 5

Handle the case n == 1 separately, since the second operation cannot be used.
