# Reveal Cards In Increasing Order

## Description

You are given an integer array `deck`. Every card in a deck of cards carries
a unique integer, and the integer on the `i`-th card is `deck[i]`.

You may order the deck in any order you want. Initially all the cards start
face down (unrevealed) in one deck.

You repeat the following steps until all cards are revealed:

1. Take the top card of the deck, reveal it, and take it out of the deck.
2. If there are still cards in the deck, put the next top card of the deck
   at the bottom of the deck.
3. If there are still unrevealed cards, go back to step 1. Otherwise, stop.

Return an ordering of the deck that would reveal the cards in increasing
order (the first entry of the answer is considered to be the top of the
deck).

Because every card value is unique, exactly one such ordering exists, and it
is found by playing the procedure backwards. Sort the cards in increasing
order, then take them from the largest down to the smallest; before each
card is placed on top of the ordering built so far, the card currently at
the bottom of that ordering moves to the top.

### Example 1

```text
Input: deck = [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
Explanation: 2 is the top of the deck. We reveal 2 and move 13 to the
bottom, reveal 3 and move 11 to the bottom, and so on; the cards come out
2, 3, 5, 7, 11, 13, 17, in increasing order.
```

### Example 2

```text
Input: deck = [1,1000]
Output: [1,1000]
Explanation: We reveal 1, then 1000 — already increasing.
```

### Constraints

- `1 <= deck.length <= 1000`
- `1 <= deck[i] <= 10⁶`
- All the values of `deck` are unique.
