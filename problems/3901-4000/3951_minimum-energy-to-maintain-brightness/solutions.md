# Solutions — Minimum Energy to Maintain Brightness

## Constant bulb count and interval union

Each bulb illuminates itself and up to two adjacent positions, so the
smallest number of bulbs needed to cover `brightness` positions is
`ceil(brightness / 3)`. This is independent of time.

Merge all time intervals to find the total number of active integer time
units. The answer is the bulb count multiplied by that active length.

**Complexity:** `O(n log n)` time for interval sorting, `O(n)` space.
