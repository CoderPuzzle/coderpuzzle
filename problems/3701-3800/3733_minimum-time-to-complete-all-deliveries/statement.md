# Minimum Time to Complete All Deliveries

## Description

Two delivery drones work out of one depot. You are given two integer arrays
of size 2: `d = [d1, d2]` and `r = [r1, r2]`.

Drone `i` must complete exactly `di` deliveries. Each delivery takes one
full hour, and only one drone can make a delivery during any given hour.

Both drones also follow fixed recharging schedules during which they cannot
work: drone `i` is unavailable at every hour whose number is a multiple of
`ri`. Hours are counted `1, 2, 3, ...`; with `r = [2, 3]`, the first drone
is idle at hours 2, 4, 6, ... and the second at hours 3, 6, 9, ....

Return the minimum total time in hours needed to complete all deliveries.

### Example 1

```text
Input: d = [3,1], r = [2,3]
Output: 5
Explanation: Drone 1 delivers at hours 1, 3, 5 (it recharges at hours 2,
4). Drone 2 delivers at hour 2 (it recharges at hour 3).
```

### Example 2

```text
Input: d = [1,3], r = [2,2]
Output: 7
Explanation: Drone 1 delivers at hour 3 (it recharges at hours 2, 4, 6).
Drone 2 delivers at hours 1, 5, 7 (it recharges at hours 2, 4, 6).
```

### Example 3

```text
Input: d = [2,1], r = [3,4]
Output: 3
Explanation: Drone 1 delivers at hours 1, 2 (it recharges at hour 3).
Drone 2 delivers at hour 3.
```

### Constraints

- `d = [d1, d2]`, `r = [r1, r2]`; both arrays have size 2.
- `1 <= di <= 10⁹`
- `2 <= ri <= 3 · 10⁴`

## Hints

### Hint 1

Binary-search the total time `T`.

### Hint 2

At hours divisible by `lcm(r1, r2)` both drones are recharging at the same
time, so nobody can deliver there.

### Hint 3

For a fixed `T`, the recharge-hour counts are `floor(T / r1)` and
`floor(T / r2)`.

### Hint 4

Drone 1 can work in `c1 = T - floor(T / r1)` hours and drone 2 in
`c2 = T - floor(T / r2)`; the hours open to either drone number
`T - floor(T / r1) - floor(T / r2) + floor(T / lcm(r1, r2))`.

### Hint 5

Give each drone its own available hours first; whatever deliveries remain
must fit into the hours both drones share.
