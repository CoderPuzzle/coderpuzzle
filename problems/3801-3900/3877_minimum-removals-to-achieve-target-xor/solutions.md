# Solutions — Minimum Removals to Achieve Target XOR

## DP over Reachable XOR Values

Removing elements is the same as choosing a subset to keep, so minimizing removals means maximizing the number of kept elements whose XOR is exactly `target`; the answer is `len(nums)` minus that maximum. The solution maintains a dictionary `dp` mapping every reachable subset-XOR value to the largest number of elements that can be kept to attain it, initialized to `{0: 0}` for the empty subset.

Each element `x` is folded in by iterating over the current map: taking `x` moves a state `xor_val` to `xor_val ^ x` with count `count + 1`, while skipping `x` leaves every entry intact (the map is copied first so both choices coexist). Whenever a XOR value is produced, the entry keeps the maximum count seen. After all elements are processed, `target` is either present in the map, giving `len(nums) - dp[target]` removals, or absent, giving `-1`.

Although there are `2^40` subsets, the dictionary never blows up: every `nums[i]` is at most `10^4 < 2^14`, so all XOR values fit in 14 bits and the map holds at most `V <= 2^14` distinct keys, `V` being the number of distinct reachable XOR values. The DP compresses the exponentially many subsets into their XOR classes, which is exactly the structure the hint points at — the removed subset's XOR is forced to be `total ^ target`, and here that constraint is tracked implicitly by maximizing over kept counts.

One boundary worth noting: the empty subset gives `dp[0] = 0` unconditionally, so `target = 0` is always achievable by removing everything (the XOR of an empty array is 0), and `target` equal to the full XOR needs zero removals.

**Complexity:** `O(n * V)` time, `O(V)` space.
