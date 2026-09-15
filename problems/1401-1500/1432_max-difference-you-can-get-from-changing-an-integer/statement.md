# Max Difference You Can Get From Changing an Integer

## Description

You are given an integer `num`. You will apply the following steps to
`num` two separate times:

- Pick a digit `x` (`0 <= x <= 9`).
- Pick another digit `y` (`0 <= y <= 9`). Note `y` can be equal to `x`.
- Replace all the occurrences of `x` in the decimal representation of
  `num` by `y`.

Let `a` and `b` be the two results from applying the operation to `num`
independently.

Return the max difference between `a` and `b`.

Note that neither `a` nor `b` may have any leading zeros, and must not be 0.

### Example 1

```text
Input: num = 555
Output: 888
Explanation: The first time pick x = 5 and y = 9 and store the new
integer in a. The second time pick x = 5 and y = 1 and store the new
integer in b. We have now a = 999 and b = 111 and max difference = 888
```

### Example 2

```text
Input: num = 9
Output: 8
Explanation: The first time pick x = 9 and y = 9 and store the new
integer in a. The second time pick x = 9 and y = 1 and store the new
integer in b. We have now a = 9 and b = 1 and max difference = 8
```

### Constraints

- `1 <= num <= 10⁸`

## Hints

### Hint 1

We need to get the max and min value after changing num and the answer is
max - min.

### Hint 2

Use brute force, try all possible changes and keep the minimum and
maximum values.
