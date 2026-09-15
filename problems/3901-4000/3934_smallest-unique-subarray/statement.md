# Smallest Unique Subarray

## Description

You are given an integer array `nums`.

Find the minimum length of a subarray that is not identical to any other
subarray in `nums`.

Return an integer denoting the minimum possible length of such a subarray.

Two subarrays are considered identical if they have the same length and the
same elements in corresponding positions.

### Example 1

```text
Input: nums = [3,3,3]
Output: 3
Explanation:
    Subarrays of length 1: [3] → appears 3 times
    Subarrays of length 2: [3, 3] → appears 2 times
    Subarrays of length 3: [3, 3, 3] → appears once

    The subarray [3, 3, 3] is unique, so the smallest unique subarray length
    is 3.
```

### Example 2

```text
Input: nums = [2,1,2,3,3]
Output: 1
Explanation:
    Subarrays of length 1:
    [2] → appears 2 times
    [1] → appears once
    [3] → appears 2 times

    The subarray [1] is unique, so the smallest unique subarray length is 1.
```

### Example 3

```text
Input: nums = [1,1,2,2,1]
Output: 2
Explanation:
    Subarrays of length 1:
    [1] → appears 3 times
    [2] → appears 2 times

    Subarrays of length 2:
    [1, 1] → appears once
    [1, 2] → appears once
    [2, 2] → appears once
    [2, 1] → appears once

    There is at least one subarray of length 2 that is unique, so the smallest
    unique subarray length is 2.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Think in terms of checking a fixed length `len`: count all subarrays of length
`len`, and see whether any one appears exactly once.

### Hint 2

Use rolling hash so each subarray can be represented in `O(1)` after
preprocessing, instead of comparing arrays directly.

### Hint 3

The answer can be binary searched because if there is a unique subarray of
length `len`, then there is also a unique subarray of some length greater than
`len`.

### Hint 4

For each checked length, store frequencies of hashes in a hashmap. If any hash
has frequency 1, that length works.
