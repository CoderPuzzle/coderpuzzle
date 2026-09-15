# Make the XOR of All Segments Equal to Zero

## Description

You are given an array `nums` and an integer `k`. The XOR of a segment
`[left, right]` where `left <= right` is the XOR of all the elements with
indices between `left` and `right`, inclusive:
`nums[left] XOR nums[left+1] XOR ... XOR nums[right]`.

Return the minimum number of elements to change in the array such that the
XOR of all segments of size `k` is equal to zero.

### Example 1

```text
Input: nums = [1,2,0,3,0], k = 1
Output: 3
Explanation: Modify the array from [1,2,0,3,0] to from [0,0,0,0,0].
```

### Example 2

```text
Input: nums = [3,4,5,2,1,7,3,4,7], k = 3
Output: 3
Explanation: Modify the array from [3,4,5,2,1,7,3,4,7] to
[3,4,7,3,4,7,3,4,7].
```

### Example 3

```text
Input: nums = [1,2,4,1,2,5,1,2,6], k = 3
Output: 3
Explanation: Modify the array from [1,2,4,1,2,5,1,2,6] to
[1,2,3,1,2,3,1,2,3].
```

### Constraints

- `1 <= k <= nums.length <= 2000`
- `0 <= nums[i] < 2¹⁰`

## Hints

### Hint 1

Let's note that for the XOR of all segments with size K to be equal to
zeros, `nums[i]` has to be equal to `nums[i+k]`

### Hint 2

Basically, we need to make the first K elements have XOR = 0 and then
modify them.
