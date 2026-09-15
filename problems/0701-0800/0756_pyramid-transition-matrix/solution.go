func pyramidTransition(bottom string, allowed []string) bool {
	// For each ordered pair of letters, a bitmask of the letters that may
	// sit on it. A pair with no pattern is a dead end: mask 0.
	tops := make([]int, 26*26)
	for _, t := range allowed {
		tops[(t[0]-'A')*26+(t[1]-'A')] |= 1 << (t[2] - 'A')
	}
	rows := map[string]bool{bottom: true}
	width := len(bottom)
	for width > 1 {
		above := make(map[string]bool)
		for row := range rows {
			// Candidate letters per position of the row above; a zero
			// mask means this row cannot carry anything.
			masks := make([]int, 0, width-1)
			alive := true
			for i := 0; i+1 < width; i++ {
				mask := tops[(row[i]-'A')*26+(row[i+1]-'A')]
				if mask == 0 {
					alive = false
					break
				}
				masks = append(masks, mask)
			}
			if !alive {
				continue
			}
			// The state stays a whole concrete row: adjacent positions
			// above share the row below, so the letter at one position
			// constrains its neighbor. Enumerate the product of the
			// masks; the set dedups rows lifted from different parents.
			frontier := []string{""}
			for _, mask := range masks {
				lifted := make([]string, 0, len(frontier)*6)
				for _, r := range frontier {
					for d := 0; d < 6; d++ {
						if mask>>d&1 == 1 {
							lifted = append(lifted, r+string(rune('A'+d)))
						}
					}
				}
				frontier = lifted
			}
			for _, r := range frontier {
				above[r] = true
			}
		}
		if len(above) == 0 {
			return false
		}
		rows = above
		width--
	}
	return true
}
