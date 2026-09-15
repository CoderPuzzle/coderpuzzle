func digitCount(num string) bool {
	// One counting pass fills a fixed ten-slot tally; every index then
	// checks the tally against the digit recorded there.
	counts := [10]int{}
	for index := 0; index < len(num); index++ {
		counts[num[index]-'0']++
	}
	for i := 0; i < len(num); i++ {
		if counts[i] != int(num[i]-'0') {
			return false
		}
	}
	return true
}
