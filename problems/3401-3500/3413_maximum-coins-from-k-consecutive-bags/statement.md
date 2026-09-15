# Maximum Coins From K Consecutive Bags

## Description

There are an infinite amount of bags on a number line, one bag for each
coordinate. Some of these bags contain coins.

You are given a 2D array `coins`, where `coins[i] = [li, ri, ci]` denotes that
every bag from `li` to `ri` contains `ci` coins.

The segments that `coins` contain are non-overlapping.

You are also given an integer `k`.

Return the maximum amount of coins you can obtain by collecting `k`
consecutive bags.

### Example 1

```text
Input: coins = [[8,10,1],[1,3,2],[5,6,4]], k = 4
Output: 10
Explanation: Selecting bags at positions [3, 4, 5, 6] gives the maximum number of coins: 2 + 0 + 4 + 4 = 10.
```

### Example 2

```text
Input: coins = [[1,10,3]], k = 2
Output: 6
Explanation: Selecting bags at positions [1, 2] gives the maximum number of coins: 3 + 3 = 6.
```

### Constraints

- `1 <= coins.length <= 10⁵`
- `1 <= k <= 10⁹`
- `coins[i] == [li, ri, ci]`
- `1 <= li <= ri <= 10⁹`
- `1 <= ci <= 1000`
- The given segments are non-overlapping.

## Hints

### Hint 1

An optimal starting position for k consecutive bags will be either li or ri - k + 1.

### Hint 2

Sort the segments and use prefix sums of each segment's total coins so any candidate window can be answered quickly.

### Hint 3

The window overlaps at most two segments partially; handle the two boundary segments separately and use the prefix sum for everything in between.
