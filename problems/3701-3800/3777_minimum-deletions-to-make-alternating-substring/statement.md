# Minimum Deletions to Make Alternating Substring

## Description

You are given a string s of length n consisting only of the characters 'A'
and 'B'.

You are also given a 2D integer array queries of length q, where each
queries[i] is one of the following:

- [1, j]: Flip the character at index j of s i.e. 'A' changes to 'B' (and
  vice versa). This operation mutates s and affects subsequent queries.
- [2, l, r]: Compute the minimum number of character deletions required to
  make the substring s[l..r] alternating. This operation does not modify s;
  the length of s remains n.

A substring is alternating if no two adjacent characters are equal. A
substring of length 1 is always alternating.

Return an integer array answer, where answer[i] is the result of the ith
query of type [2, l, r].

### Example 1

```text
Input: s = "ABA", queries = [[2,1,2],[1,1],[2,0,2]]
Output: [0,2]
Explanation:
Query i = 0, [2, 1, 2]: s before query is "ABA", s[l..r] = "BA" (l = 1,
r = 2) — already alternating, so the result is 0.
Query i = 1, [1, 1]: flip s[1] from 'B' to 'A'; s becomes "AAA".
Query i = 2, [2, 0, 2]: s before query is "AAA", s[l..r] = "AAA" — delete
any two 'A's to get "A", so the result is 2.
Thus, the answer is [0, 2].
```

### Example 2

```text
Input: s = "ABB", queries = [[2,0,2],[1,2],[2,0,2]]
Output: [1,0]
Explanation:
Query i = 0, [2, 0, 2]: s before query is "ABB", s[l..r] = "ABB" — delete
one 'B' to get "AB", so the result is 1.
Query i = 1, [1, 2]: flip s[2] from 'B' to 'A'; s becomes "ABA".
Query i = 2, [2, 0, 2]: s before query is "ABA", s[l..r] = "ABA" — already
alternating, so the result is 0.
Thus, the answer is [1, 0].
```

### Example 3

```text
Input: s = "BABA", queries = [[2,0,3],[1,1],[2,1,3]]
Output: [0,1]
Explanation:
Query i = 0, [2, 0, 3]: s before query is "BABA", s[l..r] = "BABA" —
already alternating, so the result is 0.
Query i = 1, [1, 1]: flip s[1] from 'A' to 'B'; s becomes "BBBA".
Query i = 2, [2, 1, 3]: s before query is "BBBA", s[l..r] = "BBA" (l = 1,
r = 3) — delete one 'B' to get "BA", so the result is 1.
Thus, the answer is [0, 1].
```

### Constraints

- `1 <= n == s.length <= 10⁵`
- `s[i]` is either `'A'` or `'B'`.
- `1 <= q == queries.length <= 10⁵`
- `queries[i].length == 2 or 3`
- `queries[i] == [1, j]` or, `queries[i] == [2, l, r]`
- `0 <= j <= n - 1`
- `0 <= l <= r <= n - 1`

## Hints

### Hint 1

Use a Fenwick tree (BIT) over an auxiliary array eq.

### Hint 2

Define eq[i] = 1 if i >= 1 and s[i] == s[i - 1], otherwise eq[i] = 0.

### Hint 3

For a type-2 query [2, l, r] the answer is sum(eq[l+1..r]) (count of equal
adjacent pairs in the substring).

### Hint 4

For a flip [1, j], recompute and update eq[j] and eq[j + 1]; each flip
changes at most two eq values.
