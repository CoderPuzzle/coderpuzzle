# Solutions — Longest Alternating Subarray

## One pass, restart at the previous pair

The deltas fully describe an alternating subarray: reading left to right they must be exactly +1, -1, +1, -1, ... , never skipping or repeating a sign, and every difference must be exactly 1 in magnitude. So scan the array once while tracking `cur`, the length of the longest alternating run ending at the current element. Because the delta sequence alternates starting with +1, the difference the next step must supply is +1 when `cur` is odd and -1 when `cur` is even.

At each step compare that expectation against the actual difference `nums[i] - nums[i - 1]`. When it matches, the run simply grows by one. When the actual difference is itself +1, something subtler happened: the pair (`nums[i - 1]`, `nums[i]`) satisfies the definition's opening clause on its own, so a brand-new run of length 2 has just started at index `i - 1` — restart there, not at `i`, or Example 1 loses its tail (`[2, 3]` breaks expecting -1, yet the very same adjacent pair `(3, 4)` begins the winning `[3, 4, 3, 4]`). Any other difference (0, magnitude 2 or more, or -1 when +1 was required) leaves no live run: reset `cur` to 1. Record `cur` into the answer whenever it reaches 2 or beyond; if that never happens, no alternating subarray exists and the answer stays -1.

Growth steps cannot miss anything longer than a pair: an alternating subarray of length 3 or more ending at `i` has an alternating prefix ending at `i - 1`, so its extension step was covered by the run the scan was already tracking; bare pairs are precisely what the +1-restart captures. Hence the largest recorded `cur` is the global maximum.

**Complexity:** `O(n)` time, `O(1)` space.
