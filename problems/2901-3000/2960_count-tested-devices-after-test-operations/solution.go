// Each earlier test subtracts exactly 1 from every not-yet-tested device
// (floored at zero — exactly the "no longer testable" case), so when the
// scan reaches device i its live percentage is the original value minus the
// number of tests performed so far. The device is tested iff that original
// value still exceeds the count, which reproduces the suffix-updating
// simulation with a counter.
func countTestedDevices(batteryPercentages []int) int {
	tested := 0
	for _, percent := range batteryPercentages {
		if percent > tested {
			tested++
		}
	}
	return tested
}
