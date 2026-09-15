# Maximum Number of Coins You Can Get

## Description

There are `3n` piles of coins of varying sizes. You, Alice, and Bob will
take piles of coins as follows:

- In each step, you choose any 3 piles of coins (not necessarily
  consecutive).
- Of your choice, Alice picks the pile with the maximum number of coins.
- You pick the next pile with the maximum number of coins.
- Bob picks the last (smallest) pile.
- Repeat until there are no more piles of coins.

Given an array of integers `piles` where `piles[i]` is the number of coins
in the `i`th pile, return the maximum number of coins that you can end up
with.

### Example 1

```text
Input: piles = [2,4,1,2,7,8]
Output: 9
Explanation: Choose the triplet (2, 7, 8): Alice picks the pile with 8
coins, you pick the pile with 7 coins, and Bob picks the last one. Choose
the triplet (1, 2, 4): Alice picks the pile with 4 coins, you pick the
pile with 2 coins, and Bob picks the last one. The maximum number of coins
which you can have is 7 + 2 = 9. If you instead grouped them as (1, 2, 8)
and (2, 4, 7), you would only get 2 + 4 = 6 coins, which is not optimal.
```

### Example 2

```text
Input: piles = [2,4,5]
Output: 4
```

### Example 3

```text
Input: piles = [9,8,7,6,5,1,2,3,4]
Output: 18
```

### Constraints

- `3 <= piles.length <= 10⁵`
- `piles.length % 3 == 0`
- `1 <= piles[i] <= 10⁴`

## Hints

### Hint 1

Which pile of coins will you never be able to pick up?

### Hint 2

Bob is forced to take the last pile of coins, no matter what it is. Which
pile should you give to him?
