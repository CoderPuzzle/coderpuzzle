func maxFrequencyScore(nums []int, k int) int {
	const MOD = 1_000_000_007
	// Residues are below 2^30, so products fit in int64 before the %.
	qpow := func(base, exp int64) int64 {
		result := int64(1)
		for exp > 0 {
			if exp&1 == 1 {
				result = result * base % MOD
			}
			base = base * base % MOD
			exp >>= 1
		}
		return result
	}
	// Sliding window maintaining the score as the sum of per-value power
	// terms; a slide replaces only the entering and leaving values'
	// terms, which is O(log MOD) per step. The +MOD re-normalizes after
	// each potentially negative subtraction.
	counts := map[int]int{}
	terms := map[int]int64{}
	score, best := int64(0), int64(0)
	for i := 0; i < len(nums); i++ {
		value := nums[i]
		counts[value]++
		c := counts[value]
		term := qpow(int64(value), int64(c))
		score = (score + term - terms[value] + MOD) % MOD
		terms[value] = term
		if i >= k {
			leaving := nums[i-k]
			counts[leaving]--
			lc := counts[leaving]
			if lc == 0 {
				// the leaving value exits entirely; its term vanishes
				score = (score - terms[leaving] + MOD) % MOD
				delete(terms, leaving)
			} else {
				lt := qpow(int64(leaving), int64(lc))
				score = (score + lt - terms[leaving] + MOD) % MOD
				terms[leaving] = lt
			}
		}
		if i >= k-1 && score > best {
			best = score
		}
	}
	return int(best)
}
