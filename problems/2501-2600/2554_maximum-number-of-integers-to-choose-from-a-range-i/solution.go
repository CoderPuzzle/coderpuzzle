func maxCount(banned []int, n int, maxSum int) int {
	// Greedy ascending: the cheapest remaining legal integer always leaves
	// at least as much slack as any alternative, so walking 1..n and
	// taking values while the running sum fits is optimal. Bans outside
	// [1, n] are ignored; the sum stays <= maxSum <= 10^9, inside int.
	isBanned := make([]bool, n+1)
	for _, x := range banned {
		if x <= n {
			isBanned[x] = true
		}
	}
	count := 0
	total := 0
	for v := 1; v <= n; v++ {
		if isBanned[v] {
			continue
		}
		if total+v > maxSum {
			break
		}
		total += v
		count++
	}
	return count
}
