// Difference array over rotations: each element earns its point on a
// contiguous range of k, so per-element +1/-1 marks and one prefix pass
// rebuild every rotation's score without rotating anything.
func bestRotation(nums []int) int {
	n := len(nums)
	diff := make([]int, n+1)
	for i, v := range nums {
		if v <= i {
			// Scores at k in [0, i-v] and again at every k past i.
			diff[0]++
			diff[i-v+1]--
			if i+1 < n {
				diff[i+1]++
			}
		} else {
			// Scores only after wrapping, at k in [i+1, i+n-v].
			diff[i+1]++
			diff[i+n-v+1]--
		}
	}
	bestK, best, score := 0, -1, 0
	for k := 0; k < n; k++ {
		score += diff[k]
		// Strict > keeps the earliest k on ties, which the problem demands.
		if score > best {
			best, bestK = score, k
		}
	}
	return bestK
}
