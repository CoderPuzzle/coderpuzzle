// The gap x-num changes by exactly -2, 0, or +2 per operation, so t operations
// close at most 2*t units of gap. Driving x down while driving num up spends
// every step on the maximum closure rate of 2, meeting num when x started at
// num+2*t; "at most t" can never beat spending all t.
func theMaximumAchievableX(num int, t int) int {
	return num + 2*t
}
