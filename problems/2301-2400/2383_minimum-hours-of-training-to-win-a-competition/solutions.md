# Solutions — Minimum Hours of Training to Win a Competition

## Greedy simulation with exact top-ups

Training hours are interchangeable between energy and experience, and each
hour buys exactly one point of one starting stat. Because a deficit at any
opponent must be covered no matter when it is paid, the cheapest schedule
tops up each stat by precisely what that opponent demands, and the two
stats never interact: hours needed for energy depend only on the energy
sequence, hours for experience only on the experience sequence.

So simulate the fights once. For energy, track the running total of
opponent costs — training covers whatever shortfall remains when the sum
would reach `initialEnergy`. For experience, walk the fights with the
current value; whenever it is not strictly greater than the opponent's,
spend the difference in hours and set the value just above, then collect
the victory bonus. The answer is the sum of both hour counts.

**Complexity:** `O(n)` time, `O(1)` space.
