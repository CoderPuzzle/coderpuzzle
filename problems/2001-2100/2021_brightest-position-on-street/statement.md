# Brightest Position on Street

## Description

A perfectly straight street is represented by a number line. The street has
street lamps on it and is represented by a 2D integer array `lights`. Each
`lights[i] = [positioni, rangei]` indicates that there is a street lamp at
`positioni` that lights the inclusive area
`[positioni - rangei, positioni + rangei]`.

The brightness of a position `p` is the number of street lamps that light up
position `p`.

Given `lights`, return the brightest position on the street. If there are
multiple brightest positions, return the smallest one.

### Example 1

![diagram](figures/2021-1.svg)

```text
Input: lights = [[-3,2],[1,2],[3,3]]
Output: -1
Explanation:
The first lamp lights [-5,-1], the second lights [-1,3], and the third lights [0,6].
Position -1 has brightness 2 from the first and second lamps. Positions 0, 1,
2, and 3 also have brightness 2 from the second and third lamps. The smallest
of these brightest positions is -1.
```

### Example 2

```text
Input: lights = [[1,0],[0,1]]
Output: 1
Explanation: The first lamp lights [1,1] and the second lights [-1,1].
Position 1 has brightness 2, so it is the brightest position.
```

### Example 3

```text
Input: lights = [[1,2]]
Output: -1
Explanation: The lamp lights [-1,3]. Every position in that range has
brightness 1, and -1 is the smallest.
```

### Constraints

- `1 <= lights.length <= 10⁵`
- `lights[i].length == 2`
- `-10⁸ <= positioni <= 10⁸`
- `0 <= rangei <= 10⁸`

## Hints

### Hint 1

Convert lights into an array of ranges representing the range where each street
light can light up and sort the start and end points of the ranges.

### Hint 2

Do we need to traverse all possible positions on the street?

### Hint 3

No, we don't, we only need to go to the start and end points of the ranges for
each streetlight.
