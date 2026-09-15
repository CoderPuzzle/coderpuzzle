func wateringPlants(plants []int, capacity int) int {
	steps := len(plants)
	remaining := capacity
	for index, need := range plants {
		if remaining < need {
			steps += 2 * index
			remaining = capacity
		}
		remaining -= need
	}
	return steps
}
