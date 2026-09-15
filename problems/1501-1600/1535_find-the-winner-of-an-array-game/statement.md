# Find the Winner of an Array Game

## Description

You are given an array `arr` of **distinct** integers and an integer `k`.

A game is played between the first two elements of the array, `arr[0]` and
`arr[1]`. In each round, `arr[0]` and `arr[1]` are compared: the larger value
wins and remains at position `0`, while the smaller value moves to the end
of the array. The game ends as soon as some value has won `k` consecutive
rounds.

Return the value that wins the game.

It is guaranteed that the game has a winner.

### Example 1

```text
Input: arr = [2,1,3,5,4,6,7], k = 2
Output: 5
Explanation: The rounds play out as follows:
  arr = [2,1,3,5,4,6,7], winner 2, streak 1
  arr = [2,3,5,4,6,7,1], winner 3, streak 1
  arr = [3,5,4,6,7,1,2], winner 5, streak 1
  arr = [5,4,6,7,1,2,3], winner 5, streak 2
After 4 rounds, 5 has won 2 consecutive rounds, so 5 is the winner.
```

### Example 2

```text
Input: arr = [3,2,1], k = 10
Output: 3
Explanation: 3 wins every one of the first 10 rounds, since it is the
largest value in the array.
```

### Constraints

- `2 <= arr.length <= 10⁵`
- `1 <= arr[i] <= 10⁶`
- `arr` contains distinct integers.
- `1 <= k <= 10⁹`

## Hints

### Hint 1

If `k` is at least `arr.length - 1`, the winner is always the maximum value
in the array — no simulation is needed.

### Hint 2

If `k` is smaller than `arr.length - 1`, you can still avoid simulating the
whole moving array: track only the current champion and how many rounds in
a row it has won.
