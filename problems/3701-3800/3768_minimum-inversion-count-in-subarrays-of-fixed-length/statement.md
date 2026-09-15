# Minimum Inversion Count in Subarrays of Fixed Length

## Description

You are given an integer array `nums` of length `n` and an integer `k`.

An inversion is a pair of indices `(i, j)` — taken relative to the subarray
being considered — such that `i < j` and `nums[i] > nums[j]`. The inversion
count of a subarray is the number of inversions inside it.

Return the minimum inversion count among all subarrays of `nums` with
length exactly `k`.

### Example 1

```text
Input: nums = [3,1,2,5,4], k = 3
Output: 0
Explanation: The subarrays of length 3 are [3,1,2] with 2 inversions,
[1,2,5] with none, and [2,5,4] with 1 (the pair 5,4). The minimum
inversion count is 0, achieved by [1,2,5].
```

### Example 2

```text
Input: nums = [5,3,2,1], k = 4
Output: 6
Explanation: The only subarray of length 4 is the whole array. Every one
of its 6 index pairs is an inversion, so the minimum is 6.
```

### Example 3

```text
Input: nums = [2,1], k = 1
Output: 0
Explanation: Every subarray of length 1 holds a single element, so no
pair — and therefore no inversion — can exist anywhere.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= n`

## Hints

### Hint 1

Recounting every window from scratch repeats work: two neighboring windows
share `k - 1` elements. What exactly changes when the window slides one
step to the right?

### Hint 2

Only two elements change: one leaves at the front, another enters at the
back. The leaving element contributed a number of inversions equal to how
many smaller elements remain inside the window; the entering element adds
one new inversion for each larger element already inside.

### Hint 3

Answering "how many elements inside the current window are smaller/greater
than x?" is a dynamic rank query over a changing set. Coordinate-compress
the values to `1..n`, then maintain the window's elements in a Fenwick
tree (BIT) indexed by compressed value.

### Hint 4

Slide carefully: remove the front element first, subtract its smaller
companions from the count, then insert the back element and add its larger
companions. Computing both terms against the correct intermediate window
state is where off-by-one bugs hide.
