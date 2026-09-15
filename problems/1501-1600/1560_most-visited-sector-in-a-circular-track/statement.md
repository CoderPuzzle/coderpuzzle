# Most Visited Sector in a Circular Track

## Description

You are given an integer `n` and an integer array `rounds`. A circular track
has `n` sectors labeled `1` to `n` in order. A marathon on this track
consists of `m` laps, where `m = rounds.length - 1`: lap `i` starts at
sector `rounds[i - 1]` and ends at sector `rounds[i]`.

You always circulate the track in ascending order of sector number, wrapping
from sector `n` back to sector `1`. Every sector you pass through during a
lap counts as a visit, including the sector where the lap starts and the
sector where it ends.

Return the sectors that were visited the most times, sorted in ascending
order.

### Example 1

![diagram](figures/1560-1.svg)

```text
Input: n = 4, rounds = [1,3,1,2]
Output: [1,2]
Explanation: The marathon starts at sector 1. The order of visited sectors
is: 1 -> 2 -> 3 (end of lap 1) -> 4 -> 1 (end of lap 2) -> 2 (end of lap 3
and the marathon). Sectors 1 and 2 are each visited twice, more than any
other sector.
```

### Example 2

```text
Input: n = 2, rounds = [2,1,2,1,2,1,2,1,2]
Output: [2]
```

### Example 3

```text
Input: n = 7, rounds = [1,3,5,7]
Output: [1,2,3,4,5,6,7]
```

### Constraints

- `2 <= n <= 100`
- `1 <= m <= 100`
- `rounds.length == m + 1`
- `1 <= rounds[i] <= n`
- `rounds[i] != rounds[i + 1]` for `0 <= i < m`

## Hints

### Hint 1

For each lap, increment the visit count of every sector visited during that
lap.

### Hint 2

Determine the maximum visit count, then return every sector that reaches it.
