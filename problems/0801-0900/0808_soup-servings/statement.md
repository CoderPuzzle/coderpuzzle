# Soup Servings

## Description

There are two soups, A and B, each starting with `n` mL. On every turn, one of
the following four serving operations is chosen at random, each with
probability 0.25, independent of all previous turns:

- Pour `100` mL from soup A and `0` mL from soup B.
- Pour `75` mL from soup A and `25` mL from soup B.
- Pour `50` mL from soup A and `50` mL from soup B.
- Pour `25` mL from soup A and `75` mL from soup B.

Note:

- There is no operation that pours `0` mL from A and `100` mL from B.
- The amounts from A and B are poured simultaneously during the turn.
- If an operation asks you to pour more than you have left of a soup, pour
  all that remains of that soup.

The process stops immediately after any turn in which one of the soups is used
up.

Return the probability that soup A is used up before soup B, plus half the
probability that both soups are used up in the same turn. Answers within
`10^-5` of the actual answer will be accepted.

### Example 1

```text
Input: n = 50
Output: 0.62500
Explanation: If we perform either of the first two serving operations, soup A
will become empty first. If we perform the third operation, A and B become
empty at the same time. If we perform the fourth operation, B becomes empty
first. So the total probability is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.
```

### Example 2

```text
Input: n = 100
Output: 0.71875
Explanation: Summing over the four operations, the total probability of A
becoming empty first plus half the probability of both becoming empty in the
same turn is 0.71875.
```

### Constraints

- `0 <= n <= 10^9`

## Hints

### Hint 1

Work in units of 25 mL so each soup's remaining amount is a small integer number of servings.

### Hint 2

Memoize on (servings of A left, servings of B left): each turn branches into the four operations.

### Hint 3

On average the four operations pour more from A than from B, so for large n the answer approaches 1 and can be returned as a constant.
