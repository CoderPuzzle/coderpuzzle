func minInitialStrength(monsters []int, boosts [][]int) int64 {
	n := len(monsters)
	delta := make([]int64, n+1)
	for _, boost := range boosts {
		delta[boost[0]] += int64(boost[2])
		delta[boost[1]+1] -= int64(boost[2])
	}

	bonus := int64(0)
	prefix := int64(0)
	answer := int64(0)
	for i := 0; i < n; i++ {
		bonus += delta[i]
		if needed := int64(monsters[i]) - bonus; needed > 0 {
			if candidate := prefix + needed; candidate > answer {
				answer = candidate
			}
		}
		prefix += int64(monsters[i])
	}
	return answer
}
