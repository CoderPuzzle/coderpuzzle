# Maximum Sum of Three Numbers Divisible by Three

## Description

You are given an integer array nums.

Your task is to choose exactly three integers from nums such that their sum
is divisible by three.

Return the maximum possible sum of such a triplet. If no such triplet exists,
return 0.

### Example 1

```text
Input: nums = [4,2,3,1]
Output: 9
Explanation: The valid triplets whose sum is divisible by 3 are:
(4, 2, 3) with a sum of 4 + 2 + 3 = 9.
(2, 3, 1) with a sum of 2 + 3 + 1 = 6.
Thus, the answer is 9.
```

### Example 2

```text
Input: nums = [2,1,5]
Output: 0
Explanation: No triplet forms a sum divisible by 3, so the answer is 0.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Split numbers into groups by x % 3.

### Hint 2

Only four valid combinations for sum % 3 == 0.

### Hint 3

Possible combinations are 0 + 0 + 0, 1 + 1 + 1, 2 + 2 + 2, 0 + 1 + 2.

### Hint 4

Sort groups descending, try each combo using top values.
