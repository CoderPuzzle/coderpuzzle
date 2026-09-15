# Find Latest Group of Size M

## Description

`arr` is a permutation of the integers `1` through `n`. Start with a binary
string of length `n`, every bit set to `0`. At step `i` (steps and string
positions are both 1-indexed), the bit at position `arr[i]` is flipped to
`1`, for `i` from `1` to `n`.

A group of ones is a maximal run of consecutive `1` bits — a contiguous
block that cannot be extended on either side without hitting a `0` or the
edge of the string.

Given an integer `m`, return the latest step at which the string contains
at least one group of ones whose length is exactly `m`. If no step ever
produces such a group, return `-1`.

### Example 1

```text
Input: arr = [3,5,1,2,4], m = 1
Output: 4
Explanation: The string after each step is:
Step 1: "00100", groups: ["1"]
Step 2: "00101", groups: ["1", "1"]
Step 3: "10101", groups: ["1", "1", "1"]
Step 4: "11101", groups: ["111", "1"]
Step 5: "11111", groups: ["11111"]
The latest step with a group of length 1 is step 4 (the lone "1" at the
end); by step 5 everything has merged into one group of length 5.
```

### Example 2

```text
Input: arr = [3,1,5,4,2], m = 2
Output: -1
Explanation: The string after each step is:
Step 1: "00100", groups: ["1"]
Step 2: "10100", groups: ["1", "1"]
Step 3: "10101", groups: ["1", "1", "1"]
Step 4: "10111", groups: ["1", "111"]
Step 5: "11111", groups: ["11111"]
No step ever produces a group of length exactly 2, so the answer is -1.
```

### Constraints

- `n == arr.length`
- `1 <= m <= n <= 10⁵`
- `1 <= arr[i] <= n`
- All integers in `arr` are distinct.

## Hints

### Hint 1

Since the question asks for the latest step, consider scanning `arr` from
its end instead of simulating forward.

### Hint 2

Keep a map from group length to how many groups currently have that
length.

### Hint 3

When you flip a bit on, look at its left and right neighbors: it may join
an existing group on either side, split what looks like a gap, or start a
group of its own. Update the length-count map accordingly at every step.
