# Good Subsequence Queries

## Description

You are given an integer array `nums` of length `n` and an integer `p`.

A non-empty subsequence of `nums` is called good if:

- Its length is strictly less than `n`.
- The greatest common divisor (GCD) of its elements is exactly `p`.

You are also given a 2D integer array `queries` of length `q`, where each
`queries[i] = [indi, vali]` indicates that you should update `nums[indi]` to
`vali`.

After each query, determine whether there exists any good subsequence in the
current array.

Return the number of queries for which a good subsequence exists.
The term `gcd(a, b)` denotes the greatest common divisor of `a` and `b`.

### Example 1

```text
Input: nums = [4,8,12,16], p = 2, queries = [[0,3],[2,6]]
Output: 1
Explanation:
i | [indi, vali] | Operation | Updated nums | Any good Subsequence
0 | [0, 3] | Update nums[0] to 3 | [3, 8, 12, 16] | No, as no subsequence
has GCD exactly p = 2
1 | [2, 6] | Update nums[2] to 6 | [3, 8, 6, 16] | Yes, subsequence [8, 6]
has GCD exactly p = 2
Thus, the answer is 1.
```

### Example 2

```text
Input: nums = [4,5,7,8], p = 3, queries = [[0,6],[1,9],[2,3]]
Output: 2
Explanation:
i | [indi, vali] | Operation | Updated nums | Any good Subsequence
0 | [0, 6] | Update nums[0] to 6 | [6, 5, 7, 8] | No, as no subsequence has
GCD exactly p = 3
1 | [1, 9] | Update nums[1] to 9 | [6, 9, 7, 8] | Yes, subsequence [6, 9]
has GCD exactly p = 3
2 | [2, 3] | Update nums[2] to 3 | [6, 9, 3, 8] | Yes, subsequence
[6, 9, 3] has GCD exactly p = 3
Thus, the answer is 2.
```

### Example 3

```text
Input: nums = [5,7,9], p = 2, queries = [[1,4],[2,8]]
Output: 0
Explanation:
i | [indi, vali] | Operation | Updated nums | Any good Subsequence
0 | [1, 4] | Update nums[1] to 4 | [5, 4, 9] | No, as no subsequence has
GCD exactly p = 2
1 | [2, 8] | Update nums[2] to 8 | [5, 4, 8] | No, as no subsequence has
GCD exactly p = 2
Thus, the answer is 0.
```

### Constraints

- `2 <= n == nums.length <= 5 * 10⁴`
- `1 <= nums[i] <= 5 * 10⁴`
- `1 <= queries.length <= 5 * 10⁴`
- `queries[i] = [indi, vali]`
- `1 <= vali, p <= 5 * 10⁴`
- `0 <= indi <= n - 1`

## Hints

### Hint 1

Reduce the problem to only elements divisible by p. Scale them down by /p and
reason about primes on the reduced array.

### Hint 2

A subsequence has GCD = p exactly when, after division, the chosen elements do
not all share any common prime factor.

### Hint 3

Track, for each prime factor, how many active indices contain it. If any prime
covers all active elements, the answer is false.

### Hint 4

Check that there is an index whose prime factors do not cover all active
elements (so a subsequence of length n can have GCD = p).
