func maximumStrength(nums []int, k int) int64 {
	NEG := int64(-1) << 60
	n := len(nums)
	// nxt[j][x] = dp[i+1][j][x]
	nxt := make([][2]int64, k+1)
	for j := range nxt {
		nxt[j] = [2]int64{NEG, NEG}
	}
	nxt[0][0] = 0
	for i := n - 1; i >= 0; i-- {
		cur := make([][2]int64, k+1)
		for j := range cur {
			cur[j] = [2]int64{NEG, NEG}
		}
		for j := 0; j <= k; j++ {
			if j >= 1 {
				var coeff int64
				if j&1 != 0 {
					coeff = int64(j)
				} else {
					coeff = -int64(j)
				}
				best := nxt[j-1][0]
				if nxt[j][1] > best {
					best = nxt[j][1]
				}
				cur[j][1] = int64(nums[i])*coeff + best
			}
			cur[j][0] = nxt[j][0]
			if cur[j][1] > cur[j][0] {
				cur[j][0] = cur[j][1]
			}
		}
		nxt = cur
	}
	return nxt[k][0]
}
