func stableMountains(height []int, threshold int) []int {
	// Mountain i is stable exactly when its immediate predecessor is
	// strictly taller than the threshold; one left-to-right pass emits
	// the qualifying indices in ascending order.
	stable := []int{}
	for i := 1; i < len(height); i++ {
		if height[i-1] > threshold {
			stable = append(stable, i)
		}
	}
	return stable
}
