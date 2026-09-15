# Solutions — Minimum Swaps to Move Zeros to End

## Zero boundary count

If there are `z` zeros, the final array must put them in the last `z`
positions. Every zero currently in the first `n - z` positions needs to be
swapped with one of the non-zero values currently occupying the last `z`
positions.

Each such swap fixes exactly one misplaced zero, so the minimum number of
operations is the number of zeros in the prefix that should contain only
non-zero values.

**Complexity:** `O(n)` time, `O(1)` space.
