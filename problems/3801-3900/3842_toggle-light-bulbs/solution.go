// Toggle a fixed table indexed by bulb number; a bulb ends on exactly when
// it is toggled an odd number of times. Sweep indices 1..100 and collect
// the on positions — ascending order for free.
func toggleLightBulbs(bulbs []int) []int {
	on := make([]bool, 101)
	for _, value := range bulbs {
		on[value] = !on[value]
	}
	result := make([]int, 0, 100)
	for i := 1; i <= 100; i++ {
		if on[i] {
			result = append(result, i)
		}
	}
	return result
}
