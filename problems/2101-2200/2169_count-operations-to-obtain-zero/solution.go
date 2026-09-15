// Straight simulation: the larger value loses a copy of the smaller each
// round, so the pair strictly shrinks and zero arrives quickly.
func countOperations(num1 int, num2 int) int {
	operations := 0
	for num1 != 0 && num2 != 0 {
		if num1 >= num2 {
			num1 -= num2
		} else {
			num2 -= num1
		}
		operations++
	}
	return operations
}
