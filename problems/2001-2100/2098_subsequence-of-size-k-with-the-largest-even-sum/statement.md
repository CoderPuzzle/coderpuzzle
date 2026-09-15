# Subsequence of Size K With the Largest Even Sum

## Description

You are given an integer array nums and an integer k. Find the largest even sum of any subsequence of nums that has a length of k.

Return this sum, or -1 if such a sum does not exist.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

### Example 1

```text
Input: nums = [4,1,5,3,1], k = 3
Output: 12
Explanation:
The subsequence with the largest possible even sum is [4,5,3]. It has a sum of 4 + 5 + 3 = 12.
```

### Example 2

```text
Input: nums = [4,6,2], k = 3
Output: 12
Explanation:
The subsequence with the largest possible even sum is [4,6,2]. It has a sum of 4 + 6 + 2 = 12.
```

### Example 3

```text
Input: nums = [1,3,5], k = 1
Output: -1
Explanation:
No subsequence of nums with length 1 has an even sum.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Is the sum of two even numbers even or odd? How about two odd numbers? One odd number and one even number?

### Hint 2

If there is an even number of odd numbers, the sum will be even and vice versa.

### Hint 3

Create an integer array to store all the even numbers in nums and another array to store all the odd numbers in nums. Sort both arrays.
