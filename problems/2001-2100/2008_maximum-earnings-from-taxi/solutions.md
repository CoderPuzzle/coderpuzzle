# Solutions — Maximum Earnings From Taxi

## Dynamic programming by end point

Group every ride by its ending point. Let `dp[x]` be the greatest earnings
possible upon reaching point `x`; first carry `dp[x - 1]` forward because the
taxi may drive to `x` without a passenger. A ride from `start` to `x` can then
follow any optimal schedule ending at `start`, giving the candidate
`dp[start] + x - start + tip`.

![On the number line 0 to 5 with rides [2, 5, 4] and [1, 5, 1] grouped at endpoint 5, dp[x] carries 0 forward through points 1-4 and the winning jump dp[2] + 5 − 2 + 4 = 7 beats dp[1] + 5 − 1 + 1 = 5, so dp[5] = 7.](figures/solution-dp-endpoint-rides.svg)

Processing points in increasing order guarantees every required `dp[start]`
is final before a ride uses it. Taking the maximum over the carried value and
all rides ending at each point therefore considers every compatible final
ride, while 64-bit DP entries safely hold the total earnings.

**Complexity:** `O(n + m)` time and `O(n + m)` space, where `m` is the number of rides.
