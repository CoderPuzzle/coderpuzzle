# Guess Number Higher or Lower

## Description

We are playing the Guess Game. The game is as follows:

I pick a number from `1` to `n`. You have to guess which number I picked
(the number I picked stays the same throughout the game).

Every time you guess wrong, I will tell you whether the number I picked
is higher or lower than your guess.

You call a pre-defined API `int guess(int num)`, which returns three
possible results:

- `-1`: Your guess is higher than the number I picked (i.e. `num > pick`).
- `1`: Your guess is lower than the number I picked (i.e. `num < pick`).
- `0`: your guess is equal to the number I picked (i.e. `num == pick`).

Return the number that I picked.

**Note (CoderPuzzle):** the signature is `guessNumber(guess, n)`; the API
arrives as the `Guess` object handed to your method — call
`guess.guess(num)` to query it.

### Example 1

```text
Input: n = 10, pick = 6
Output: 6
```

### Example 2

```text
Input: n = 1, pick = 1
Output: 1
```

### Example 3

```text
Input: n = 2, pick = 1
Output: 1
```

### Constraints

- `1 <= pick <= n <= 2³¹ - 1`
