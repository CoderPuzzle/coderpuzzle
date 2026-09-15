# Stone Game IV

## Description

Alice and Bob take turns playing a game, with Alice starting first.

Initially, there are `n` stones in a pile. On each player's turn, that
player makes a move consisting of removing any non-zero square number of
stones from the pile.

Also, if a player cannot make a move, they lose the game.

Given a positive integer `n`, return `true` if and only if Alice wins the
game, otherwise return `false`, assuming both players play optimally.

### Example 1

```text
Input: n = 1
Output: true
Explanation: Alice can remove 1 stone, winning the game because Bob doesn't
have any moves.
```

### Example 2

```text
Input: n = 2
Output: false
Explanation: Alice can only remove 1 stone, after that Bob removes the last
one, winning the game (2 -> 1 -> 0).
```

### Example 3

```text
Input: n = 4
Output: true
Explanation: n is already a perfect square, Alice can win with one move,
removing 4 stones (4 -> 0).
```

### Constraints

- `1 <= n <= 10⁵`

## Hints

### Hint 1

Use dynamic programming to keep track of winning and losing states. Given
some number of stones, Alice can win if she can force Bob onto a losing
state.
