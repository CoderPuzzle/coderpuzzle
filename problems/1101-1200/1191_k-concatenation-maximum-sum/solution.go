func kConcatenationMaxSum(arr []int, k int) int {
	const MOD = 1000000007

	total := 0
	for _, value := range arr {
		total += value
	}

	kadane := func(copies int) int {
		best := 0
		current := 0
		for c := 0; c < copies; c++ {
			for _, value := range arr {
				current += value
				// clamped at 0: the empty subarray is always an option
				if current < 0 {
					current = 0
				}
				if current > best {
					best = current
				}
			}
		}
		return best
	}

	maxPrefix := func() int {
		best := 0
		current := 0
		for _, value := range arr {
			current += value
			if current > best {
				best = current
			}
		}
		return best
	}

	maxSuffix := func() int {
		best := 0
		current := 0
		for i := len(arr) - 1; i >= 0; i-- {
			current += arr[i]
			if current > best {
				best = current
			}
		}
		return best
	}

	// the best subarray never needs more than two partial copies plus
	// whole copies in between, so Kadane over two copies plus prefix
	// and suffix sums cover every candidate
	if k == 1 {
		return kadane(1) % MOD
	}
	// two adjacent copies cover every boundary-hugging candidate
	best := kadane(2)
	if k > 2 && total > 0 {
		// whole middle copies pay off only when total > 0: score the
		// best suffix + best prefix + (k-2) full copies
		candidate := maxSuffix() + maxPrefix() + (k-2)*total
		if candidate > best {
			best = candidate
		}
	}
	// reduce only at the end — residues no longer compare by magnitude
	return best % MOD
}
