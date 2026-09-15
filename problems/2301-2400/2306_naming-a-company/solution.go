func distinctNames(ideas []string) int64 {
	// Suffixes (name minus first letter) grouped by first letter; within a
	// group every suffix is unique because all names are unique.
	suffixes := make([]map[string]bool, 26)
	for i := range suffixes {
		suffixes[i] = make(map[string]bool)
	}
	for _, idea := range ideas {
		suffixes[idea[0]-'a'][idea[1:]] = true
	}
	// A swap between letters a and b survives exactly when neither suffix
	// already exists in the other letter's group; inclusion-exclusion turns
	// that count into sizes minus the shared overlap. The answer can reach
	// ~n^2 ≈ 2.5 * 10^9, past int32 range, so the accumulator stays int64.
	var total int64
	for a := 0; a < 26; a++ {
		for b := a + 1; b < 26; b++ {
			var shared int64
			for suffix := range suffixes[a] {
				if suffixes[b][suffix] {
					shared++
				}
			}
			sizeA := int64(len(suffixes[a]))
			sizeB := int64(len(suffixes[b]))
			total += 2 * (sizeA - shared) * (sizeB - shared)
		}
	}
	return total
}
