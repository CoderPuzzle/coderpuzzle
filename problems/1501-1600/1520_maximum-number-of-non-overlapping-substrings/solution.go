import "sort"

// Anchor a candidate at every position that is the first occurrence of its
// character, then push `end` out to cover every character met along the
// way. The expansion is a fixed point: it stops the moment nothing inside
// [start, end] demands more room.
func maxNumOfSubstrings(s string) []string {
	n := len(s)
	first := make([]int, 26)
	last := make([]int, 26)
	for i := range first {
		first[i] = -1
	}
	for i := 0; i < n; i++ {
		c := int(s[i] - 'a')
		if first[c] == -1 {
			first[c] = i
		}
		last[c] = i
	}

	type rng struct{ start, end int }
	var candidates []rng
	for i := 0; i < n; i++ {
		c0 := int(s[i] - 'a')
		if first[c0] != i {
			continue
		}
		start, end := i, last[c0]
		valid := true
		for j := start; j <= end; j++ {
			c := int(s[j] - 'a')
			if first[c] < start {
				// This character escapes to the left of the anchor, so no
				// substring starting at i can ever be valid.
				valid = false
				break
			}
			if last[c] > end {
				end = last[c]
			}
		}
		if valid {
			candidates = append(candidates, rng{start, end})
		}
	}

	// Classic activity-selection greedy: earliest-ending candidate first,
	// ties broken by length so a shorter, nested candidate is preferred
	// over the longer one that contains it.
	sort.Slice(candidates, func(a, b int) bool {
		ra, rb := candidates[a], candidates[b]
		if ra.end != rb.end {
			return ra.end < rb.end
		}
		return (ra.end - ra.start) < (rb.end - rb.start)
	})

	result := []string{}
	prevEnd := -1
	for _, r := range candidates {
		if r.start > prevEnd {
			result = append(result, s[r.start:r.end+1])
			prevEnd = r.end
		}
	}
	return result
}
