func findKthSmallest(coins []int, k int) int64 {
	m := len(coins)

	minCoin := coins[0]
	for _, c := range coins {
		if c < minCoin {
			minCoin = c
		}
	}

	countLe := func(x int64) int64 {
		var total int64
		// inclusion-exclusion: each subset S contributes floor(x / lcm(S))
		for mask := 1; mask < 1<<m; mask++ {
			l := int64(1)
			bits := 0
			overflow := false
			for j := 0; j < m; j++ {
				if mask>>j&1 == 1 {
					g := gcdEuclid(l, int64(coins[j]))
					l = l / g * int64(coins[j])
					bits++
					// an lcm past x would only contribute 0; stop early
					if l > x {
						overflow = true
						break
					}
				}
			}
			if overflow {
				continue
			}
			// odd subsets add, even subtract, so duplicates count once
			if bits%2 == 1 {
				total += x / l
			} else {
				total -= x / l
			}
		}
		return total
	}

	// count(x) is monotone; the answer is the least x with count(x) >= k
	// (the k-th multiple of the smallest coin is a safe upper bound)
	lo, hi := int64(1), int64(k)*int64(minCoin)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if countLe(mid) >= int64(k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

func gcdEuclid(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
