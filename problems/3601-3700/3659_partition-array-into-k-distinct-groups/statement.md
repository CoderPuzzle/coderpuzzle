# Partition Array Into K-Distinct Groups

## Description

You are given an integer array `nums` and an integer `k`.

Return `true` if the elements of `nums` can be split into one or more groups
such that:

- Every group contains exactly `k` elements.
- The elements within each group are pairwise distinct.
- Every element of `nums` is assigned to exactly one group.

Return `false` otherwise.

### Example 1

```text
Input: nums = [1,2,3,4], k = 2
Output: true
Explanation: Two groups work: [1,2] and [3,4]. Each group holds exactly
k = 2 distinct elements, and every element is used exactly once.
```

### Example 2

```text
Input: nums = [3,5,2,2], k = 2
Output: true
Explanation: One valid grouping is [2,3] and [2,5]: the two copies of 2
land in different groups, and each group holds two distinct elements.
```

### Example 3

```text
Input: nums = [1,5,2,3], k = 3
Output: false
Explanation: Four elements cannot be split into whole groups of size
k = 3, so no valid grouping exists.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Think about how many groups of size `k` you need to form.

### Hint 2

Each group must contain exactly `k` distinct elements.

### Hint 3

If any element appears more times than the number of groups, it cannot be placed uniquely in each group.

### Hint 4

Use a frequency map to count the occurrences of each element.

### Hint 5

If the total number of elements `n` is not divisible by `k`, partitioning is impossible.
