func canConvertString(s string, t string, k int) bool {
	// equal length is guaranteed by the constraints
	if len(s) != len(t) {
		return false
	}
	// count how many positions need each shift amount d in 1..25
	var needCount [26]int
	for i := 0; i < len(s); i++ {
		d := (int(t[i]) - int(s[i]) + 26) % 26
		if d != 0 {
			needCount[d]++
		}
	}
	// the j-th position needing shift d must use move d + 26*(j-1)
	for d := 1; d < 26; d++ {
		count := needCount[d]
		if count == 0 {
			continue
		}
		lastMove := d + 26*(count-1)
		if lastMove > k {
			return false
		}
	}
	return true
}
