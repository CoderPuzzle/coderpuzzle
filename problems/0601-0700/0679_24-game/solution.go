// Backtracking over the multiset of remaining values. Any expression tree
// evaluates bottom-up by combining two siblings at a time, so taking each
// unordered pair, applying every operator (both orders for '-' and '/'),
// and recursing on the shorter slice explores every expression exactly.
// Real division makes exact equality untestable in floating point, so a
// lone remaining value wins when it sits within EPS of 24.
func judgePoint24(cards []int) bool {
	values := make([]float64, len(cards))
	for index, card := range cards {
		values[index] = float64(card)
	}
	return solve(values)
}

func solve(values []float64) bool {
	if len(values) == 1 {
		return math.Abs(values[0]-24.0) < 1e-6
	}
	n := len(values)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			a, b := values[i], values[j]
			rest := make([]float64, 0, n-1)
			for k, value := range values {
				if k != i && k != j {
					rest = append(rest, value)
				}
			}
			results := []float64{a + b, a - b, b - a, a * b}
			if b != 0 {
				results = append(results, a/b)
			}
			if a != 0 {
				results = append(results, b/a)
			}
			for _, result := range results {
				// rest has spare capacity, so every append writes the
				// same slot and siblings cannot see each other.
				if solve(append(rest, result)) {
					return true
				}
			}
		}
	}
	return false
}
