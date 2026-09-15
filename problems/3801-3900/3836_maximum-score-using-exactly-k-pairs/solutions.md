# Solutions — Maximum Score Using Exactly K Pairs

Layered dynamic programming that walks both prefixes together, using the pair
count as the layer index.

## Prefix DP over pair count with rolling layers

Let dp[t][a][b] be the maximum total score of exactly t pairs whose indices
all lie in nums1[0..a) and nums2[0..b). The strictly increasing chains force
the pairing inside any fixed choice of index sets — the r-th smallest chosen
i meets the r-th smallest chosen j — so a state only has to decide, for the
newest positions a-1 and b-1, whether they form a pair together. That gives
dp[t][a][b] = max(dp[t][a-1][b], dp[t][a][b-1], dp[t-1][a-1][b-1] +
nums1[a-1] * nums2[b-1]): skip index a-1, skip index b-1, or pair them up and
leave exactly t-1 pairs for the strictly shorter prefixes. Layer 0 is
identically 0 and the answer is dp[k][n][m], always feasible because
k <= min(n, m). With negative values (Example 3) the "exactly" matters:
skipping may only happen between pairs, never as a way to settle for fewer
than k of them, and the exactly-t layering enforces that by construction.

Layer t has feasible cells only at a >= t and b >= t — fewer than t elements
cannot host t pairs — and at every such cell the dp[t-1][a-1][b-1] read lies
inside layer t-1's own feasible rectangle, so the pairing candidate is always
a real value and no negative-infinity sentinel is ever needed; the two skip
candidates are read only when a > t or b > t, where they were freshly written
this layer. Keeping two rolling (n+1) × (m+1) layers brings space down to
O(n·m), while the swept volume, the sum over t of (n-t+1)·(m-t+1) — 338,350
cells at n = m = k = 100, within the n·m·k = 10⁶ bound — is comfortably
inside the limits for plain iteration, with no recursion anywhere.

Bounds force 64-bit arithmetic: |nums1[i] * nums2[j]| <= 10¹² and the total
over k <= 100 pairs reaches at most 10¹⁴ in absolute value (the all-±10⁶
extremes), far beyond 32-bit. The fixed-width languages carry every layer
value and product in 64-bit integers, five orders of magnitude inside the i64
ceiling of 9.2×10¹⁸, and the same 10¹⁴ bound keeps JavaScript exact: it sits
ninety-fold inside 2⁵³ ≈ 9.0×10¹⁵.

**Complexity:** `O(n·m·k)` time, `O(n·m)` space.
