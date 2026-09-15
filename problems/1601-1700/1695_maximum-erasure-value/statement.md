# Maximum Erasure Value

## Description

You are given an array of positive integers `nums` and want to erase a
subarray containing unique elements. The score you get by erasing the
subarray is equal to the sum of its elements.

Return the maximum score you can get by erasing exactly one subarray.

An array `b` is a subarray of `a` if it forms a contiguous subsequence of
`a`, that is, if it is equal to `a[l],a[l+1],...,a[r]` for some `(l,r)`.

### Example 1

```text
Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].
```

### Example 2

```text
Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁴`

## Hints

### Hint 1

For each index, only the first subarrays starting from that index can
contain unique elements — once a value repeats, every longer subarray
starting there repeats it too.

### Hint 2

This can be solved using the two pointers technique.
