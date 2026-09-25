# Solutions — Max Consecutive Ones III

## Sliding window counting zeros

Flipping at most `k` zeros is equivalent to finding the longest contiguous window that contains at most `k` zeros — nothing is ever actually flipped. The window is maintained in the classic two-pointer style: `right` advances over `nums` incrementing `zeros` whenever a `0` enters, and whenever `zeros` exceeds `k`, the `while` loop shrinks from the left, stepping `left` forward and decrementing `zeros` each time a `0` leaves, until the window is valid again.

![On nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0] with k = 2, the third 0 entering at right = 5 pushes zeros to 3 and the shrink moves left all the way to 4; the window then grows back to right = 9, and the best window [4..9] holds exactly 2 zeros (flipped) and spans 6.](figures/solution-window-zero-shrink.svg)

After the shrink (which is skipped entirely when the incoming element kept the window valid), `right - left + 1` is the length of the largest valid window ending at `right`, and `best` keeps the maximum over the whole sweep. Shrinking only as far as necessary, rather than resetting, is what lets the window grow across long stretches; since `left` only ever moves right and each index enters and leaves the window at most once, the whole algorithm is linear.

Edge cases fall out without special handling: `k = 0` degenerates to the longest run of `1`s, because any `0` inside the window triggers a shrink past it, and `k` at least the total number of zeros never triggers a shrink, so the window spans the entire array.

**Complexity:** `O(n)` time, `O(1)` space.
