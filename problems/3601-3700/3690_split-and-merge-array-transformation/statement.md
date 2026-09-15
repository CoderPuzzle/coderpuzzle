# Split and Merge Array Transformation

## Description

You are given two integer arrays, `nums1` and `nums2`, both of length `n`.

One split-and-merge operation on `nums1` works as follows:

- Choose a contiguous subarray `nums1[L..R]` and cut it out, leaving the
  prefix `nums1[0..L-1]` (empty when `L = 0`) and the suffix
  `nums1[R+1..n-1]` (empty when `R = n - 1`).
- Paste the cut piece back — keeping its internal order — at any position
  among the remaining elements: at the very start, at the very end, or
  between any two adjacent elements.

Return the minimum number of split-and-merge operations needed to turn
`nums1` into `nums2`.

### Example 1

```text
Input: nums1 = [3,1,2], nums2 = [1,2,3]
Output: 1
Explanation:
Cut out the subarray [3] (L = 0, R = 0); the remaining array is [1,2].
Paste [3] at the end; the array becomes [1,2,3].
```

### Example 2

```text
Input: nums1 = [1,1,2,3,4,5], nums2 = [5,4,3,2,1,1]
Output: 3
Explanation:
Cut [1,1,2] at indices 0-2; the remainder is [3,4,5]; paste it at
position 2 to get [3,4,1,1,2,5].
Cut [4,1,1] at indices 1-3; the remainder is [3,2,5]; paste it at
position 3 to get [3,2,5,4,1,1].
Cut [3,2] at indices 0-1; the remainder is [5,4,1,1]; paste it at
position 2 to get [5,4,3,2,1,1].
```

### Constraints

- `2 <= n == nums1.length == nums2.length <= 6`
- `-10^5 <= nums1[i], nums2[i] <= 10^5`
- `nums2` is a permutation of `nums1`.

## Hints

### Hint 1

Search the space of array states breadth-first: start from `nums1` and aim
for `nums2`.

### Hint 2

Represent each state as an array (or tuple) and enqueue it together with its
current operation count.

### Hint 3

Keep a visited set keyed by the state so no configuration is processed
twice.

### Hint 4

For each state taken off the queue, generate every split-and-merge successor:
try every subarray `[L..R]`, cut it out, and paste it at every possible
position in the remainder.

### Hint 5

Stop as soon as `nums2` comes off the queue, and return the operation count
carried alongside it.
