# Pour Water

## Description

You are given an elevation map represented as an integer array `heights`,
where `heights[i]` is the height of the terrain at index `i`. The width at
each index is `1`. You are also given two integers `volume` and `k`: `volume`
units of water will fall at index `k`.

Water first drops at index `k` and rests on top of the highest terrain or
water at that index. Then, it flows according to the following rules:

- If the droplet would eventually fall by moving left, then move left.
- Otherwise, if the droplet would eventually fall by moving right, then
  move right.
- Otherwise, rise to its current position.

Here, "eventually fall" means that the droplet will eventually be at a lower
level if it moves in that direction. Also, level means the height of the
terrain plus any water in that column. When the droplet does move, it can
only move to the same level or a lower level.

We can assume there is infinitely high terrain on the two sides out of
bounds of the array. Also, there could not be partial water being spread out
evenly on more than one grid block, and each unit of water has to be in
exactly one block.

Return `heights` after all `volume` units of water have fallen, where each
`heights[i]` is the final level at index `i` — the height of the terrain
plus any water in that column.

### Example 1

![diagram](figures/755-1.svg)

![diagram](figures/755-2.svg)

![diagram](figures/755-3.svg)

![diagram](figures/755-4.svg)

![diagram](figures/755-5.svg)

```text
Input: heights = [2,1,1,2,1,2,2], volume = 4, k = 3
Output: [2,2,2,3,2,2,2]
Explanation: The first droplet lands at index k = 3, where the level is 2. Since moving left would eventually make it fall, it moves left and settles at index 2, the first position from which moving left would not eventually make it fall. The next droplet also prefers to move left — even though it could move right, and moving right would make it fall sooner — and settles at index 1. For the third droplet, moving left would not eventually make it fall, so it tries to move right; since moving right would eventually make it fall, it settles at index 4. Finally, the fourth droplet would fall neither left nor right, so it rises at index 3.
```

### Example 2

```text
Input: heights = [1,2,3,4], volume = 2, k = 2
Output: [2,3,3,4]
Explanation: The first droplet walks left down the slope and settles at index 0. The last droplet settles at index 1, since moving further left would not cause it to eventually fall to a lower height.
```

### Example 3

```text
Input: heights = [3,1,3], volume = 5, k = 1
Output: [4,4,4]
```

### Constraints

- `1 <= heights.length <= 100`
- `0 <= heights[i] <= 99`
- `0 <= volume <= 2000`
- `0 <= k < heights.length`
