# Solutions — Maximum Earnings From Taxi

## Dynamic programming by end point

Group every ride by its ending point. Let `dp[x]` be the greatest earnings
possible upon reaching point `x`; first carry `dp[x - 1]` forward because the
taxi may drive to `x` without a passenger. A ride from `start` to `x` can then
follow any optimal schedule ending at `start`, giving the candidate
`dp[start] + x - start + tip`.

Processing points in increasing order guarantees every required `dp[start]`
is final before a ride uses it. Taking the maximum over the carried value and
all rides ending at each point therefore considers every compatible final
ride, while 64-bit DP entries safely hold the total earnings.

**Complexity:** `O(n + m)` time and `O(n + m)` space, where `m` is the number of rides.
