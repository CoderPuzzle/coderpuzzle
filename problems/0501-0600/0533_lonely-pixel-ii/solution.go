import "strings"

// Rule 2 asks every row carrying a black pixel in column c to be an exact
// copy of row r, so rows only interact through their content: identical rows
// form a class keyed by the joined row string.
func findBlackPixel(picture [][]string, target int) int {
	m := len(picture)
	n := len(picture[0])
	classOfKey := make(map[string]int)
	classRowCount := make([]int, 0, 8)
	rowClass := make([]int, m)
	colCount := make([]int, n)
	for i := 0; i < m; i++ {
		key := strings.Join(picture[i], "")
		if _, ok := classOfKey[key]; !ok {
			classOfKey[key] = len(classRowCount)
			classRowCount = append(classRowCount, countBlacks(picture[i]))
		}
		rowClass[i] = classOfKey[key]
		for j := 0; j < n; j++ {
			if picture[i][j] == "B" {
				colCount[j]++
			}
		}
	}
	// blacks[j][k]: how many black cells column j carries from class k.
	blacks := make([][]int, n)
	for j := range blacks {
		blacks[j] = make([]int, len(classRowCount))
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if picture[i][j] == "B" {
				blacks[j][rowClass[i]]++
			}
		}
	}
	// A column pays out exactly target pixels when its target blacks all come
	// from one class (rule 2) whose rows hold target blacks (rule 1).
	total := 0
	for j := 0; j < n; j++ {
		if colCount[j] != target {
			continue
		}
		for k := range classRowCount {
			if blacks[j][k] == target && classRowCount[k] == target {
				total += target
			}
		}
	}
	return total
}

func countBlacks(row []string) int {
	blacks := 0
	for _, cell := range row {
		if cell == "B" {
			blacks++
		}
	}
	return blacks
}
