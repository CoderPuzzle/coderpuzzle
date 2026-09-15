func maxScoreSightseeingPair(values []int) int {
	bestPrefix := values[0] // max of values[i] + i seen so far
	best := -1 << 31
	for j := 1; j < len(values); j++ {
		score := bestPrefix + values[j] - j
		if score > best {
			best = score
		}
		if values[j]+j > bestPrefix {
			bestPrefix = values[j] + j
		}
	}
	return best
}
