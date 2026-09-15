# Array With Elements Not Equal to Average of Neighbors

## Description

You are given a 0-indexed array `nums` of distinct integers. You want to
rearrange the elements in the array such that every element in the
rearranged array is not equal to the average of its neighbors.

More formally, the rearranged array should have the property such that for
every `i` in the range `1 <= i < nums.length - 1`,
`(nums[i-1] + nums[i+1]) / 2` is not equal to `nums[i]`.

Return any rearrangement of `nums` that meets the requirements.

Many rearrangements satisfy the condition, but this judge compares one
exact answer, so the required return is pinned to a single deterministic
form: sort `nums` ascending, then place the larger half of the sorted
array on the even indices `0, 2, 4, ...` and the smaller half on the odd
indices `1, 3, 5, ...`, preserving the order within each half.

### Example 1

```text
Input: nums = [1,2,3,4,5]
Output: [3,1,4,2,5]
Explanation:
The sorted array is [1,2,3,4,5], so the smaller half [1,2] lands on the
odd indices and the larger half [3,4,5] on the even indices.
When i=1, nums[i] = 1, and the average of its neighbors is (3+4) / 2 = 3.5.
When i=2, nums[i] = 4, and the average of its neighbors is (1+2) / 2 = 1.5.
When i=3, nums[i] = 2, and the average of its neighbors is (4+5) / 2 = 4.5.
```

### Example 2

```text
Input: nums = [6,2,0,9,7]
Output: [6,0,7,2,9]
Explanation:
The sorted array is [0,2,6,7,9], so the smaller half [0,2] lands on the
odd indices and the larger half [6,7,9] on the even indices.
When i=1, nums[i] = 0, and the average of its neighbors is (6+7) / 2 = 6.5.
When i=2, nums[i] = 7, and the average of its neighbors is (0+2) / 2 = 1.
When i=3, nums[i] = 2, and the average of its neighbors is (7+9) / 2 = 8.
Note that the original array [6,2,0,9,7] also satisfies the conditions.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`

## Hints

### Hint 1

A number can be the average of its neighbors if one neighbor is smaller
than the number and the other is greater than the number.

### Hint 2

We can put numbers smaller than the median on odd indices and the rest on
even indices.
