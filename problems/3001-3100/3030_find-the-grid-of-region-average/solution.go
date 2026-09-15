// withinThreshold reports whether two neighbouring intensities differ by at
// most threshold.
func withinThreshold(a, b, threshold int) bool {
	d := a - b
	if d < 0 {
		d = -d
	}
	return d <= threshold
}

func resultGrid(image [][]int, threshold int) [][]int {
	m, n := len(image), len(image[0])
	if m < 3 || n < 3 {
		return image
	}
	// Fold the twelve adjacent-pair tests once: calmH[r][c] says row r is
	// horizontally calm across columns c..c+2, calmV[r][c] says column c is
	// vertically calm across rows r..r+2.
	calmH := make([][]bool, m)
	for r := range calmH {
		calmH[r] = make([]bool, n-2)
	}
	calmV := make([][]bool, m-2)
	for r := range calmV {
		calmV[r] = make([]bool, n)
	}
	for r := 0; r < m; r++ {
		for c := 0; c+2 < n; c++ {
			calmH[r][c] = withinThreshold(image[r][c], image[r][c+1], threshold) &&
				withinThreshold(image[r][c+1], image[r][c+2], threshold)
		}
	}
	for c := 0; c < n; c++ {
		for r := 0; r+2 < m; r++ {
			calmV[r][c] = withinThreshold(image[r][c], image[r+1][c], threshold) &&
				withinThreshold(image[r+1][c], image[r+2][c], threshold)
		}
	}
	// Prefix sums give each window's nine-cell total in constant time.
	pref := make([][]int, m+1)
	for r := range pref {
		pref[r] = make([]int, n+1)
	}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			pref[r+1][c+1] = pref[r][c+1] + pref[r+1][c] - pref[r][c] + image[r][c]
		}
	}
	sum := make([][]int, m)
	count := make([][]int, m)
	for r := range sum {
		sum[r] = make([]int, n)
		count[r] = make([]int, n)
	}
	for i := 0; i+2 < m; i++ {
		for j := 0; j+2 < n; j++ {
			if !calmH[i][j] || !calmH[i+1][j] || !calmH[i+2][j] {
				continue
			}
			if !calmV[i][j] || !calmV[i][j+1] || !calmV[i][j+2] {
				continue
			}
			avg := (pref[i+3][j+3] - pref[i][j+3] - pref[i+3][j] + pref[i][j]) / 9
			for r := i; r < i+3; r++ {
				for c := j; c < j+3; c++ {
					sum[r][c] += avg
					count[r][c]++
				}
			}
		}
	}
	result := make([][]int, m)
	for r := 0; r < m; r++ {
		result[r] = make([]int, n)
		for c := 0; c < n; c++ {
			if count[r][c] == 0 {
				result[r][c] = image[r][c]
			} else {
				result[r][c] = sum[r][c] / count[r][c]
			}
		}
	}
	return result
}
