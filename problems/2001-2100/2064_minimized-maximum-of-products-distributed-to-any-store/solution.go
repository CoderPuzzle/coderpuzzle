func minimizedMaximum(n int, quantities []int) int {
	// A store holds one product type only, so a type with q items needs
	// ceil(q/x) stores; integer arithmetic avoids floats.
	storesNeeded := func(x int) int {
		total := 0
		for _, q := range quantities {
			total += (q + x - 1) / x
		}
		return total
	}

	// Feasibility is monotone in the cap x, so binary-search the smallest
	// feasible one. hi = max(quantities) is always feasible (one store can
	// take an entire product type).
	lo := 1
	hi := quantities[0]
	for _, q := range quantities {
		if q > hi {
			hi = q
		}
	}
	// Invariant: lo possibly too small, hi known feasible; the sum check
	// uses <= n since leftover stores may receive nothing.
	for lo < hi {
		mid := lo + (hi-lo)/2
		if storesNeeded(mid) <= n {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
