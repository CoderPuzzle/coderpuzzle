func getMaxFunctionValue(receiver []int, k int64) int64 {
	n := len(receiver)
	log := 0
	for tmp := k; tmp > 0; tmp >>= 1 {
		log++
	}
	up := make([][]int, log)
	sm := make([][]int64, log)
	for j := range up {
		up[j] = make([]int, n)
		sm[j] = make([]int64, n)
	}
	for x := 0; x < n; x++ {
		up[0][x] = receiver[x]
		sm[0][x] = int64(receiver[x])
	}
	// Binary lifting: up[j][x] is the holder after 2^j passes from x,
	// sm[j][x] the sum of receivers during them. Each level composes two
	// half-jumps; the sum adds sm at x plus sm at the midpoint because the
	// second jump's receivers start where the first lands.
	for j := 1; j < log; j++ {
		for x := 0; x < n; x++ {
			mid := up[j-1][x]
			up[j][x] = up[j-1][mid]
			sm[j][x] = sm[j-1][x] + sm[j-1][mid]
		}
	}
	var best int64
	for x := 0; x < n; x++ {
		// x itself counts in the score but appears in no receiving sum.
		// Decompose k into set bits: each set bit b contributes sm[b][cur]
		// and teleports cur, simulating k <= 1e10 passes in log k steps.
		total := int64(x)
		cur := x
		remaining := k
		bit := 0
		for remaining > 0 {
			if remaining&1 == 1 {
				total += sm[bit][cur]
				cur = up[bit][cur]
			}
			remaining >>= 1
			bit++
		}
		if total > best {
			best = total
		}
	}
	return best
}
