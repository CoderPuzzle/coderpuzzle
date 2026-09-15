func countPairs(nums []int, k int) int64 {
	var gcd func(a, b int64) int64
	gcd = func(a, b int64) int64 {
		if b == 0 {
			return a
		}
		return gcd(b, a%b)
	}

	k64 := int64(k)
	// Bucket by g = gcd(num, k): the gcd strips every factor of num
	// irrelevant to divisibility by k, and num_i * num_j is divisible by
	// k exactly when (gi * gj) % k == 0. Each g divides k, so there are at
	// most d(k) groups.
	counts := make(map[int64]int64)
	for _, num := range nums {
		counts[gcd(int64(num), k64)]++
	}

	var total int64
	gs := make([]int64, 0, len(counts))
	for g := range counts {
		gs = append(gs, g)
	}
	// Pair every two groups (a group with itself included).
	for i := 0; i < len(gs); i++ {
		for j := i; j < len(gs); j++ {
			if gs[i]*gs[j]%k64 != 0 {
				continue
			}
			if i == j {
				// Index pairs i < j inside one group: C(c, 2).
				c := counts[gs[i]]
				total += c * (c - 1) / 2
			} else {
				total += counts[gs[i]] * counts[gs[j]]
			}
		}
	}
	return total
}
