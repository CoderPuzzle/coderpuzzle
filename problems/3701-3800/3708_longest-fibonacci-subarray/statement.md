# Longest Fibonacci Subarray

## Description

You are given an array of positive integers `nums`.

A Fibonacci array is a contiguous sequence whose third and subsequent terms
each equal the sum of the two preceding terms. Return the length of the
longest Fibonacci subarray of `nums`.

Every subarray of length 1 or 2 is always a Fibonacci array.

### Example 1

```text
Input: nums = [1,1,1,1,2,3,5,1]
Output: 5
Explanation: The longest Fibonacci subarray is nums[2..6] = [1,1,2,3,5]:
it is Fibonacci because 1 + 1 = 2, 1 + 2 = 3, and 2 + 3 = 5.
```

### Example 2

```text
Input: nums = [5,2,7,9,16]
Output: 5
Explanation: The whole array is the longest Fibonacci subarray:
it is Fibonacci because 5 + 2 = 7, 2 + 7 = 9, and 7 + 9 = 16.
```

### Example 3

```text
Input: nums = [1000000000,1000000000,1000000000]
Output: 2
Explanation: No length-3 subarray qualifies because 1000000000 + 1000000000
is not an element of this array, so the longest Fibonacci subarray has
length 2 — any two adjacent elements qualify.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Any subarray of length 1 or 2 is already Fibonacci, so start counting from
length 2.

### Hint 2

If `nums[i] == nums[i - 1] + nums[i - 2]`, extend the current run;
otherwise reset its length to 2.

### Hint 3

Track the maximum run length during one pass.
