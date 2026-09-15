func getLargestOutlier(nums []int) int {
	// With specials summing to S and outlier o, the array total is
	// 2*S + o (hint 1), so a candidate outlier c is potential exactly when
	// total - c is even and s = (total - c) / 2 occurs at another index —
	// two copies when s equals c (hint 2). Values are bounded (+/-1000,
	// n <= 10^5), so |total| <= 10^8 fits a machine int.
	total := 0
	count := make(map[int]int)
	for _, v := range nums {
		total += v
		count[v]++
	}
	best := -2000 // strictly below every legal value
	for _, c := range nums {
		rest := total - c
		if rest%2 != 0 {
			continue
		}
		s := rest / 2
		need := 1
		if s == c {
			need = 2
		}
		if count[s] >= need && c > best {
			best = c
		}
	}
	return best
}
