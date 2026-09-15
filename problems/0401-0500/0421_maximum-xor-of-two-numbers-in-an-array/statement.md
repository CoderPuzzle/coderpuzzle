# Maximum XOR of Two Numbers in an Array

## Description

Given an integer array `nums`, return the maximum result of
`nums[i] XOR nums[j]`, where `0 <= i <= j < n`.

### Example 1

```text
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
```

### Example 2

```text
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
```

### Constraints

- `1 <= nums.length <= 2 * 10^5`
- `0 <= nums[i] <= 2^31 - 1`

## Hints

### Hint 1

Build the answer greedily from the highest bit down: at each step decide whether the maximum XOR can have that bit set.

### Hint 2

Keep a set of candidate prefixes, i.e. the numbers masked to the bits considered so far.

### Hint 3

A bit is achievable if two prefixes differ exactly on the bits set so far — check whether candidate XOR prefix is also in the set.
