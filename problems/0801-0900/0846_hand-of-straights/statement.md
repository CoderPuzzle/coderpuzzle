# Hand of Straights

## Description

Alice has some number of cards and she wants to rearrange the cards into
groups so that each group is of size `groupSize`, and consists of `groupSize`
consecutive cards.

Given an integer array `hand` where `hand[i]` is the value written on the
`i`th card and an integer `groupSize`, return `true` if she can rearrange the
cards, or `false` otherwise.

### Example 1

```text
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8].
```

### Example 2

```text
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.
```

### Constraints

- `1 <= hand.length <= 10^4`
- `0 <= hand[i] <= 10^9`
- `1 <= groupSize <= hand.length`

Note: This question is the same as 1296: Divide Array in Sets of K Consecutive
Numbers.

## Hints

### Hint 1

If hand.length is not divisible by groupSize, no arrangement can work.

### Hint 2

Count occurrences of each card value, then greedily build groups starting from the smallest remaining card.

### Hint 3

The smallest remaining card must start a group; it needs one card of each of the next groupSize - 1 consecutive values.
