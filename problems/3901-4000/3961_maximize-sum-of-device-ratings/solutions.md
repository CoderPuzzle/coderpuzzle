# Solutions — Maximize Sum of Device Ratings

## Two minima per device

When a device has at least two units, removing its smallest capacity raises
its contribution to its second-smallest capacity. All removed minima can be
sent to one destination device; that destination contributes the globally
smallest capacity, so choosing the device with the smallest second minimum as
the destination loses as little as possible.

Scan every device for its two smallest capacities. Add all second minima,
replace the smallest of them with the global minimum, and return the result.
If each device contains one unit, no transfer can improve the sum, so return
the sum of those units.

**Complexity:** `O(mn)` time, `O(1)` space.
