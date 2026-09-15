func maxTastiness(price []int, tastiness []int, maxAmount int, maxCoupons int) int {
	// dp[a][c] = best tastiness having spent `a` and used `c` coupons.
	// Descending both axes keeps each fruit usable at most once: every
	// update lands at a larger amount or a larger coupon count, which
	// the descending sweep has already passed.
	dp := make([][]int, maxAmount+1)
	for a := range dp {
		dp[a] = make([]int, maxCoupons+1)
		for c := range dp[a] {
			dp[a][c] = -1
		}
	}
	dp[0][0] = 0
	for i := range price {
		p, t := price[i], tastiness[i]
		half := p / 2
		for a := maxAmount; a >= 0; a-- {
			for c := maxCoupons; c >= 0; c-- {
				cur := dp[a][c]
				if cur < 0 {
					continue
				}
				if a+p <= maxAmount && cur+t > dp[a+p][c] {
					dp[a+p][c] = cur + t
				}
				if c+1 <= maxCoupons && a+half <= maxAmount && cur+t > dp[a+half][c+1] {
					dp[a+half][c+1] = cur + t
				}
			}
		}
	}
	best := 0
	for _, row := range dp {
		for _, v := range row {
			if v > best {
				best = v
			}
		}
	}
	return best
}
