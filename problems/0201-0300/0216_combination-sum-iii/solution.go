func combinationSum3(k int, n int) [][]int {
	// Trying digits in ascending order from a rising start floor makes every
	// combination ascending and the whole list lexicographic.
	combinations := [][]int{}
	current := []int{}
	// start moves past each picked digit, so each number 1 through 9 is used
	// at most once.
	var backtrack func(start, slots, remaining int)
	backtrack = func(start, slots, remaining int) {
		if slots == 0 {
			// k digits chosen: valid only when they sum to n exactly.
			if remaining == 0 {
				combination := make([]int, len(current))
				copy(combination, current)
				combinations = append(combinations, combination)
			}
			return
		}
		// A digit must leave slots - 1 larger digits behind, which caps it
		// at 10 - slots.
		for digit := start; digit <= 10-slots; digit++ {
			// Digits grow across the loop, so the first one that overshoots
			// the remaining budget ends the loop.
			if digit > remaining {
				break
			}
			current = append(current, digit)
			backtrack(digit+1, slots-1, remaining-digit)
			current = current[:len(current)-1]
		}
	}
	backtrack(1, k, n)
	return combinations
}
