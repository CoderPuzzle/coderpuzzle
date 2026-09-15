# Stone Game II

## Description

Alice and Bob continue their games with piles of stones. There are a number
of piles arranged in a row, and each pile has a positive integer number of
stones `piles[i]`. The objective of the game is to end with the most stones.

Alice and Bob take turns, with **Alice starting first**.

On each player's turn, that player can take all the stones in the first `X`
remaining piles, where `1 <= X <= 2M`. Then, we set `M = max(M, X)`.
Initially, `M = 1`.

The game continues until all the stones have been taken.

Assuming Alice and Bob play **optimally**, return the maximum number of
stones Alice can get.

### Example 1

```text
Input: piles = [2,7,9,4,4]
Output: 10
Explanation: Alice can get 2 + 4 + 4 = 10 stones in total by taking one pile first, letting Bob take two piles, then taking the last two piles. If Alice takes two piles at the start instead, Bob can take all three remaining piles and Alice ends with 2 + 7 = 9.
```

### Example 2

```text
Input: piles = [1,2,3,4,5,100]
Output: 104
Explanation: Alice takes 1 pile (1 stone), Bob takes 1 pile (2 stones), Alice takes 1 pile (3 stones), Bob takes 2 piles (4 + 5 = 9 stones), then Alice takes the last pile (100 stones). Alice gets 1 + 3 + 100 = 104 in total.
```

### Constraints

- `1 <= piles.length <= 100`
- `1 <= piles[i] <= 10⁴`

## Hints

### Hint 1

Think backwards from the end of the row. A suffix-sum array tells you how
many stones piles[i:] still hold, which is the total the current player and
the opponent will split from that point on.

### Hint 2

Let dp(i, m) be the most stones the player to move can collect from
piles[i:] while the current value is m. Taking the first x piles
(1 <= x <= 2m) hands the opponent the state (i + x, max(m, x)); since both
players together collect the whole suffix, your total is the suffix sum
minus whatever dp(i + x, max(m, x)) says the opponent gets.

### Hint 3

At most 100 piles of at most 10⁴ stones exist, so every stone count fits in
a 32-bit integer, and m never needs to grow beyond the number of remaining
piles — once 2m covers the rest of the row, the current player simply takes
everything.
