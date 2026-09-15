# Minimum Lights to Illuminate a Road

## Description

You are given an integer array `lights` of length `n`, representing positions
`0` through `n - 1` on a road.

For each position `i`:

- If `lights[i] = v`, where `v > 0`, there is a working bulb at position `i`
  that illuminates every position from `max(0, i - v)` to
  `min(n - 1, i + v)`, inclusive.
- If `lights[i] = 0`, there is no working bulb at position `i`.

A position is visible if it is illuminated by at least one working bulb.

You may install additional bulbs at any positions. Each additional bulb
installed at position `j` illuminates positions from `max(0, j - 1)` to
`min(n - 1, j + 1)`, inclusive.

Return the minimum number of additional bulbs required to make every position
on the road visible.

### Example 1

```text
Input: lights = [0,0,0,0]
Output: 2
Explanation:
    One optimal placement is:
        Install an additional bulb at position 1, illuminating positions
        [0, 1, 2].
        Install an additional bulb at position 3, illuminating positions
        [2, 3].

    Therefore, the minimum number of additional bulbs required is 2.
```

### Example 2

```text
Input: lights = [0,0,0,2,0]
Output: 1
Explanation:
    Since lights[3] = 2, the working bulb at position 3 illuminates positions
    [1, 2, 3, 4].
    Installing an additional bulb at position 1 illuminates positions
    [0, 1, 2], making every position visible.
    Therefore, the minimum number of additional bulbs required is 1.
```

### Constraints

- `1 <= n == lights.length <= 10⁵`
- `0 <= lights[i] <= n`

## Hints

### Hint 1

First mark all positions already visible from the existing working bulbs.

### Hint 2

Then scan the road from left to right. Whenever you find the first invisible
position `i`, install a new bulb as far right as possible while still covering
`i`.

### Hint 3

Since each additional bulb covers distance `1`, the best position is usually
`i + 1`, unless it goes out of bounds. After placing it, skip all positions it
covers.
