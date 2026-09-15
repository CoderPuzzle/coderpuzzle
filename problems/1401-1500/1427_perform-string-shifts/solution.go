func stringShift(s string, shift [][]int) string {
	net := 0
	for _, operation := range shift {
		if operation[0] == 0 {
			net += operation[1]
		} else {
			net -= operation[1]
		}
	}
	n := len(s)
	k := ((net % n) + n) % n
	return s[k:] + s[:k]
}
