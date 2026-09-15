# Number of Stable Subsequences

## Description

You are given an integer array `nums`.

A subsequence of `nums` is stable when, read from left to right, no three
consecutive elements of the subsequence share the same parity. Parity is
whether a value is even or odd, and consecutive means adjacent within the
subsequence — those elements may sit far apart in `nums`. Any subsequence of
length 1 or 2 is automatically stable.

Return the number of non-empty stable subsequences of `nums`. Since the
answer can be very large, return it modulo `10^9 + 7`.

### Example 1

```text
Input: nums = [1,3,5]
Output: 6
Explanation: The stable subsequences are [1], [3], [5], [1,3], [1,5] and
[3,5]. The remaining subsequence [1,3,5] is not stable: read in order, its
three elements are all odd.
```

### Example 2

```text
Input: nums = [2,3,4,2]
Output: 14
Explanation: Of the 15 non-empty subsequences, exactly one is not stable:
[2,4,2], which carries three consecutive even numbers. All others are
stable.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Hints

### Hint 1

Any subsequence of length 1 or 2 is always stable.

### Hint 2

A subsequence becomes invalid only by appending a third consecutive element of the same parity to its end.

### Hint 3

Use dynamic programming that tracks the last element's parity and how many consecutive elements of that parity the subsequence ends with (1 or 2).

### Hint 4

For each new number, either start a new subsequence, extend with the same parity (if that run count < 2), or extend with a different parity (reset the run count to 1).
