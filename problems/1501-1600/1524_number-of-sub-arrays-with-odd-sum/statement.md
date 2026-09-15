# Number of Sub-arrays With Odd Sum

## Description

Given an array of integers `arr`, return the number of subarrays with an
odd sum. Since the answer may be too large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [1],[1,3],[1,3,5],[3],[3,5],[5].
Their sums are [1,4,9,3,8,5]. The odd sums are [1,9,3,5], so the answer
is 4.
```

### Example 2

```text
Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [2],[2,4],[2,4,6],[4],[4,6],[6]. Every
sum is even, so the answer is 0.
```

### Example 3

```text
Input: arr = [1,2,3,4,5,6,7]
Output: 16
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `1 <= arr[i] <= 100`

## Hints

### Hint 1

Can you use the running prefix sum to keep track of all the odd-sum
subarrays?

### Hint 2

If the current prefix sum is odd, you only care about how many previous
prefix sums were even, and vice versa.
