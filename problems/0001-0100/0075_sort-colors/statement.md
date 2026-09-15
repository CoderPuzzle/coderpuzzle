# Sort Colors

## Description

Given an array `nums` with `n` objects colored red, white, or blue, sort them
**in-place** so that objects of the same color are adjacent, with the colors
in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white,
and blue, respectively.

Sort the array and **return the resulting array**. (On LeetCode this problem
modifies the array in place with no return value; here you must sort `nums`
and return it.)

You must solve this problem without using the library's sort function.

### Example 1

```text
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

### Example 2

```text
Input: nums = [2,0,1]
Output: [0,1,2]
```

### Constraints

- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` is either `0`, `1`, or `2`.

**Follow up:** Could you come up with a one-pass algorithm using only constant
extra space?

## Hints

### Hint 1

A rather straight forward solution is a two-pass algorithm using counting sort.

### Hint 2

Iterate the array counting number of 0's, 1's, and 2's.

### Hint 3

Overwrite array with the total number of 0's, then 1's and followed by 2's.

### Hint 4

For the follow-up, the Dutch national flag algorithm uses three pointers in a single pass.
