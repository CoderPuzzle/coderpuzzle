func totalDistance(s string) int {
	// The keyboard is three ragged rows — qwertyuiop, asdfghjkl,
	// zxcvbnm — so recording each letter's (row, col) cell once turns
	// the answer into a running Manhattan sum: the finger starts on
	// 'a', and each typed letter adds |r1 - r2| + |c1 - c2| for the
	// move from the previous key.
	var row, col [26]int
	rows := []string{"qwertyuiop", "asdfghjkl", "zxcvbnm"}
	for r, keys := range rows {
		for c := 0; c < len(keys); c++ {
			row[keys[c]-'a'] = r
			col[keys[c]-'a'] = c
		}
	}
	total := 0
	pr, pc := row[0], col[0]
	for i := 0; i < len(s); i++ {
		idx := s[i] - 'a'
		total += abs(pr-row[idx]) + abs(pc-col[idx])
		pr, pc = row[idx], col[idx]
	}
	return total
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
