func maxScore(nums []int) int64 {
	// Exclusive prefix/suffix folds: pre[i] folds nums[0..i-1] and
	// suf[i] folds nums[i..n-1] for both GCD (identity 0) and LCM
	// (identity 1). Removing index i leaves the fold of the two joins;
	// the full-array fold covers removing nothing, and removing every
	// element folds to score 0 through the identities. Every LCM of a
	// sub-multiset of values <= 30 divides LCM(1..30) = 2329089562800
	// and the GCD is at most 30, so every intermediate product stays
	// below 6987268688400, comfortably inside int64.
	n := len(nums)
	preG := make([]int64, n+1)
	preL := make([]int64, n+1)
	sufG := make([]int64, n+1)
	sufL := make([]int64, n+1)
	preL[0], sufL[n] = 1, 1
	for i := 0; i < n; i++ {
		value := int64(nums[i])
		preG[i+1] = gcd64(preG[i], value)
		preL[i+1] = preL[i] / gcd64(preL[i], value) * value
	}
	for i := n - 1; i >= 0; i-- {
		value := int64(nums[i])
		sufG[i] = gcd64(sufG[i+1], value)
		sufL[i] = sufL[i+1] / gcd64(sufL[i+1], value) * value
	}
	best := preG[n] * preL[n]
	for i := 0; i < n; i++ {
		g := gcd64(preG[i], sufG[i+1])
		l := preL[i] / gcd64(preL[i], sufL[i+1]) * sufL[i+1]
		if g*l > best {
			best = g * l
		}
	}
	return best
}

func gcd64(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
