func soupServings(n int) float64 {
	// Round up to whole servings of 25 mL each.
	m := (n + 24) / 25
	if m >= 179 {
		return 1.0
	}

	table := make([][]float64, m+1)
	for a := range table {
		table[a] = make([]float64, m+1)
	}

	var value func(a, b int) float64
	value = func(a, b int) float64 {
		if a <= 0 && b <= 0 {
			return 0.5
		}
		if a <= 0 {
			return 1.0
		}
		if b <= 0 {
			return 0.0
		}
		return table[a][b]
	}

	for a := 1; a <= m; a++ {
		for b := 1; b <= m; b++ {
			table[a][b] = 0.25 * (value(a-4, b) +
				value(a-3, b-1) +
				value(a-2, b-2) +
				value(a-1, b-3))
		}
	}

	return value(m, m)
}
