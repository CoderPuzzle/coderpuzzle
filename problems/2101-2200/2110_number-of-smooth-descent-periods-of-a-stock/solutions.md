# Solutions — Number of Smooth Descent Periods of a Stock

## Count periods ending at each day

Maintain the length of the smooth descent run ending at the current day. Extend it when the previous price is exactly one greater; otherwise reset it to one.

That run length is precisely the number of valid periods ending at the current day, so add it to a 64-bit total.

**Complexity:** `O(n)` time and `O(1)` space.
