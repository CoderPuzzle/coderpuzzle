# Stone Game VI

## Description

Alice and Bob take turns playing a game, with **Alice starting first**.

There are `n` stones in a pile. On each player's turn, they remove a stone
from the pile and receive points based on the stone's value. Alice and Bob
may value the stones differently.

You are given two integer arrays `aliceValues` and `bobValues`, each of
length `n`, where `aliceValues[i]` is how Alice values the `i`th stone and
`bobValues[i]` is how Bob values it.

The winner is the person with the most points after all the stones have been
chosen. If both players end with the same number of points, the game is a
draw. Both players play optimally and know each other's values.

Determine the result of the game:

- If Alice wins, return `1`.
- If Bob wins, return `-1`.
- If the game results in a draw, return `0`.

### Example 1

```text
Input: aliceValues = [1,3], bobValues = [2,1]
Output: 1
Explanation: If Alice takes stone 1 (0-indexed) first, Alice will receive 3 points. Bob can only choose stone 0, and will only receive 2 points. Alice wins.
```

### Example 2

```text
Input: aliceValues = [1,2], bobValues = [3,1]
Output: 0
Explanation: If Alice takes stone 0, and Bob takes stone 1, they will both have 1 point. Draw.
```

### Example 3

```text
Input: aliceValues = [2,4,3], bobValues = [1,6,7]
Output: -1
Explanation: Regardless of how Alice plays, Bob will be able to have more points than Alice. For example, if Alice takes stone 1, Bob can take stone 2, and Alice takes stone 0, Alice will have 6 points to Bob's 7. Bob wins.
```

### Constraints

- `n == aliceValues.length == bobValues.length`
- `1 <= n <= 10⁵`
- `1 <= aliceValues[i], bobValues[i] <= 100`

## Hints

### Hint 1

When a player takes a stone, they gain its value for themselves — but they
also deny that stone to the opponent. The benefit of taking stone `i` is
therefore bigger than either player's individual value for it.

### Hint 2

Consider two adjacent stones in the picking order. Compare the outcome of
taking one before the other for the player to move; the comparison depends
only on the sum `aliceValues[i] + bobValues[i]`, which suggests an exchange
argument on that sum.

### Hint 3

Sort the stones by `aliceValues[i] + bobValues[i]` in descending order and
let the players alternate picks along that order. Only the sign of the final
score difference matters, and every total stays small — at most
`100 * 10⁵` points — so plain integers suffice for the arithmetic.
