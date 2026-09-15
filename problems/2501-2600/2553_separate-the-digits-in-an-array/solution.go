func separateDigits(nums []int) []int {
	// Strip each value's digits by division into a small buffer and flush
	// it reversed: numbers keep their reading order while digits lift
	// low-first. Values reach 10^5, so a six-slot buffer suffices.
	out := make([]int, 0, len(nums)*6)
	buf := make([]int, 6)
	for _, x := range nums {
		t := 0
		for v := x; v > 0; v /= 10 {
			buf[t] = v % 10
			t++
		}
		for t > 0 {
			t--
			out = append(out, buf[t])
		}
	}
	return out
}
