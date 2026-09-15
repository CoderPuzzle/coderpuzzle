# Solutions — House Robber V

Single left-to-right dynamic program whose one twist on the classic robber is
a transition that consults the color codes of the adjacent pair.

## Prefix DP with a color-gated adjacent take

Let dp[i] be the maximum haul obtainable from houses 0..i. A valid selection
either skips house i, worth dp[i-1], or takes it — and taking it splits on
colors. Taking i alongside i-1 is allowed exactly when colors[i] !=
colors[i-1], and any optimal selection up to i-1 can then be extended: if it
contains i-1 the colors differ so the pair is legal, and if it does not the
extension is legal trivially. That candidate is worth nums[i] + dp[i-1].
The remaining option, take i but not i-1, is worth nums[i] + dp[i-2] and is
always legal. So dp[i] = max(dp[i-1], nums[i] + (dp[i-1] if colors[i] !=
colors[i-1] else dp[i-2])), with dp rooted at dp[0] = nums[0] and dp[-1] = 0
— every valid selection falls into one of the three candidates and every
candidate is achievable, so the recurrence is exact. When colors[i] ==
colors[i-1] (Example 1's first two houses) the recurrence degenerates to the
classic robber's; when all colors alternate (Example 2's opening pair) it
keeps both neighbors and robs the whole street.

Only the two previous values are ever read, and dp is monotone — dp[i-1] >=
dp[i-2] because skipping is always allowed — so the colors-differ candidate
nums[i] + dp[i-1] dominates nums[i] + dp[i-2] and one base value suffices:
base = dp[i-1] when the adjacent colors differ, else dp[i-2]. Two rolling
variables carry the whole state, the loop is plain iteration with no
recursion, and a single pass over the arrays settles n = 10^5 well inside
the limits.

Bounds force 64-bit arithmetic: n <= 10^5 houses each worth up to 10^5 put
the maximum answer at 10^10 (the all-max alternating-colors case), almost
five times past the 2.1×10^9 ceiling of 32-bit. The fixed-width languages
carry the rolling values in 64-bit integers, nine orders of magnitude
inside the i64 ceiling of 9.2×10^18, and the same 10^10 bound keeps
JavaScript exact with a 900-fold margin under 2⁵³ ≈ 9.0×10^15.

**Complexity:** `O(n)` time, `O(1)` space.
