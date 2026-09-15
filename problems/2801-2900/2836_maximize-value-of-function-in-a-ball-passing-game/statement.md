# Maximize Value of Function in a Ball Passing Game

## Description

You are given an integer array `receiver` of length `n` and an integer `k`.
`n` players are playing a ball-passing game.

You choose the starting player, `i`. The game proceeds as follows: player `i`
passes the ball to player `receiver[i]`, who then passes it to
`receiver[receiver[i]]`, and so on, for `k` passes in total. The game's score
is the sum of the indices of the players who touched the ball, including
repetitions, i.e. `i + receiver[i] + receiver[receiver[i]] + ... + receiver(k)[i]`.

Return the maximum possible score.

Notes:

- `receiver` may contain duplicates.
- `receiver[i]` may be equal to `i`.

### Example 1

```text
Input: receiver = [2,0,1], k = 4
Output: 6
Explanation: Starting with player i = 2 the initial score is 2.
Pass 1: player 2 passes to player 1, score becomes 3.
Pass 2: player 1 passes to player 0, score becomes 3.
Pass 3: player 0 passes to player 2, score becomes 5.
Pass 4: player 2 passes to player 1, score becomes 6.
```

### Example 2

```text
Input: receiver = [1,1,1,2,3], k = 3
Output: 10
Explanation: Starting with player i = 4 the initial score is 4.
Pass 1: player 4 passes to player 3, score becomes 7.
Pass 2: player 3 passes to player 2, score becomes 9.
Pass 3: player 2 passes to player 1, score becomes 10.
```

### Constraints

- `1 <= receiver.length == n <= 10^5`
- `0 <= receiver[i] <= n - 1`
- `1 <= k <= 10^10`

## Hints

### Hint 1

Solve the problem using binary lifting.

### Hint 2

For each player id x and every i, precompute last_receiver[x][i], the last receiver's id after 2^i passes, and sum[x][i], the sum of player ids who receive the ball during those 2^i passes.

### Hint 3

For each possible starting player, combine the precomputed jumps according to the binary representation of k to compute the total score.

### Hint 4

The answer is the maximum score over all starting players.
