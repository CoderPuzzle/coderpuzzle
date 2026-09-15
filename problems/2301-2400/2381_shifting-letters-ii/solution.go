func shiftingLetters(s string, shifts [][]int) string {
	n := len(s)
	// Shifts commute, so only the net shift per position matters.
	// Extra slot at n keeps every end+1 marker in bounds.
	diff := make([]int, n+1)
	for _, sh := range shifts {
		delta := 1
		if sh[2] != 1 {
			delta = -1
		}
		// +delta at start, -delta just past end: an O(1) range update.
		diff[sh[0]] += delta
		diff[sh[1]+1] -= delta
	}
	chars := make([]byte, 0, n)
	shift := 0
	for i := 0; i < n; i++ {
		// Prefix sum yields the net shift; double % keeps it in [0, 26)
		// even when negative (backward shifts, wrap before 'a').
		shift += diff[i]
		c := int(s[i]-'a') + shift
		chars = append(chars, byte('a'+((c%26+26)%26)))
	}
	return string(chars)
}
