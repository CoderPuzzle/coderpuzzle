# X of a Kind in a Deck of Cards

## Description

You are given an integer array `deck` where `deck[i]` is the number written on
the `i`-th card.

Partition the cards into one or more groups such that:

- Each group has exactly `x` cards, where `x > 1`.
- All the cards in one group have the same number written on them.

Every card belongs to exactly one group. Return `true` if such a partition is
possible, or `false` otherwise.

### Example 1

```text
Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: A possible partition is [1,1],[2,2],[3,3],[4,4].
```

### Example 2

```text
Input: deck = [1,1,1,2,2,2,3,3]
Output: false
Explanation: No such partition of these cards is possible.
```

### Constraints

- `1 <= deck.length <= 10⁴`
- `0 <= deck[i] < 10⁴`
