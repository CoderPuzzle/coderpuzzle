# 3Sum With Multiplicity

## Description

Given an integer array `arr` and an integer `target`, return the number of
tuples `(i, j, k)` such that `i < j < k` and
`arr[i] + arr[j] + arr[k] == target`.

As the answer can be very large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
Explanation: Enumerating by the values (arr[i], arr[j], arr[k]): (1,2,5)
occurs 8 times; (1,3,4) occurs 8 times; (2,2,4) occurs 2 times; and
(2,3,3) occurs 2 times.
```

### Example 2

```text
Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
Explanation: tuples with arr[i] = 1 and arr[j] = arr[k] = 2 occur 12 times:
one 1 is chosen from the two 1s in 2 ways, and two 2s from the four 2s in
6 ways, giving 2 * 6 = 12.
```

### Example 3

```text
Input: arr = [2,1,3], target = 6
Output: 1
Explanation: (1,2,3) occurs exactly once, so the answer is 1.
```

### Constraints

- `3 <= arr.length <= 3000`
- `0 <= arr[i] <= 100`
- `0 <= target <= 300`
