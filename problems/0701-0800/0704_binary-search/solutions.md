# Solutions — Binary Search

## Iterative Closed-Interval Binary Search

Maintain closed bounds `lo` and `hi` such that, whenever the target exists, its index lies inside `nums[lo..hi]`. Each iteration compares the middle element to the target: equality answers immediately, a smaller middle element means the answer can only be to the right (set `lo = mid + 1`), and a larger one means it can only be to the left (set `hi = mid - 1`). Both updates discard `mid` itself along with the ruled-out half, so the interval shrinks by at least half every iteration and the loop is guaranteed to terminate.

If the bounds cross (`lo > hi`), the candidate interval is empty and the target is not present, so the function returns `-1`. Because the invariant keeps the target's index inside the interval as long as the target exists, the loop can never skip past it, and a successful comparison returns the exact index of a match.

The edge cases fall out of the invariant rather than needing special handling: a single-element array, a target smaller or larger than every element, and matches at the first or last position all just shrink the interval to nothing or hit the equality test. The constraints promise no duplicates, so any match found is the answer.

**Complexity:** `O(log n)` time, `O(1)` space.
