# Flip Game

## Description

You are playing a Flip Game with your friend.

You are given a string `currentState` that contains only '+' and '-'. You and
your friend take turns to flip two consecutive "++" into "--". The game ends
when a person can no longer make a move, and therefore the other person will
be the winner.

Return all possible states of the string `currentState` after one valid move.
For a deterministic answer, return the states in the order a left-to-right
scan of `currentState` meets the "++" pairs — the state made by flipping the
earlier pair comes first. If there is no valid move, return an empty list [].

### Example 1

```text
Input: currentState = "++++"
Output: ["--++","+--+","+--"]
```

### Example 2

```text
Input: currentState = "+"
Output: []
```

### Constraints

- `1 <= currentState.length <= 500`
- `currentState[i]` is either '+' or '-'.
