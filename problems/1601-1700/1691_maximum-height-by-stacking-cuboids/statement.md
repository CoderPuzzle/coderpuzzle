# Maximum Height by Stacking Cuboids

## Description

Given `n` cuboids where the dimensions of the `i`th cuboid is
`cuboids[i] = [width_i, length_i, height_i]` (0-indexed). Choose a subset of
cuboids and place them on each other.

You can place cuboid `i` on cuboid `j` if `width_i <= width_j` and
`length_i <= length_j` and `height_i <= height_j`. You can rearrange any
cuboid's dimensions by rotating it to put it on another cuboid.

Return the maximum height of the stacked cuboids.

### Example 1

```text
Input: cuboids = [[50,45,20],[95,37,53],[45,23,12]]
Output: 190
Explanation:
Cuboid 1 is placed on the bottom with the 53x37 side facing down with
height 95.
Cuboid 0 is placed next with the 45x20 side facing down with height 50.
Cuboid 2 is placed next with the 23x12 side facing down with height 45.
The total height is 95 + 50 + 45 = 190.
```

![Three cuboids stacked largest to smallest with their bases labeled 53x37, 45x20 and 23x12, totalling 190.](figures/example-1.svg)

### Example 2

```text
Input: cuboids = [[38,25,45],[76,35,3]]
Output: 76
Explanation:
You can't place any of the cuboids on the other.
We choose cuboid 1 and rotate it so that the 35x3 side is facing down and
its height is 76.
```

### Example 3

```text
Input: cuboids = [[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]
Output: 102
Explanation:
After rearranging the cuboids, you can see that all cuboids have the same
dimension. You can place the 11x7 side down on all cuboids so their heights
are 17. The maximum height of stacked cuboids is 6 * 17 = 102.
```

### Constraints

- `n == cuboids.length`
- `1 <= n <= 100`
- `1 <= width_i, length_i, height_i <= 100`

## Hints

### Hint 1

Does dynamic programming sound like the right algorithm after sorting?

### Hint 2

If box1 can be placed on top of box2, then no matter what orientation box2 is in, box1 can be rotated to still fit on top. So orient every cuboid with its biggest dimension as the height.

### Hint 3

Sort each cuboid's dimensions, sort the cuboids themselves, then run a longest-chain style DP over nesting.
