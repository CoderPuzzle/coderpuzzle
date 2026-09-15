# Longest Alternating Subarray After Removing At Most One Element

## Description

You are given an integer array nums.

A subarray nums[l..r] is alternating if one of the following holds:

- nums[l] < nums[l + 1] > nums[l + 2] < nums[l + 3] > ...
- nums[l] > nums[l + 1] < nums[l + 2] > nums[l + 3] < ...

In other words, if we compare adjacent elements in the subarray, then the
comparisons alternate between strictly greater and strictly smaller.

You can remove at most one element from nums. Then, you select an
alternating subarray from nums.

Return an integer denoting the maximum length of the alternating subarray
you can select.

A subarray of length 1 is considered alternating.

### Example 1

```text
Input: nums = [2,1,3,2]
Output: 4
Explanation: Choose not to remove elements.
Select the entire array [2, 1, 3, 2], which is alternating because
2 > 1 < 3 > 2.
```

### Example 2

```text
Input: nums = [3,2,1,2,3,2,1]
Output: 4
Explanation: Choose to remove nums[3] i.e., [3, 2, 1, 2, 3, 2, 1]. The array
becomes [3, 2, 1, 3, 2, 1].
Select the subarray [3, 2, 1, 3, 2, 1].
```

### Example 3

```text
Input: nums = [100000,100000]
Output: 1
Explanation: Choose not to remove elements.
Select the subarray [100000, 100000].
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Define left[i][d] as the maximum length of an alternating subarray ending at
index i, where d = 0 means the last comparison is < and d = 1 means the last
comparison is >. Define right[i][d] similarly for subarrays starting at i.

### Hint 2

Fill left from left to right and right from right to left; if adjacent values
are equal, the alternating chain must restart since == is invalid.

### Hint 3

Try removing each index r: if nums[r - 1] < nums[r + 1], the two sides can
connect with pattern < >, giving length left[r - 1][0] + right[r + 1][1];
if nums[r - 1] > nums[r + 1], connect with pattern > <, giving
left[r - 1][1] + right[r + 1][0].

### Hint 4

Also consider not removing any element by taking the maximum value over all
left[i][d].
