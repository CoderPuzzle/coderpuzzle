# XOR After Range Multiplication Queries I

## Description

You are given an integer array `nums` of length `n` and a 2D integer array
`queries` of length `q`, where `queries[i] = [l, r, k, v]`.

For each query, you must apply the following steps in order:

- Set `idx = l`.
- While `idx <= r`: set `nums[idx] = (nums[idx] * v) % (10⁹ + 7)`, then set
  `idx += k`.

Return the bitwise XOR of all elements of `nums` after processing all the
queries.

### Example 1

```text
Input: nums = [1,1,1], queries = [[0,2,1,4]]
Output: 4
Explanation:
The single query multiplies every element from index 0 through index 2 by 4.
The array changes from [1, 1, 1] to [4, 4, 4], and the XOR of all elements
is 4 ^ 4 ^ 4 = 4.
```

### Example 2

```text
Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]
Output: 31
Explanation:
The first query multiplies the elements at indices 1 and 3 by 3, giving
[2, 9, 1, 15, 4]. The second multiplies the elements at indices 0, 1, and 2
by 2, giving [4, 18, 2, 15, 4]. The XOR of all elements is
4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.
```

### Constraints

- `1 <= n == nums.length <= 10³`
- `1 <= nums[i] <= 10⁹`
- `1 <= q == queries.length <= 10³`
- `queries[i] = [l, r, k, v]`
- `0 <= l <= r < n`
- `1 <= k <= n`
- `1 <= v <= 10⁵`

## Hints

### Hint 1

Apply every query with its loop exactly as the statement describes — with
`n` and `q` both at most one thousand, direct simulation is well within the
limits.
