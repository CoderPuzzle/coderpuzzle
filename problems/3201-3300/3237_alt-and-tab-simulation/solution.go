// The final stack lists windows by their most recent last touch, with
// never-queried windows keeping their original order below. Reading the
// queries backwards and appending each window not yet appended emits
// exactly that: last touches newest-first, earlier presses skipped because
// only the final press sets a window's height. The second pass over
// windows appends the untouched rest in its original order.
func simulationResult(windows []int, queries []int) []int {
	seen := make([]bool, len(windows)+1)
	result := make([]int, 0, len(windows))
	for i := len(queries) - 1; i >= 0; i-- {
		if query := queries[i]; !seen[query] {
			seen[query] = true
			result = append(result, query)
		}
	}
	for _, window := range windows {
		if !seen[window] {
			seen[window] = true
			result = append(result, window)
		}
	}
	return result
}
