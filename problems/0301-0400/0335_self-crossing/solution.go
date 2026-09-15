// A crossing shows up the moment it happens, and a new line can only reach
// lines three, four, or five moves back — so one forward scan with a
// three-case window on the last six distances decides.
func isSelfCrossing(distance []int) bool {
	d := distance
	for i := 3; i < len(d); i++ {
		// Fourth line crosses the line three back; touching counts.
		if d[i] >= d[i-2] && d[i-1] <= d[i-3] {
			return true
		}
		// Fourth line exactly touches the second; the fifth then
		// reaches back to meet or pass the first.
		if i >= 4 && d[i-1] == d[i-3] && d[i]+d[i-4] >= d[i-2] {
			return true
		}
		// Sixth line cuts inward far enough to close onto the first.
		if i >= 5 && d[i-2] >= d[i-4] && d[i-3] >= d[i-1] && d[i-1]+d[i-5] >= d[i-3] &&
			d[i] >= d[i-2]-d[i-4] {
			return true
		}
	}
	return false
}
