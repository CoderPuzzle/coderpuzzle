import "sort"

func combinationSum2(candidates []int, target int) [][]int {
	// Sort in place: every emitted combination is ascending, and growing
	// combinations left to right emits them in lexicographic order.
	sort.Ints(candidates)
	combinations := [][]int{}
	current := []int{}
	// start moves past each picked index, so every candidate number is used
	// at most once.
	var backtrack func(start, remaining int)
	backtrack = func(start, remaining int) {
		if remaining == 0 {
			// Hit the target exactly: snapshot the current path.
			combination := make([]int, len(current))
			copy(combination, current)
			combinations = append(combinations, combination)
			return
		}
		for i := start; i < len(candidates); i++ {
			// A value equal to the one just abandoned at this depth would
			// rebuild the same combination, so skip runs of equal values.
			if i > start && candidates[i] == candidates[i-1] {
				continue
			}
			// Sorted order means the first value too large to fit ends the
			// loop: every later value is at least as large.
			if candidates[i] > remaining {
				break
			}
			current = append(current, candidates[i])
			// i + 1, not i: every candidate number may be used only once.
			backtrack(i+1, remaining-candidates[i])
			current = current[:len(current)-1]
		}
	}
	backtrack(0, target)
	return combinations
}
