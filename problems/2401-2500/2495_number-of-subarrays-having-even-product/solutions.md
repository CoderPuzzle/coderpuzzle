# Solutions — Number of Subarrays Having Even Product

A product is even exactly when at least one factor is even, so counting
even-product subarrays means counting subarrays that contain an even
element. Tracking where the most recent even element sits turns that into
a single sweep with one integer of state.

## Last even index scan

Walk the array once with a right endpoint `i`, keeping `lastEven` — the
largest index `<= i` holding an even value (or `-1` when none has been
seen). Every subarray ending at `i` whose left endpoint is at most
`lastEven` necessarily swallows that even element and therefore has an
even product; subarrays starting later consist purely of odd values. So
position `i` contributes exactly `lastEven + 1` subarrays, and summing
that over all right endpoints gives the answer in one pass.

The count grows quadratically: all-even input reaches
`n(n+1)/2 = 5000050000` at the constraint maximum `n = 10⁵`, which far
exceeds 32 bits, so the accumulator widens to 64 bits across the board.

**Complexity:** `O(n)` time, `O(1)` space.
