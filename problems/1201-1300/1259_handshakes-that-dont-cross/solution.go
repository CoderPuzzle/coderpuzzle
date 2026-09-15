func numberOfWays(numPeople int) int {
	const MOD = 1000000007
	m := numPeople / 2
	// catalan[i] = non-crossing handshake layouts for i pairs; an empty
	// circle has exactly one layout, anchoring the recurrence.
	catalan := make([]int64, m+1)
	catalan[0] = 1
	for i := 1; i <= m; i++ {
		var total int64
		// Fix person 1 and sum over their partner: the chord splits the
		// circle into two arcs filled independently (anything crossing
		// between arcs would cross the pivot chord). Partner j leaves
		// j pairs on one side and i-1-j on the other — the Catalan
		// recurrence catalan[i] = Σ catalan[j]·catalan[i-1-j].
		for j := 0; j < i; j++ {
			total = (total + catalan[j]*catalan[i-1-j]) % MOD
		}
		catalan[i] = total
	}
	return int(catalan[m])
}
