# Maximum Subarray XOR with Bounded Range

## Description

You are given a non-negative integer array nums and an integer k.

You must select a subarray of nums such that the difference between its
maximum and minimum elements is at most k. The value of this subarray is
the bitwise XOR of all elements in the subarray.

Return an integer denoting the maximum possible value of the selected
subarray.

### Example 1

```text
Input: nums = [5,4,5,6], k = 2
Output: 7
Explanation: Select the subarray [5, 4, 5, 6].
The difference between its maximum and minimum elements is 6 - 4 = 2 <= k.
The value is 4 XOR 5 XOR 6 = 7.
```

### Example 2

```text
Input: nums = [5,4,5,6], k = 1
Output: 6
Explanation: Select the subarray [5, 4, 5, 6].
The difference between its maximum and minimum elements is 6 - 6 = 0 <= k.
The value is 6.
```

### Constraints

- `1 <= nums.length <= 4 * 10⁴`
- `0 <= nums[i] < 2¹⁵`
- `0 <= k < 2¹⁵`

## Hints

### Hint 1

Maintain an active window such that the difference between its maximum and
minimum is at most k

### Hint 2

For all valid subarray-start indices i, insert their prefix xors pref[i]
into a trie (use pref[0] = 0, pref[i + 1] = pref[i] ^ nums[i]); keep counts
per node to support deletions as L moves

### Hint 3

For each right index r, query the trie with pref[r + 1] to get the maximum
pref[r + 1] ^ pref[l] for l in [L, r]
