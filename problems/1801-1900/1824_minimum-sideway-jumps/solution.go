// dp[lane] = fewest side jumps needed to stand on that lane at the point
// being processed. Forward moves are free, a lane change is one jump, so
// each new point relaxes every open lane against the previous point's
// cheapest lane plus one.
func minSideJumps(obstacles []int) int {
	const inf = 1000000000
	dp := [4]int{inf, 1, 0, 1} // lanes indexed 1..3; start on lane 2
	for point := 1; point < len(obstacles); point++ {
		blocked := obstacles[point]
		dp[blocked] = inf
		best := min(dp[1], dp[2], dp[3])
		for lane := 1; lane <= 3; lane++ {
			if lane != blocked {
				dp[lane] = min(dp[lane], best+1)
			}
		}
	}
	return min(dp[1], dp[2], dp[3])
}
