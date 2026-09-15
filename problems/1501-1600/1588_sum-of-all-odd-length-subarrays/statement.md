# Sum of All Odd Length Subarrays

## Description

Given an array of positive integers `arr`, return the sum of all possible
odd-length subarrays of `arr`.

A subarray is a contiguous subsequence of the array.

### Example 1

```text
Input: arr = [1,4,2,5,3]
Output: 58
Explanation: The odd-length subarrays of arr and their sums are:
[1] = 1
[4] = 4
[2] = 2
[5] = 5
[3] = 3
[1,4,2] = 7
[4,2,5] = 11
[2,5,3] = 10
[1,4,2,5,3] = 15
If we add all these together we get 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58.
```

### Example 2

```text
Input: arr = [1,2]
Output: 3
Explanation: There are only 2 subarrays of odd length, [1] and [2]. Their sum is 3.
```

### Example 3

```text
Input: arr = [10,11,12]
Output: 66
```

### Constraints

- `1 <= arr.length <= 100`
- `1 <= arr[i] <= 1000`

### Follow up

Could you solve this problem in `O(n)` time complexity?

## Hints

### Hint 1

A brute-force scan tries every `(start, end)` pair, keeps a running sum
between them, and adds it to the answer whenever the length is odd.

### Hint 2

Instead of summing subarrays directly, sum by contribution: how many
odd-length subarrays include `arr[i]`, for each index `i`? Once you know
that count, multiply it by `arr[i]` and add across all indices.
