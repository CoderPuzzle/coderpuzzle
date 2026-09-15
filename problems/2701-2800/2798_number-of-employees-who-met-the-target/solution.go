// One pass bumps a counter whenever hours[i] >= target; "at least" makes
// equal-to-target count, which is what Example 1 pins down.
func numberOfEmployeesWhoMetTarget(hours []int, target int) int {
	met := 0
	for _, worked := range hours {
		if worked >= target {
			met++
		}
	}
	return met
}
