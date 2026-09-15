# Count Ways to Choose Coprime Integers from Rows

## Description

You are given an `m x n` matrix `mat` of positive integers.

A selection picks exactly one integer from every row of `mat`. A selection
is coprime when the greatest common divisor (gcd) of its picked integers is

1. Selections are positional: picking equal integers from different columns
   of the same row counts as different selections.

Return the number of coprime selections modulo `10⁹ + 7`.

### Example 1

```text
Input: mat = [[1,2],[3,4]]
Output: 3
Explanation: The four possible selections have gcds gcd(1,3) = 1,
gcd(1,4) = 1, gcd(2,3) = 1, and gcd(2,4) = 2. Three selections are coprime,
so the answer is 3.
```

### Example 2

```text
Input: mat = [[2,2],[2,2]]
Output: 0
Explanation: Every selection consists of two even integers, so every gcd is
at least 2 and no selection is coprime.
```

### Constraints

- `1 <= m == mat.length <= 150`
- `1 <= n == mat[i].length <= 150`
- `1 <= mat[i][j] <= 150`

## Hints

### Hint 1

Use dynamic programming over gcd profiles: keep one entry per gcd value a
partial selection can reach.

### Hint 2

Let dp[g] be the number of ways to pick one integer from each row processed
so far such that the overall gcd of the picks is g.

### Hint 3

Initialize from the first row: for each value v in row 0 do dp[v] += 1.

### Hint 4

For each later row, build the next profile: for every reachable gcd g and
every value v in the row, add dp[g] to next[gcd(g, v)].

### Hint 5

The answer is dp[1], the number of selections whose overall gcd is 1.
