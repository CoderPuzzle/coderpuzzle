# Toss Strange Coins

## Description

You have some coins. The `i`-th coin has a probability `prob[i]` of facing
heads when tossed.

Return the probability that the number of coins facing heads equals `target`
if you toss every coin exactly once.

### Example 1

```text
Input: prob = [0.4], target = 1
Output: 0.40000
```

### Example 2

```text
Input: prob = [0.5,0.5,0.5,0.5,0.5], target = 0
Output: 0.03125
```

### Constraints

- `1 <= prob.length <= 1000`
- `0 <= prob[i] <= 1`
- `0 <= target <= prob.length`
- Answers will be accepted as correct if they are within `10^-5` of the
  correct answer.

## Hints

### Hint 1

Solve the problem with dynamic programming.

### Hint 2

Use the states dp[pos][cnt], where pos is the pos-th coin and cnt is the number of heads seen so far.

### Hint 3

The transition multiplies by prob[pos] for heads and by 1 - prob[pos] for tails.

### Hint 4

Base case: when pos == n, the state counts only if cnt == target.
