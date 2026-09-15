# Solutions — Daily Temperatures

## Monotonic Stack

Keep a stack of day indices whose warmer day has not been seen yet. By construction the temperatures at those indices are non-increasing from the bottom of the stack to the top: any warmer day would already have popped everything it could resolve. Process days in order — when today's temperature is strictly warmer than the temperature at the index on top, that waiting day is answered with the distance to today and popped. Popping continues until the top is at least as warm or the stack empties, then today's index is pushed to await its own warmer day.

Only a strictly warmer day resolves a day, which is why the comparison pops on strictly-less: a future day of equal temperature leaves the waiting day waiting. Any index still on the stack when the input ends never sees a warmer day and keeps its initialized answer of 0.

Each index is pushed exactly once and popped at most once, so although the inner loop can fire many times for a single hot day, the total number of pops across the scan is bounded by the number of pushes. That amortization is what makes one pass linear, and it is why the answer array can be filled in place as days resolve.

**Complexity:** `O(n)` time, `O(n)` space.
