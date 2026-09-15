# Running Sum of 1d Array

## Description

Given an array `nums`. We define a running sum of an array as
`runningSum[i] = sum(nums[0]…nums[i])`.

Return the running sum of `nums`.

### Example 1

```text
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: The running sum is obtained as follows:
[1, 1+2, 1+2+3, 1+2+3+4].
```

### Example 2

```text
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
Explanation: The running sum is obtained as follows:
[1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].
```

### Example 3

```text
Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]
```

### Constraints

- `1 <= nums.length <= 1000`
- `-10⁶ <= nums[i] <= 10⁶`

## Hints

### Hint 1

Think about how the `i`-th number of the running sum can be computed from
the `(i-1)`-th number.
