import "math"

func minSpeedOnTime(dist []int, hour float64) int {
	n := len(dist)
	H := int64(math.Round(hour * 100)) // hour has at most two decimals
	last := 100 * int64(dist[n-1])

	onTime := func(speed int64) bool {
		// Every leg but the last must end on an integer hour (the next
		// train departs then), costing ceil(d/s); the final leg has no
		// successor and costs exactly d/s — compared here in hundredths.
		c := int64(0)
		for i := 0; i+1 < n; i++ {
			c += (int64(dist[i]) + speed - 1) / speed
		}
		budget := H - 100*c
		if budget < 0 {
			return false
		}
		return budget*speed >= last
	}

	// On-time is monotone in speed — if s works, every faster speed works —
	// so search for the smallest feasible s; 10^7 is the guaranteed
	// ceiling, and -1 if even it fails.
	lo, hi := int64(1), int64(10000000)
	if !onTime(hi) {
		return -1
	}
	for lo < hi {
		mid := (lo + hi) / 2
		if onTime(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}
