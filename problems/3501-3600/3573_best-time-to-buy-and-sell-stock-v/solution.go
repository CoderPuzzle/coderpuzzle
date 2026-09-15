// Per-day DP over the count t of completed transactions: done[t] = flat,
// openLong[t] = holding a bought share, openShort[t] = holding a shorted
// share. NEG marks impossible states.
func maximumProfit(prices []int, k int) int64 {
	const NEG = -1_000_000_000_000_000
	done := make([]int64, k+1)
	openLong := make([]int64, k+1)
	openShort := make([]int64, k+1)
	for t := range done {
		done[t] = NEG
		openLong[t] = NEG
		openShort[t] = NEG
	}
	done[0] = 0
	for _, price := range prices {
		p := int64(price)
		// Closes today complete transaction t+1 from an open position.
		nd := append([]int64(nil), done...)
		for t := 0; t < k; t++ {
			candidate := openLong[t] + p
			if s := openShort[t] - p; s > candidate {
				candidate = s
			}
			if done[t+1] > candidate {
				candidate = done[t+1]
			}
			nd[t+1] = candidate
		}
		// Opens read done[t] from BEFORE today's closes: a close and the
		// next open can never share a day (and an open can never close
		// the same day, since closes read the old open row).
		nl := append([]int64(nil), openLong...)
		ns := append([]int64(nil), openShort...)
		for t := 0; t <= k; t++ {
			if v := done[t] - p; v > nl[t] {
				nl[t] = v
			}
			if v := done[t] + p; v > ns[t] {
				ns[t] = v
			}
		}
		done, openLong, openShort = nd, nl, ns
	}
	best := int64(NEG)
	for _, v := range done {
		if v > best {
			best = v
		}
	}
	return best
}
