# Minimum Adjacent Swaps to Alternate Parity

## Description

You are given an array `nums` of distinct integers.

In one operation, you can swap any two adjacent elements in the array.

An arrangement of the array is considered valid if the parity of adjacent
elements alternates, meaning every pair of neighboring elements consists
of one even and one odd number.

Return the minimum number of adjacent swaps required to transform `nums`
into any valid arrangement.

If it is impossible to rearrange `nums` such that no two adjacent
elements have the same parity, return `-1`.

### Example 1

```text
Input: nums = [2,4,6,5,7]
Output: 3
Explanation: Swapping 5 and 6, the array becomes [2,4,5,6,7]
    Swapping 5 and 4, the array becomes [2,5,4,6,7]
    Swapping 6 and 7, the array becomes [2,5,4,7,6]. The array is now a
    valid arrangement. Thus, the answer is 3.
```

### Example 2

```text
Input: nums = [2,4,5,7]
Output: 1
Explanation: By swapping 4 and 5, the array becomes [2,5,4,7], which is
    a valid arrangement. Thus, the answer is 1.
```

### Example 3

```text
Input: nums = [1,2,3]
Output: 0
Explanation: The array is already a valid arrangement. Thus, no
    operations are needed.
```

### Example 4

```text
Input: nums = [4,5,6,8]
Output: -1
Explanation: No valid arrangement is possible. Thus, the answer is -1.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `All elements in nums are distinct.`

## Hints

### Hint 1

Compute evenCnt and oddCnt in nums. If abs(evenCnt - oddCnt) > 1, return
-1 immediately.

### Hint 2

Let n = len(nums). You’ll try at most two target parity‐patterns: one
starting with even at index 0, one with odd at index 0.

### Hint 3

If n is odd, only the pattern whose starting parity matches the larger of
evenCnt or oddCnt is feasible. If n is even, both starting‐even and
starting‐odd patterns are possible—compute both and take the minimum.

### Hint 4

For a given target pattern, collect the indices of all even elements in
nums (or odd elements) and the indices where an even (or odd) should go
in the pattern.

### Hint 5

The minimum adjacent‐swap cost to align those elements is the sum of
absolute differences between each element’s current index and its target
index.

### Hint 6

Return the smallest cost over valid patterns.
