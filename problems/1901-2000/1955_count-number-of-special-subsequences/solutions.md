# Solutions — Count Number of Special Subsequences

## Linear DP on Partial Special Subsequences

Track how much of the 0-then-1-then-2 shape has been matched so far. Over each prefix of `nums`, keep three counters modulo 10^9+7: `f0` for non-empty all-zero subsequences, `f1` for subsequences of positive 0s followed by positive 1s, and `f2` for complete special subsequences. Each incoming element updates exactly one counter, and every special subsequence is built in exactly one way, so `f2` at the end is the answer.

The transitions are doubling plus an inflow. On a `0`: each existing all-zero subsequence either takes the new element or not, and the element alone starts a fresh one, so `f0 = 2·f0 + 1`. On a `1`: existing 0s-then-1s subsequences double, and appending this `1` to any of the `f0` all-zero subsequences promotes them into `f1` — the 1-block is then non-empty as required. On a `2`: symmetrically, `f2 = 2·f2 + f1`, promoting finished prefixes. Leading 1s and 2s are ignored automatically because they can only enter counters whose inflow sources are still zero.

Runs of a single digit are handled by the doubling alone (each new copy extends or skips every existing subsequence), and an input with no complete shape — such as `[2,2,0,0]` — simply leaves `f2` at zero. The counters are kept mod 10^9+7 throughout, since the true counts grow exponentially.

**Complexity:** `O(n)` time, `O(1)` space.
