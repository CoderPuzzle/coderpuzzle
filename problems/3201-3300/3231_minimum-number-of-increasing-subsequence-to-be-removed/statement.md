# Minimum Number of Increasing Subsequence to Be Removed

## Description

Given an array of integers `nums`, you are allowed to perform the following operation any number of times:

- Remove a strictly increasing subsequence from the array.

Your task is to find the minimum number of operations required to make the array empty.

### Example 1

```text
Input: nums = [5,3,1,4,2]
Output: 3
Explanation: We remove subsequences [1, 2], [3, 4], [5].
```

### Example 2

```text
Input: nums = [1,2,3,4,5]
Output: 1
```

### Example 3

```text
Input: nums = [5,4,3,2,1]
Output: 5
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Find the longest non-increasing subsequence.

### Hint 2

No two elements of this sequence can be removed in one operation.

### Hint 3

Try to prove that the answer is equal to the length of this sequence.
