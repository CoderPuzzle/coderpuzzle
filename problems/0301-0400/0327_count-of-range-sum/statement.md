# Count of Range Sum

## Description

Given an integer array `nums` and two integers `lower` and `upper`, return the
number of range sums that lie in `[lower, upper]` inclusive.

Range sum `S(i, j)` is defined as the sum of the elements in `nums` between
indices `i` and `j` inclusive, where `i <= j`.

### Example 1

```text
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.
```

### Example 2

```text
Input: nums = [0], lower = 0, upper = 0
Output: 1
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `-10^5 <= lower <= upper <= 10^5`
- The answer is guaranteed to fit in a 32-bit integer.

## Hints

### Hint 1

A range sum S(i, j) equals prefix[j] - prefix[i - 1], so the problem becomes counting pairs of prefix sums whose difference lies in [lower, upper].

### Hint 2

The prefix sums are not sorted, but a divide-and-conquer (merge sort) sweep over them counts the valid pairs in O(n log n).

### Hint 3

During the merge step the left half is already sorted; two advancing pointers over the right half find, for each left value, the window of right values whose difference stays inside [lower, upper].

### Hint 4

Prefix sums can overflow 32-bit arithmetic, so compute and store them in a wider type.
