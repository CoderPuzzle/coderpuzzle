# Find K Pairs with Smallest Sums

## Description

You are given two integer arrays `nums1` and `nums2` sorted in non-decreasing
order and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and
one element from the second array.

Return the `k` pairs `(u1, v1), (u2, v2), ..., (uk, vk)` with the smallest
sums. The pairs must be returned in non-decreasing order of their sums; when
two pairs have the same sum, the pair whose element from `nums1` has the
smaller index comes first (equal-sum pairs produced from duplicate values are
identical).

### Example 1

```text
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence:
[1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
```

### Example 2

```text
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence:
[1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
```

### Constraints

- `1 <= nums1.length, nums2.length <= 10^5`
- `-10^9 <= nums1[i], nums2[i] <= 10^9`
- `nums1` and `nums2` both are sorted in non-decreasing order.
- `1 <= k <= 10^4`
- `k <= nums1.length * nums2.length`

## Hints

### Hint 1

The pair (nums1[i], nums2[0]) is the smallest pair starting with nums1[i], so a min-heap seeded with the first min(k, nums1.length) of these candidates yields the global minimum pair.

### Hint 2

When a pair (nums1[i], nums2[j]) is popped from the heap, its only successor with a larger sum is (nums1[i], nums2[j+1]) — push that and repeat k times.

### Hint 3

Never enumerate all pairs: there can be up to 10^10 of them, while only k <= 10^4 are needed.
