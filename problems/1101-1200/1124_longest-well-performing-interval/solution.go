func longestWPI(hours []int) int {
	// earliest index each prefix value has been seen; {0: -1} lets intervals
	// starting at index 0 be handled uniformly
	first := map[int]int{0: -1}
	prefix := 0
	best := 0
	for i, hoursDay := range hours {
		// tiring day scores +1, other -1: a well-performing interval is
		// exactly a subarray whose sum is strictly positive
		if hoursDay > 8 {
			prefix += 1
		} else {
			prefix -= 1
		}
		if prefix > 0 {
			// the whole prefix hours[0..i] is already well-performing
			best = i + 1
		} else if j, ok := first[prefix-1]; ok {
			// cut just after the earliest prefix-1: the remainder sums to
			// exactly 1, and since steps are unit-sized no longer interval
			// can end at i
			if i-j > best {
				best = i - j
			}
		}
		if _, ok := first[prefix]; !ok {
			// record only the first sighting so stored indices stay leftmost
			first[prefix] = i
		}
	}
	return best
}
