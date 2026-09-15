# Balanced K-Factor Decomposition

## Description

You are given two integers `n` and `k`. Decompose `n` into exactly `k`
positive integers whose product equals `n`.

Among all such decompositions, return one where the difference between the
largest and the smallest of the `k` numbers is as small as possible.

For deterministic judging, report the `k` numbers in nondecreasing order, and
if several decompositions achieve the same minimal difference, report the
lexicographically smallest such sequence.

### Example 1

```text
Input: n = 100, k = 2
Output: [10,10]
Explanation: The decomposition [10,10] satisfies 10 * 10 = 100 and has a
difference of 10 - 10 = 0, which is minimal.
```

### Example 2

```text
Input: n = 44, k = 3
Output: [2,2,11]
Explanation:
[1,1,44] has a difference of 43.
[1,2,22] has a difference of 21.
[1,4,11] has a difference of 10.
[2,2,11] has a difference of 9, which is minimal.
```

### Constraints

- `4 <= n <= 10⁵`
- `2 <= k <= 5`
- `k` is strictly less than the number of positive divisors of `n`.

## Hints

### Hint 1

First, collect all positive divisors of `n` and sort them into a list
`divs`.

### Hint 2

Run a depth-first search that picks the next factor from `divs`, multiplies
it into a running product, and extends the current path until it holds `k`
factors whose product is `n`.

### Hint 3

During the search, keep track of the path that minimizes `max(path) -
min(path)` and return it.
