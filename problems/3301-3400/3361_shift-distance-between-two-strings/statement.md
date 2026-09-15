# Shift Distance Between Two Strings

## Description

You are given two strings `s` and `t` of the same length, and two integer
arrays `nextCost` and `previousCost`.

In one operation, you can pick any index `i` of `s`, and perform either
one of the following actions:

Shift `s[i]` to the next letter in the alphabet. If `s[i] == 'z'`, you
should replace it with `'a'`. This operation costs `nextCost[j]` where
`j` is the index of `s[i]` in the alphabet.
Shift `s[i]` to the previous letter in the alphabet. If `s[i] == 'a'`,
you should replace it with `'z'`. This operation costs `previousCost[j]`
where `j` is the index of `s[i]` in the alphabet.

The shift distance is the minimum total cost of operations required to
transform `s` into `t`.

Return the shift distance from `s` to `t`.

### Example 1

```text
Input: s = "abab", t = "baba", nextCost =
[100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
previousCost =
[1,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: 2
Explanation:
We choose index i = 0 and shift s[0] 25 times to the previous character
for a total cost of 1.
We choose index i = 1 and shift s[1] 25 times to the next character for
a total cost of 0.
We choose index i = 2 and shift s[2] 25 times to the previous character
for a total cost of 1.
We choose index i = 3 and shift s[3] 25 times to the next character for
a total cost of 0.
```

### Example 2

```text
Input: s = "leet", t = "code", nextCost =
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
previousCost =
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
Output: 31
Explanation:
We choose index i = 0 and shift s[0] 9 times to the previous character
for a total cost of 9.
We choose index i = 1 and shift s[1] 10 times to the next character for
a total cost of 10.
We choose index i = 2 and shift s[2] 1 time to the previous character
for a total cost of 1.
We choose index i = 3 and shift s[3] 11 times to the next character for
a total cost of 11.
```

### Constraints

- `1 <= s.length == t.length <= 10⁵`
- `s` and `t` consist only of lowercase English letters.
- `nextCost.length == previousCost.length == 26`
- `0 <= nextCost[i], previousCost[i] <= 10⁹`

## Hints

### Hint 1

For every unordered pair of characters (a, b), the cost of turning a
into b is equal to the minimum between:

If i < j, nextCost[i] + nextCost[i + 1] + … + nextCost[j - 1], and
nextCost[i] + nextCost[i + 1] + … + nextCost[25] + nextCost[0] + … +
nextCost[j - 1] otherwise.

If i < j, prevCost[i] + prevCost[i - 1] + … + prevCost[0] + prevCost[25]

- … + prevCost[j + 1], and prevCost[i] + prevCost[i - 1] + … +
  prevCost[j + 1] otherwise.

Where i and j are the indices of a and b in the alphabet.

### Hint 2

The shift distance is the sum of costs of turning s[i] into t[i].
