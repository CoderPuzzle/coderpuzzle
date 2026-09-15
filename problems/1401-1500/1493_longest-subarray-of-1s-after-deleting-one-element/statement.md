# Longest Subarray of 1's After Deleting One Element

## Description

Given a binary array `nums`, you should delete one element from it.

Return the size of the longest non-empty subarray containing only `1's` in the
resulting array. Return `0` if there is no such subarray.

### Example 1

```text
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
```

### Example 2

```text
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
```

### Example 3

```text
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Hints

### Hint 1

Maintain a sliding window that contains at most one zero.

### Hint 2

The best window minus its zero (or minus one element if the window is all ones) is the answer.

### Hint 3

You must delete exactly one element, so an all-ones array of length n yields n - 1.
