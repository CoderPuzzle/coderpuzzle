# Count Number of Distinct Integers After Reverse Operations

## Description

You are given an array `nums` consisting of positive integers.

You have to take each integer in the array, reverse its digits, and add it
to the end of the array. You should apply this operation to the original
integers in `nums`.

Return the number of distinct integers in the final array.

Note that reversed integers may have leading zeros. For example, reversing
`10` gives `01`, which is just `1`.

### Example 1

```text
Input: nums = [1,13,10,12,31]
Output: 6
Explanation: After including the reverse of each number, the resulting array is [1,13,10,12,31,1,31,1,21,13].
The reversed integers that were added to the end of the array are underlined. Note that for the integer 10, after reversing it, it becomes 01 which is just 1.
The number of distinct integers in this array is 6 (The numbers 1, 10, 12, 13, 21, and 31).
```

### Example 2

```text
Input: nums = [2,2,2]
Output: 1
Explanation: After including the reverse of each number, the resulting array is [2,2,2,2,2,2].
The number of distinct integers in this array is 1 (The number 2).
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

## Hints

### Hint 1

What data structure allows us to insert numbers and find the number of distinct numbers in it?

### Hint 2

Try using a set, insert all the numbers and their reverse into it, and return its size.
