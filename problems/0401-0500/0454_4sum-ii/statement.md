# 4Sum II

## Description

Given four integer arrays `nums1`, `nums2`, `nums3`, and `nums4` all of
length `n`, return the number of tuples `(i, j, k, l)` such that:

- `0 <= i, j, k, l < n`
- `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

### Example 1

```text
Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
Output: 2
Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```

### Example 2

```text
Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
Output: 1
```

### Constraints

- `n == nums1.length == nums2.length == nums3.length == nums4.length`
- `1 <= n <= 200`
- `-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28`

## Hints

### Hint 1

Split the four arrays into two pairs: count pairs with nums1[i] + nums2[j] = -(nums3[k] + nums4[l]).

### Hint 2

Build a hash map from every a + b sum to how many index pairs produce it.

### Hint 3

For each c + d sum, add the count of its negation from the map — this meet-in-the-middle turns O(n^4) into O(n^2).
