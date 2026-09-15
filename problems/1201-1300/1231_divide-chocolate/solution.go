func maximizeSweetness(sweetness []int, k int) int {
	total := 0
	for _, value := range sweetness {
		total += value
	}

	// Binary search on the answer t: "can we get k+1 pieces each of
	// sweetness >= t?" is monotone in t. The average piece caps the range
	// above; every chunk is positive so t = 1 is always feasible.
	lo, hi := 1, total/(k+1)
	best := 0
	for lo <= hi {
		mid := (lo + hi) / 2
		if piecesAtLeast(sweetness, mid) >= k+1 {
			// At least k+1 pieces: merging surplus neighbours only raises
			// their sums, so t is feasible — record it and aim higher.
			best = mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return best
}

func piecesAtLeast(sweetness []int, target int) int {
	// Greedy check: cut as soon as the running sum reaches the target.
	// Cutting earlier never hurts — a delay only feeds an already-satisfied
	// piece and leaves less material for the remaining ones.
	count := 0
	current := 0
	for _, value := range sweetness {
		current += value
		if current >= target {
			count++
			current = 0
		}
	}
	return count
}
