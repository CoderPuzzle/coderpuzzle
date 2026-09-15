# Find the Highest Altitude

## Description

A biker is riding a road trip along a route of `n + 1` points at various
altitudes. The trip begins at point 0, which sits at altitude equal to 0.

You are given an integer array `gain` of length `n`, where `gain[i]` is the
net gain in altitude between point `i` and point `i + 1` for all
`0 <= i < n`. Return the highest altitude of a point on the trip.

### Example 1

```text
Input: gain = [-5,1,5,0,-7]
Output: 1
Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.
```

### Example 2

```text
Input: gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.
```

### Constraints

- `n == gain.length`
- `1 <= n <= 100`
- `-100 <= gain[i] <= 100`

## Hints

### Hint 1

The altitude of a point is the sum of the gains of all the points behind
it.

### Hint 2

The altitudes can be obtained by taking the prefix sum array of the given
array.
