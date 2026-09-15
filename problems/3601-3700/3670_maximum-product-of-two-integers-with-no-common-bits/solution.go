func maxProduct(nums []int) int64 {
	// Every value fits in 20 bits, so each number doubles as its own
	// bitmask; "no common set bits" means the partner's mask is a subset
	// of this mask's complement within those 20 bits.
	width := 1
	for _, v := range nums {
		w := 0
		for x := v; x > 0; x >>= 1 {
			w++
		}
		if w > width {
			width = w
		}
	}
	size := 1 << width
	// dp[m] starts as the largest value whose set bits are exactly m (0
	// when no element carries mask m).
	dp := make([]int, size)
	for _, v := range nums {
		if v > dp[v] {
			dp[v] = v
		}
	}
	// Subset-max sweep: a mask holding bit b absorbs its b-cleared twin;
	// afterwards dp[m] is the largest value whose set bits are a subset
	// of m.
	for b := 0; b < width; b++ {
		bit := 1 << b
		for m := 0; m < size; m++ {
			if m&bit != 0 && dp[m^bit] > dp[m] {
				dp[m] = dp[m^bit]
			}
		}
	}
	// A disjoint partner of v must carry a mask that is a subset of
	// FULL ^ mv, so dp holds the best partner directly. Products reach
	// 10^12, hence int64.
	full := size - 1
	var best int64
	for _, v := range nums {
		if prod := int64(v) * int64(dp[full^v]); prod > best {
			best = prod
		}
	}
	return best
}
