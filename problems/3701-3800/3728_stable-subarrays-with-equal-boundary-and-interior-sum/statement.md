# Stable Subarrays With Equal Boundary and Interior Sum

## Description

You are given an integer array `capacity`.

A subarray `capacity[l..r]` is called **stable** when both of the following
hold:

- Its length is at least 3.
- Its first and last elements are each equal to the sum of all elements
  strictly between them, i.e. `capacity[l] == capacity[r] ==
capacity[l + 1] + capacity[l + 2] + ... + capacity[r - 1]`.

Return the number of stable subarrays.

### Example 1

```text
Input: capacity = [9,3,3,3,9]
Output: 2
Explanation: [9,3,3,3,9] is stable because its first and last elements are
both 9 and the elements strictly between them sum to 3 + 3 + 3 = 9. [3,3,3]
is stable because its first and last elements are both 3 and the one element
strictly between them is 3.
```

### Example 2

```text
Input: capacity = [1,2,3,4,5]
Output: 0
Explanation: No subarray of length at least 3 has equal first and last
elements.
```

### Example 3

```text
Input: capacity = [-4,4,0,0,-8,-4]
Output: 1
Explanation: [-4,4,0,0,-8,-4] is stable because its first and last elements
are both -4 and the elements strictly between them sum to 4 + 0 + 0 +
(-8) = -4.
```

### Constraints

- `3 <= capacity.length <= 10⁵`
- `-10⁹ <= capacity[i] <= 10⁹`

## Hints

### Hint 1

Use prefix sums.

### Hint 2

Let `p` be the prefix sum array with `p[i] = capacity[0] + ... +
capacity[i]`. For a range `[l, r]`, the interior-sum condition becomes
`p[r - 1] - p[l] == capacity[r]`, alongside `capacity[l] == capacity[r]`.

### Hint 3

For each index `r`, count the earlier indices `l` satisfying `p[l] == p[r -
1] - capacity[r]` and `capacity[l] == capacity[r]`. Only indices up to
`r - 2` may serve as `l`, since the length must reach 3.

### Hint 4

Sweep `r` left to right while maintaining a map from `(capacity[i], p[i])`
to a frequency count, so each right end's answer is read off the map in
constant time.
