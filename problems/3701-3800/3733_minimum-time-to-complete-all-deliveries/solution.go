func minimumTime(d []int, r []int) int64 {
	// Least common multiple of the two recharge periods; dividing before
	// multiplying keeps the intermediate small.
	period := lcm(int64(r[0]), int64(r[1]))
	// fits grows with t, so halve down to the smallest feasible horizon;
	// twice the combined load always suffices since periods are >= 2.
	lo, hi := int64(1), 2*(int64(d[0])+int64(d[1]))
	for lo < hi {
		mid := lo + (hi-lo)/2
		if fits(mid, int64(d[0]), int64(d[1]), int64(r[0]), int64(r[1]), period) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

func fits(t, d0, d1, p1, p2, period int64) bool {
	// Hours each drone can work in: all t hours minus its recharge hours
	// (the multiples of its own period).
	c1 := t - t/p1
	c2 := t - t/p2
	// Hours open to at least one drone: everything except multiples of
	// both periods, which idle the two drones simultaneously.
	return d0 <= c1 && d1 <= c2 && d0+d1 <= t-t/period
}

func gcd(x, y int64) int64 {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func lcm(x, y int64) int64 {
	return x / gcd(x, y) * y
}
