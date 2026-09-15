func getSmallestString(s string, k int) string {
	// Greedy per position: the smallest feasible letter is 'a' when its
	// cyclic distance still fits the budget; otherwise every smaller
	// letter is out of reach and exactly `budget` steps down from s[i]
	// is the first affordable letter.
	result := make([]byte, 0, len(s))
	budget := k
	for i := 0; i < len(s); i++ {
		ch := s[i]
		step := int(ch - 'a')
		toA := step
		if 26-step < toA {
			toA = 26 - step
		}
		if toA <= budget {
			result = append(result, 'a')
			budget -= toA
		} else {
			result = append(result, ch-byte(budget))
			budget = 0
		}
	}
	return string(result)
}
