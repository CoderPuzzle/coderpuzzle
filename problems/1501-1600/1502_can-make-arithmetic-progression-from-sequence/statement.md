# Can Make Arithmetic Progression From Sequence

## Description

A sequence of numbers is called an **arithmetic progression** if the
difference between any two consecutive elements is the same.

Given an array of numbers `arr`, return `true` if `arr` can be rearranged
to form an arithmetic progression. Otherwise, return `false`.

### Example 1

```text
Input: arr = [3,5,1]
Output: true
Explanation: We can reorder the elements as [1,3,5] or [5,3,1], with
differences 2 and -2 respectively, between each pair of consecutive
elements.
```

### Example 2

```text
Input: arr = [1,2,4]
Output: false
Explanation: There is no way to reorder the elements to obtain an
arithmetic progression.
```

### Constraints

- `2 <= arr.length <= 1000`
- `-10⁶ <= arr[i] <= 10⁶`

## Hints

### Hint 1

Consider that any valid arithmetic progression will be in sorted order.

### Hint 2

Sort the array, then check if the differences of all consecutive elements
are equal.
