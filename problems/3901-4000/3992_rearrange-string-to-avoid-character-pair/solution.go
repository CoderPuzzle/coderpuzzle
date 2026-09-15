import "sort"

func rearrangeString(s string, x string, y string) string {
	letters := []rune(s)
	sort.Slice(letters, func(i int, j int) bool { return letters[i] < letters[j] })
	if x[0] < y[0] { // groups equal letters; reverse puts the y block first
		for i, j := 0, len(letters)-1; i < j; i, j = i+1, j-1 {
			letters[i], letters[j] = letters[j], letters[i]
		}
	}
	return string(letters)
}
