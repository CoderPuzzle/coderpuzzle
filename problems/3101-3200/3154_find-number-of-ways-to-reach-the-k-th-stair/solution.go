func waysToReachStair(k int) int64 {
	// With x up-ops the top height is 2^x, so ending on stair k takes
	// y = 2^x - k down-ops; they must sit in distinct gaps among the
	// x + 1 slots around the ups, giving C(x + 1, y) orderings. The loop
	// runs at most ~31 times because overshoot grows past every budget.
	var total int64
	for ups := 0; ; ups++ {
		downs := 1<<uint(ups) - k
		if downs > ups+1 {
			break
		}
		if downs >= 0 {
			ways := int64(1)
			for i := 0; i < downs; i++ {
				ways = ways * int64(ups+1-i) / int64(i+1)
			}
			total += ways
		}
	}
	return total
}
