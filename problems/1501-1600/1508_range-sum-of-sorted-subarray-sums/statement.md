# Range Sum of Sorted Subarray Sums

## Description

You are given an array `nums` of `n` positive integers. Compute the sum of
every non-empty contiguous subarray of `nums`, then sort those sums in
non-decreasing order. This produces a new array of `n * (n + 1) / 2`
numbers.

Return the sum of the elements from index `left` to index `right`
(1-indexed), inclusive, in that sorted array. Since the answer can be a
huge number, return it modulo `10^9 + 7`.

### Example 1

```text
Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. Sorted in
non-decreasing order they form [1,2,3,3,4,5,6,7,9,10]. The sum of the
elements from index 1 to index 5 is 1 + 2 + 3 + 3 + 4 = 13.
```

### Example 2

```text
Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The array is the same as example 1, sorted to
[1,2,3,3,4,5,6,7,9,10]. The sum of the elements from index 3 to index 4 is
3 + 3 = 6.
```

### Example 3

```text
Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50
```

### Constraints

- `n == nums.length`
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 100`
- `1 <= left <= right <= n * (n + 1) / 2`

## Hints

### Hint 1

Compute all sums and save them in an array.

### Hint 2

Then just go from the `left` index to the `right` index and accumulate the
answer modulo `10^9 + 7`.
