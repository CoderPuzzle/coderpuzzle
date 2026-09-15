# Minimum Operations to Transform Array

## Description

You are given two integer arrays: nums1 of length n and nums2 of length
n + 1.

You transform nums1 into nums2 using operations. In one operation you choose
an index i of the current array and do exactly one of the following:

- increase nums1[i] by 1;
- decrease nums1[i] by 1;
- append a copy of nums1[i] to the end of the array.

Every element keeps its position relative to the others, an appended copy
lands after everything else, and copies may be adjusted by later operations
just like original elements. Return the minimum number of operations
required to make the array equal to nums2.

### Example 1

```text
Input: nums1 = [2,8], nums2 = [1,7,3]
Output: 4
Explanation: Append nums1[0]: [2,8,2]. Decrease nums1[0] to 1: [1,8,2].
Decrease nums1[1] to 7: [1,7,2]. Increase nums1[2] to 3: [1,7,3]. Four
operations in total.
```

### Example 2

```text
Input: nums1 = [1,3,6], nums2 = [2,4,5,3]
Output: 4
Explanation: Append nums1[1]: [1,3,6,3]. Increase nums1[0] to 2, increase
nums1[1] to 4, and decrease nums1[2] to 5: [2,4,5,3]. Four operations in
total.
```

### Example 3

```text
Input: nums1 = [2], nums2 = [3,4]
Output: 3
Explanation: Increase nums1[0] to 3: [3]. Append nums1[0]: [3,3].
Increase nums1[1] to 4: [3,4]. Three operations in total.
```

### Constraints

- `1 <= n == nums1.length <= 10⁵`
- `nums2.length == n + 1`
- `1 <= nums1[i], nums2[i] <= 10⁵`

## Hints

### Hint 1

nums2 has exactly one more element than nums1, and appending is the only
operation that grows the array — so the extra element must come from
exactly one append.

### Hint 2

Suppose the appended copy is taken from index j. Then nums1[j] must
eventually become both nums2[j] (its own final slot) and nums2.back() (the
appended copy's final slot).

### Hint 3

Walk nums1[j] monotonically toward nums2[j]; the snapshot can be taken
anywhere along that walk. Slot j costs |nums1[j] - nums2[j]| moves, the
append itself, and the distance between nums2.back() and the snapshot
value — which is minimized by clamping nums2.back() onto the span between
nums1[j] and nums2[j].

### Hint 4

For each j, that private cost differs from every other choice of j only by
the clamped distance, since every slot pays |nums1[i] - nums2[i]| either
way. Take the minimum over j.

### Hint 5

A prefix sum makes the per-j totals easy to accumulate — though folding the
constant part out of the minimum removes even that need.
