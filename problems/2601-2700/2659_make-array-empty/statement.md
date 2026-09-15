# Make Array Empty

## Description

You are given an integer array `nums` containing distinct numbers, and you can perform the following operations until the array is empty:

- If the first element has the smallest value, remove it.
- Otherwise, put the first element at the end of the array.

Return an integer denoting the number of operations it takes to make `nums` empty.

### Example 1

```text
Input: nums = [3,4,-1]
Output: 5

Operation | Array
1         | [4, -1, 3]
2         | [-1, 3, 4]
3         | [3, 4]
4         | [4]
5         | []
```

### Example 2

```text
Input: nums = [1,2,4,3]
Output: 5

Operation | Array
1         | [2, 4, 3]
2         | [4, 3]
3         | [3, 4]
4         | [4]
5         | []
```

### Example 3

```text
Input: nums = [1,2,3]
Output: 3

Operation | Array
1         | [2, 3]
2         | [3]
3         | []
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- All values in `nums` are distinct.

## Hints

### Hint 1

Understand the order in which the indices are removed from the array.

### Hint 2

You do not really need to delete or move the elements, only the array length and positions matter.

### Hint 3

When an index is removed, decide how many moves it takes to reach the next removed index.

### Hint 4

Use a data structure such as a Fenwick tree to speed up the calculation.
