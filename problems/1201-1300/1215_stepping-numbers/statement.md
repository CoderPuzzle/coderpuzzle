# Stepping Numbers

## Description

A stepping number is an integer such that all of its adjacent digits have an
absolute difference of **exactly 1**.

- For example, `321` is a stepping number while `421` is not.

Given two integers `low` and `high`, return a sorted list of all the stepping
numbers in the **inclusive** range `[low, high]`.

### Example 1

```text
Input: low = 0, high = 21
Output: [0,1,2,3,4,5,6,7,8,9,10,12,21]
```

### Example 2

```text
Input: low = 10, high = 15
Output: [10,12]
```

### Constraints

- `0 <= low <= high <= 2 * 10⁹`

## Hints

### Hint 1

Try to generate the numbers using recursion.

### Hint 2

In one step in the recursion, add a valid digit to the right of the current
number.

### Hint 3

Save the number if it's in the range between `low` and `high`.
