func kthSmallestPrimeFraction(arr []int, k int) []int {
	n := len(arr)
	lo, hi := 0.0, 1.0
	ans := []int{arr[0], arr[n-1]}
	// Binary search on the fraction value; count fractions <= mid.
	for it := 0; it < 50; it++ {
		mid := (lo + hi) / 2.0
		count := 0
		best := 0.0
		bestPair := []int{arr[0], arr[n-1]}
		j := 1
		for i := 0; i < n-1; i++ {
			for j < n && float64(arr[i]) > mid*float64(arr[j]) {
				j++
			}
			count += n - j
			if j < n {
				val := float64(arr[i]) / float64(arr[j])
				if val > best {
					best = val
					bestPair = []int{arr[i], arr[j]}
				}
			}
		}
		if count >= k {
			hi = mid
			ans = bestPair
		} else {
			lo = mid
		}
	}
	return ans
}
