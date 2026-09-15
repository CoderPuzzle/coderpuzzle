import "math"

func new21Game(n int, k int, maxPts int) float64 {
	if k == 0 || n >= k-1+maxPts {
		return 1.0
	}
	// dp[i] = probability of ever holding exactly i points.
	dp := make([]float64, n+1)
	dp[0] = 1.0
	window := 1.0 // sum of dp[max(0, i - maxPts) .. i - 1]
	for i := 1; i <= n; i++ {
		dp[i] = window / float64(maxPts)
		if i < k {
			window += dp[i]
		}
		if i-maxPts >= 0 {
			window -= dp[i-maxPts]
		}
	}
	// Compensated (Neumaier) summation, matching the reference's built-in sum().
	result := 0.0
	c := 0.0
	for i := k; i <= n; i++ {
		x := dp[i]
		t := result + x
		if math.Abs(result) >= math.Abs(x) {
			c += (result - t) + x
		} else {
			c += (x - t) + result
		}
		result = t
	}
	return result + c
}
