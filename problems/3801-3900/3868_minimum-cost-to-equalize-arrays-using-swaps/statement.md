# Minimum Cost to Equalize Arrays Using Swaps

## Description

You are given two integer arrays nums1 and nums2 of size n.

You can perform the following two operations any number of times on these two
arrays:

- Swap within the same array: Choose two indices i and j. Then, choose either
  to swap nums1[i] and nums1[j], or nums2[i] and nums2[j]. This operation is
  free of charge.
- Swap between two arrays: Choose an index i. Then, swap nums1[i] and
  nums2[i]. This operation incurs a cost of 1.

Return an integer denoting the minimum cost to make nums1 and nums2 identical.
If this is not possible, return -1.

### Example 1

```text
Input: nums1 = [10,20], nums2 = [20,10]
Output: 0
Explanation: Swap nums2[0] = 20 and nums2[1] = 10 so that nums2 becomes
[10, 20]. This operation is free of charge. nums1 and nums2 are now
identical, so the cost is 0.
```

### Example 2

```text
Input: nums1 = [10,10], nums2 = [20,20]
Output: 1
Explanation: Swap nums1[0] = 10 and nums2[0] = 20 so that nums1 becomes
[20, 10] and nums2 becomes [10, 20]; this operation costs 1. Then swap
nums2[0] = 10 and nums2[1] = 20 so that nums2 becomes [20, 10]; this
operation is free of charge. nums1 and nums2 are now identical, so the cost
is 1.
```

### Example 3

```text
Input: nums1 = [10,20], nums2 = [30,40]
Output: -1
Explanation: It is impossible to make the two arrays identical. Therefore,
the answer is -1.
```

### Constraints

- `2 <= n == nums1.length == nums2.length <= 8 * 10⁴`
- `1 <= nums1[i], nums2[i] <= 8 * 10⁴`

## Hints

### Hint 1

Since swaps inside the same array are free, positions do not matter; only
frequencies matter.

### Hint 2

Let cnt1[v] and cnt2[v] be frequencies. If cnt1[v] + cnt2[v] is odd for any v,
return -1.

### Hint 3

Let diff[v] = abs(cnt1[v] - cnt2[v]). Each cross swap fixes two mismatches,
so minimum cost = sum(diff[v]) / 4.
