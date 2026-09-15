# Solutions — Find the Number of Copy Arrays

## One window on copy[0], folded through every bound

The adjacent-difference constraint chains: once `copy[0]` is chosen, every
later entry is forced, because `copy[i] = copy[0] + original[i] -
original[0]` telescopes the sum of prescribed differences. So the arrays
are in one-to-one correspondence with the values of `copy[0]` that keep
every entry inside its window, and counting arrays is counting an interval
of integers — no array ever needs to be built.

For each index `i` the window `ui <= copy[i] <= vi` translates through the
fixed offset into a constraint on `copy[0]` itself:
`ui - shift <= copy[0] <= vi - shift` with `shift = original[i] -
original[0]`. Starting from the full first window `[u0, v0]`, the loop
intersects each translated constraint into a running `[lo, hi]`; the first
time the window empties the answer is already 0 (later constraints can
only shrink it further), and otherwise the answer is the window's size
`hi - lo + 1`. Every quantity stays comfortably inside 32-bit range:
values are at most 10⁹, the translated window endpoints at most
about 2 × 10⁹ in magnitude, and the subtraction only runs once the window
is known non-empty, so the result never exceeds 10⁹.

One pass with two integer accumulators does all the work — each element is
read once, and nothing beyond the input is stored.

**Complexity:** `O(n)` time, `O(1)` auxiliary space.
