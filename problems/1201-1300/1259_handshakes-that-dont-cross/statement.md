# Handshakes That Don't Cross

## Description

You are given an even number of people `numPeople` that stand around a
circle and each person shakes hands with someone else, so that there are
`numPeople / 2` handshakes total.

Return the number of ways these handshakes could occur such that none of the
handshakes cross.

Since the answer could be very large, return it modulo `10^9 + 7`.

### Example 1

```text
Input: numPeople = 4
Output: 2
Explanation: There are two ways to do it, the first way is [(1,2),(3,4)] and
the second one is [(2,3),(4,1)].
```

![Four people around a table shown twice: way 1 pairs (1,2) and (3,4), way 2 pairs (2,3) and (4,1).](figures/example-1.svg)

### Example 2

```text
Input: numPeople = 6
Output: 5
```

![Six people on a line, with the five non-crossing pairings drawn as nested arcs above them.](figures/example-2.svg)

### Constraints

- `2 <= numPeople <= 1000`
- `numPeople` is even.

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Let dp[n] be the number of ways that n people can handshake.

### Hint 3

Then fix a person as a pivot and turn for every other person who will have a handshake, the answer is the sum of the products of the new two subproblems.
