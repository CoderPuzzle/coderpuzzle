# Sum of Mutated Array Closest to Target

## Description

Given an integer array `arr` and a target value `target`, return the integer
`value` such that when we change all the integers larger than `value` in the
given array to be equal to `value`, the sum of the array gets as close as
possible (in absolute difference) to `target`.

In case of a tie, return the minimum such integer.

Notice that the answer is not necessarily a number from `arr`.

### Example 1

```text
Input: arr = [4,9,3], target = 10
Output: 3
Explanation: When using 3 arr converts to [3, 3, 3] which sums 9 and that's the optimal answer.
```

### Example 2

```text
Input: arr = [2,3,5], target = 10
Output: 5
```

### Example 3

```text
Input: arr = [60864,25176,27249,21296,20204], target = 56803
Output: 11361
```

### Constraints

- `1 <= arr.length <= 10⁴`
- `1 <= arr[i], target <= 10⁵`

## Hints

### Hint 1

If you draw a graph with the value on one axis and the absolute difference between the target and the array sum on the other, what will you get?

### Hint 2

That graph is uni-modal.

### Hint 3

Use ternary search on that graph to find the best value.
