import "sort"

func checkIfCanBreak(s1 string, s2 string) bool {
	a := []byte(s1)
	b := []byte(s2)
	sort.Slice(a, func(i, j int) bool { return a[i] < a[j] })
	sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
	return dominates(a, b) || dominates(b, a)
}

func dominates(x []byte, y []byte) bool {
	for i := range x {
		if x[i] < y[i] {
			return false
		}
	}
	return true
}
