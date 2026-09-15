# Solutions — K-Concatenation Maximum Sum

## Kadane's Algorithm with Prefix and Suffix Sums

The key insight is that the best subarray of the `k`-fold repeated array never needs to span more than two copies plus a run of whole copies in the middle. Any subarray longer than two copies can be split at a copy boundary: the two partial end copies are scored by a prefix and a suffix sum, and each complete copy in between contributes the full array total. So it suffices to compute three quantities once with linear scans: the maximum subarray sum (Kadane), the maximum prefix sum, and the maximum suffix sum, each clamped at 0 so the empty subarray is always an option.

For `k == 1` the answer is just Kadane's algorithm over the single copy. For larger `k`, running Kadane over the doubled array `arr + arr` — a single extra copy, so the scan and memory stay linear in the input size — covers every subarray that starts and ends within two adjacent copies, which is where all interesting boundary-hugging candidates live. When `k > 2` and the total sum is positive, spanning additional copies helps, so the candidate `max_suffix + max_prefix + (k - 2) * total` joins the comparison; if the total is non-positive, extra copies can only hurt and the doubled-array Kadane result already suffices.

The modular reduction is applied only at the very end, after taking the maximum over raw values, which avoids comparing residues that no longer reflect true magnitude. All-negative inputs fall through every positive candidate to the floor of 0, matching the rule that the empty subarray has sum 0.

**Complexity:** `O(n)` time, `O(n)` space.
