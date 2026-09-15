# Solutions — Watering Plants

## Count the refill detours

Walk through the plants while tracking the water left in the can. Moving from the previous position to plant `i` always costs one step. If the remaining water is less than `plants[i]`, the gardener must first return from plant `i - 1` to the river and come back to that same position, adding a detour of `2 * i` steps before refilling.

Initialize the step count to `n` for the unavoidable forward moves, add each required detour, and subtract every plant's need from the current supply. Equality needs no refill because the plant can be watered completely.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
