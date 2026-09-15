# Couples Holding Hands

## Description

There are `n` couples sitting in `2n` seats arranged in a row and want to hold hands.

The people and seats are represented by an integer array `row`, where `row[i]` is
the ID of the person sitting in the `i`th seat. The couples are numbered in order,
the first couple being `(0, 1)`, the second couple being `(2, 3)`, and so on with
the last couple being `(2n - 2, 2n - 1)`.

Return the minimum number of swaps so that every couple is sitting side by side.
A swap consists of choosing any two people, then they stand up and switch seats.

### Example 1

```text
Input: row = [0,2,1,3]
Output: 1
Explanation: We only need to swap the second (row[1]) and third (row[2]) person.
```

### Example 2

```text
Input: row = [3,2,0,1]
Output: 0
Explanation: All couples are already seated side by side.
```

### Constraints

- `2n == row.length`
- `2 <= n <= 30`
- `0 <= row[i] < 2n`
- All the elements of `row` are unique.

## Hints

### Hint 1

Treat the seats in pairs: seats `2i` and `2i + 1` form one couch, and the goal is for each couch to hold exactly one couple.

### Hint 2

For each couple, draw an edge from the couch of one partner to the couch of the other partner.

### Hint 3

The minimum number of swaps is `n` minus the number of connected components in this graph: a cycle of length `L` needs `L - 1` swaps.
