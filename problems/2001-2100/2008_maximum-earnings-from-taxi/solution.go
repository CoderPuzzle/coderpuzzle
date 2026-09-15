func maxTaxiEarnings(n int, rides [][]int) int64 {
	type endingRide struct {
		start  int
		profit int64
	}

	ending := make([][]endingRide, n+1)
	for _, ride := range rides {
		profit := int64(ride[1] - ride[0] + ride[2])
		ending[ride[1]] = append(ending[ride[1]], endingRide{ride[0], profit})
	}

	dp := make([]int64, n+1)
	for point := 1; point <= n; point++ {
		dp[point] = dp[point-1]
		for _, ride := range ending[point] {
			candidate := dp[ride.start] + ride.profit
			if candidate > dp[point] {
				dp[point] = candidate
			}
		}
	}
	return dp[n]
}
