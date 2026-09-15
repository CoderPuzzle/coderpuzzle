# Maximize the Minimum Game Score

## Description

You are given an array `points` of size `n` and an integer `m`. There is another
array `gameScore` of size `n`, where `gameScore[i]` represents the score
achieved at the `i`-th game. Initially, `gameScore[i] == 0` for all `i`.

You start at index `-1`, which is outside the array (before the first position
at index 0). You can make at most `m` moves. In each move, you can either:

- Increase the index by 1 and add `points[i]` to `gameScore[i]`.
- Decrease the index by 1 and add `points[i]` to `gameScore[i]`.

Note that the index must always remain within the bounds of the array after
the first move.

Return the maximum possible minimum value in `gameScore` after at most `m`
moves.

### Example 1

```text
Input: points = [2,4], m = 3
Output: 4
Explanation: Starting at index -1 with gameScore = [0, 0], move to index 0 giving [2, 0], then index 1 giving [2, 4], then back to index 0 giving [4, 4]. The minimum value in gameScore is 4.
```

### Example 2

```text
Input: points = [1,2,3], m = 5
Output: 2
Explanation: One valid walk visits indices 0, 1, 0, 1, 2 producing gameScore = [2, 4, 3]. The minimum value is 2.
```

### Constraints

- `2 <= n == points.length <= 5 * 10^4`
- `1 <= points[i] <= 10^6`
- `1 <= m <= 10^9`

## Hints

### Hint 1

Can we use binary search?

### Hint 2

What happens if you fix the game score as x?

### Hint 3

We should go from i to (i + 1) back and forth, making the value for each index i (from left to right) no less than x.
