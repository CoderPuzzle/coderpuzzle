# Solutions — Subarrays with K Different Integers

Counting subarrays with exactly k distinct values resists a direct window:
a window that just lost a value can be too narrow, one that just gained a
value too wide, and neither side tells a single monotone pointer which way
to move. The subarrays with at most t distinct values have no such problem
— and exactly k is the difference between at most k and at most k − 1.

## At-most windows, subtracted

Let atMost(t) be the number of subarrays holding at most t distinct values.
One pass computes it: sweep the right end forward, keep a frequency map of
the window, and while the window holds more than t distinct values, retire
`nums[left]` from the map and advance `left`. When the window settles, every
suffix of it also holds at most t distinct values, so the subarrays ending
at the current right number exactly the window's length, `right - left + 1`
— add that and move on.

A subarray holds exactly k distinct values precisely when it holds at most
k and not at most k − 1, so the answer is `atMost(k) - atMost(k - 1)`: two
runs of the same loop with different bounds. `atMost(0)` is 0 by the same
mechanism — the window empties before it can contribute — so `k = 1` needs
no special case. Values lie in `[1, n]`, so the frequency map is a flat
array of n + 1 slots, and the total — up to `n(n+1)/2 = 2·10⁸` subarrays at
the bound — is accumulated and returned in 64 bits.

**Complexity:** `O(n)` time, `O(n)` space.
