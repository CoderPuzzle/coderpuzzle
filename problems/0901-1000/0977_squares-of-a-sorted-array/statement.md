# Squares of a Sorted Array

## Description

Given an integer array `nums` sorted in non-decreasing order, return an array
of the squares of each number, sorted in non-decreasing order.

Squaring never changes a value's magnitude, but it folds the number line at
zero: the most negative input values produce some of the largest squares, so
the output order is not the input order whenever negatives are present.

### Example 1

```text
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100]. After sorting,
it becomes [0,1,9,16,100].
```

### Example 2

```text
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`
- `nums` is sorted in non-decreasing order.

### Follow-up

Squaring each element and sorting the new array is very trivial. Could you
find an `O(n)` solution using a different approach?
