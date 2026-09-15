func numberOfStableArrays(zero int, one int, limit int) int64 {
	// Bottom-up block DP: dp[z][o][d] counts stable arrays ending with
	// digit d; appending a block of the opposite digit sums the trailing
	// `limit` cells along one axis. Residues stay under 2^31 and window
	// totals under 1000 * MOD < 2^50, exact in int64 arithmetic.
	const MOD = 1000000007
	w := one + 1
	vert := make([]int64, w)
	prevOnes := make([]int64, w)
	history := make([][]int64, zero)
	var answer int64
	for z := 0; z <= zero; z++ {
		for o := 0; o < w; o++ {
			vert[o] += prevOnes[o]
		}
		if drop := z - 1 - limit; drop >= 0 {
			gone := history[drop]
			for o := 0; o < w; o++ {
				vert[o] -= gone[o]
			}
		}
		curZeros := make([]int64, w)
		if z >= 1 && z <= limit {
			curZeros[0] = 1
		}
		curOnes := make([]int64, w)
		// Circular ring buffer over this row's zero cells, seeded with the
		// column-0 base cell so windows reach down to index 0.
		ring := make([]int64, limit)
		head, tail := 1%limit, 0
		count := 1
		ringSum := curZeros[0]
		ring[0] = curZeros[0]
		for o := 1; o <= one; o++ {
			curZeros[o] = vert[o] % MOD
			curOnes[o] = ringSum % MOD
			if count == limit {
				ringSum -= ring[tail]
				tail++
				if tail == limit {
					tail = 0
				}
				count--
			}
			ring[head] = curZeros[o]
			head++
			if head == limit {
				head = 0
			}
			count++
			ringSum += curZeros[o]
		}
		if z == 0 {
			// Row z == 0 holds the all-ones prefixes themselves.
			for o := 1; o <= one; o++ {
				if o <= limit {
					curOnes[o] = 1
				}
			}
		}
		answer = (curZeros[one] + curOnes[one]) % MOD
		if z < zero {
			history[z] = curOnes
		}
		prevOnes = curOnes
	}
	return answer
}
