# Two-Letter Card Game

## Description

You are given a deck of cards — an array `cards` where each card displays two
lowercase letters — and a letter `x`.

You play a game that starts with a score of 0. On every turn you must find
two compatible cards that both contain the letter `x` in any position,
remove that pair from the deck, and earn 1 point. The game ends when you can
no longer find such a pair.

Two cards are compatible when their strings differ in exactly one position.

Return the maximum number of points you can earn with optimal play.

### Example 1

```text
Input: cards = ["aa","ab","ba","ac"], x = "a"
Output: 2
Explanation: First select and remove "ab" and "ac", which differ only at
index 1. Then select and remove "aa" and "ba", which differ only at
index 0. No compatible pair remains, so the score is 2.
```

### Example 2

```text
Input: cards = ["aa","ab","ba"], x = "a"
Output: 1
Explanation: Remove "aa" and "ba". The leftover "ab" has no compatible
partner, so the score is 1.
```

### Example 3

```text
Input: cards = ["aa","ab","ba","ac"], x = "b"
Output: 0
Explanation: Only "ab" and "ba" contain 'b', but those two differ in both
positions, so no turn can ever be played.
```

### Constraints

- `2 <= cards.length <= 10⁵`
- `cards[i].length == 2`
- Each `cards[i]` consists of lowercase English letters from `'a'` to `'j'`.
- `x` is a lowercase English letter from `'a'` to `'j'`.

## Hints

### Hint 1

Only cards containing `x` can ever play; the rest are dead weight. Count the
playable ones into three shapes: cards with `x` in both positions, cards
with `x` only in the first position (grouped by the other letter), and cards
with `x` only in the second position.

### Hint 2

Within one side, two one-sided cards pair exactly when their non-`x` letters
differ, a both-position card pairs with any one-sided card, and two
both-position cards never pair. So for counts `cnt` plus some number of
double-`x` helpers, the best pairing is decided by sorting `cnt`, computing
the total, and comparing it against the largest count.

### Hint 3

Each double-`x` card is spent on one side or the other. Return the maximum
over `i = 0..both` of the first side solved with `i` helpers plus the second
side solved with `both - i`.
