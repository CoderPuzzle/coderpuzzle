// Columns outer, rows inner produces exactly the required order.
func cellsInRange(s string) []string {
	out := []string{}
	for col := s[0]; col <= s[3]; col++ {
		for row := s[1]; row <= s[4]; row++ {
			out = append(out, string([]byte{col, row}))
		}
	}
	return out
}
