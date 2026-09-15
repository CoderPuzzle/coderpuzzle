# Can I Win

## Description

In the "100 game" two players take turns adding, to a running total, any
integer from `1` to `10`. The player who first causes the running total to
reach or exceed `100` wins.

What if we change the game so that players cannot re-use integers?

For example, two players might take turns drawing from a common pool of
numbers from `1` to `15` without replacement until they reach a total
`>= 100`.

Given two integers `maxChoosableInteger` and `desiredTotal`, return `true`
if the first player to move can force a win, otherwise, return `false`.
Assume both players play optimally.

### Example 1

```text
Input: maxChoosableInteger = 10, desiredTotal = 11
Output: false
Explanation: No matter which integer the first player choose, the first
player will lose. The first player can choose an integer from 1 up to 10. If
the first player choose 1, the second player can only choose integers from 2
up to 10. The second player will win by choosing 10 and get a total = 11,
which is >= desiredTotal. Same with other integers chosen by the first
player, the second player will always win.
```

### Example 2

```text
Input: maxChoosableInteger = 10, desiredTotal = 0
Output: true
```

### Example 3

```text
Input: maxChoosableInteger = 10, desiredTotal = 1
Output: true
```

### Constraints

- `1 <= maxChoosableInteger <= 20`
- `0 <= desiredTotal <= 300`

## Hints

### Hint 1

If the sum of all choosable integers is less than desiredTotal, nobody can ever reach it: return false immediately.

### Hint 2

Treat desiredTotal <= 0 as an immediate win for the first player.

### Hint 3

Memoize on the bitmask of already-used integers; the remaining total is determined by the mask.

### Hint 4

A state is winning if some unused number either reaches the target or leaves the opponent in a losing state.
