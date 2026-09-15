# K-th Smallest Prime Fraction

## Description

You are given a sorted integer array `arr` containing `1` and prime numbers, where
all the integers of `arr` are unique. You are also given an integer `k`.

For every `i` and `j` where `0 <= i < j < arr.length`, we consider the fraction
`arr[i] / arr[j]`.

Return the `k`th smallest fraction considered. Return your answer as an array of
integers of size `2`, where `answer[0] == arr[i]` and `answer[1] == arr[j]`.

### Example 1

```text
Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
The third fraction is 2/5.
```

### Example 2

```text
Input: arr = [1,7], k = 1
Output: [1,7]
```

### Constraints

- `2 <= arr.length <= 1000`
- `1 <= arr[i] <= 3 * 10⁴`
- `arr[0] == 1`
- `arr[i]` is a prime number for `i > 0`.
- All the numbers of `arr` are unique and sorted in strictly increasing order.
- `1 <= k <= arr.length * (arr.length - 1) / 2`

### Follow-up

Can you solve the problem with better than `O(n²)` complexity?

## Hints

### Hint 1

Binary search the value `x` of the `k`th smallest fraction, counting how many fractions are at most `x`.

### Hint 2

For a fixed `x`, use two pointers to count the fractions `arr[i] / arr[j] <= x` in `O(n)` time, and track the largest such fraction as a candidate answer.

### Hint 3

The count is monotone in `x`, so a binary search over the interval `(0, 1)` converges to the exact fraction.
