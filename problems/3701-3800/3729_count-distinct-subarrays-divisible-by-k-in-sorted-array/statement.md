# Count Distinct Subarrays Divisible by K in Sorted Array

## Description

You are given an integer array `nums` sorted in non-descending order and a
positive integer `k`.

A subarray of `nums` is called **good** when the sum of its elements is
divisible by `k`.

Subarrays are distinguished by their sequences of values, not by where they
lie in the array: two spans name the same subarray exactly when they read
identically, element for element. For example, `[1, 1, 1]` contains three
distinct subarrays — `[1]`, `[1, 1]`, and `[1, 1, 1]` — even though the
single-element one occurs at three different positions.

Return the number of distinct good subarrays of `nums`.

### Example 1

```text
Input: nums = [1,2,3], k = 3
Output: 3
Explanation: The good subarrays are [1,2], [3], and [1,2,3]. The span
[1,2,3] is good because its elements sum to 1 + 2 + 3 = 6, and 6 is
divisible by 3.
```

### Example 2

```text
Input: nums = [2,2,2,2,2,2], k = 6
Output: 2
Explanation: The good subarrays are [2,2,2] and [2,2,2,2,2,2]: they sum to
6 and to 12 respectively, both divisible by 6. The six occurrences of
[2,2,2] share one sequence of values, so they count only once.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `nums` is sorted in non-descending order.
- `1 <= k <= 10⁹`

## Hints

### Hint 1

A subarray's sum is a difference of two prefix sums, so it is divisible by
`k` exactly when those two prefixes leave the same remainder modulo `k`.

### Hint 2

Because `nums` never decreases, a span that crosses a strict increase is the
only span carrying its exact sequence of values — where it crosses and how
many elements it takes from each edge identify it completely. Identical
sequences can therefore repeat only among windows that sit inside a single
run of equal elements.

### Hint 3

For a run holding value `v`, a window of length `L` inside it sums to
`L * v`; that window is good precisely when `(L * v) % k == 0`. Counting
those lengths per run removes the positional overcounting left by the sweep.
