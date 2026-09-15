# Solutions — Summary Ranges

## One walk, extending the current run

Because `nums` arrives sorted and unique, every maximal run of consecutive integers occupies a contiguous block of the array: nothing before the block can join it (all values there are smaller), and nothing after can either (the first value past the block breaks the chain). So a single left-to-right walk that extends the current run while the next value is exactly one past the current one closes each range exactly once, and each closed range is already maximal.

The walk keeps two indices, the start of the current run and the position being tested. When the inner extension stops, the run `[nums[start], nums[i]]` is complete and gets formatted on the spot: `"a->b"` when the endpoints differ, the bare `"a"` when they coincide — which is exactly the run-of-length-one case, so singletons need no separate branch. An empty array never enters the loop and comes back as an empty list.

The only arithmetic is the `+1` in the extension test, and the guard in front of it short-circuits: the sum is evaluated only when a successor exists, and that successor is strictly larger, so the value being incremented never exceeds `2³¹ - 2` and the add cannot leave the 32-bit range — no widening is needed in any language, not even to close a run ending at `2³¹ - 1` itself. The endpoints then only ever travel into string conversion, which renders `-2³¹` and `2³¹ - 1` exactly as they are.

**Complexity:** `O(n)` time, `O(1)` space beyond the returned list.
