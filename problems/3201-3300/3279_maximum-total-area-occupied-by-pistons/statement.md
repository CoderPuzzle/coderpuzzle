# Maximum Total Area Occupied by Pistons

## Description

An old car engine houses several pistons, and we want to know the largest
total area that can sit under all of them at any one moment.

You are given:

- An integer `height`, the maximum height a piston can reach.
- An integer array `positions`, where `positions[i]` is the current
  position of piston `i`, which is equal to the current area under it.
- A string `directions`, where `directions[i]` is the current moving
  direction of piston `i`, `'U'` for up, and `'D'` for down.

Each second, every piston moves in its current direction by 1 unit; if a
piston has reached one of the ends, that is, `positions[i] == 0` or
`positions[i] == height`, its direction will change. A piston found at an
end reverses on the spot, so this also applies before any motion begins:
a piston already resting at an end and headed outward turns around at once
instead of leaving the tube.

Return the maximum possible area under all the pistons — the largest
value the sum of all positions ever takes, measured from the starting
moment on, where time passes in whole seconds.

### Example 1

```text
Input: height = 5, positions = [2,5], directions = "UD"
Output: 7
Explanation: The pistons already stand so that the area under them,
2 + 5 = 7, is as large as it can ever get.
```

### Example 2

```text
Input: height = 6, positions = [0,0,6,3], directions = "UUDU"
Output: 15
Explanation: After 3 seconds, the pistons will be in positions [3,3,3,6],
which has the maximum possible area under it.
```

### Constraints

- `1 <= height <= 10⁶`
- `1 <= positions.length == directions.length <= 10⁵`
- `0 <= positions[i] <= height`
- `directions[i]` is either `'U'` or `'D'`.

## Hints

### Hint 1

Simulate the process.

### Hint 2

We only need to keep track of the times when a piston reaches one end and
let’s call these critical points.

### Hint 3

For each piston, find the first time it reaches one end and sort these
times (these times are critical points).

### Hint 4

Find a way to calculate the area difference between two consecutive
critical points in constant time.
