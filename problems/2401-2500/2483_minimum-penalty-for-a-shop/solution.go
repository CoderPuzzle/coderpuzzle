func bestClosingTime(customers string) int {
	// penalty at closing hour j = (#'N' in customers[:j]) + (#'Y' in customers[j:])
	prefixN := 0
	suffixY := 0
	for i := 0; i < len(customers); i++ {
		if customers[i] == 'Y' {
			suffixY++
		}
	}
	bestJ := 0
	bestPenalty := prefixN + suffixY
	for j := 1; j <= len(customers); j++ {
		if customers[j-1] == 'N' {
			prefixN++
		} else {
			suffixY--
		}
		penalty := prefixN + suffixY
		if penalty < bestPenalty {
			bestPenalty = penalty
			bestJ = j
		}
	}
	return bestJ
}
