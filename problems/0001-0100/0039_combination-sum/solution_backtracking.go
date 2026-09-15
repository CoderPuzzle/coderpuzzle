func combinationSum(candidates []int, target int) [][]int {
	results := [][]int{}
	path := []int{}

	var backtrack func(start, remaining int)
	backtrack = func(start, remaining int) {
		// remaining = target minus the sum of the path so far; when it hits 0
		// the path is a valid combination, so record a copy before it mutates.
		if remaining == 0 {
			comb := make([]int, len(path))
			copy(comb, path)
			results = append(results, comb)
			return
		}
		// Loop from start onward: everything before start stays forbidden.
		for i := start; i < len(candidates); i++ {
			value := candidates[i]
			// Oversized candidate: let the branch die now rather than one
			// layer deeper. A skip, not a break, since input is unsorted.
			if value > remaining {
				continue
			}
			path = append(path, value)
			// Recurse with i, not i+1: a candidate may be reused without
			// limit. This pins every combination to nondecreasing candidate
			// order, so (2, 3, 2) can never form while (2, 2, 3) is found once.
			backtrack(i, remaining-value)
			path = path[:len(path)-1]
		}
	}

	backtrack(0, target)
	return results
}
