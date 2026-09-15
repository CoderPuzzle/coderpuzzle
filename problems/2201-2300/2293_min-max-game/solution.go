func minMaxGame(nums []int) int {
	current := append([]int(nil), nums...)
	for len(current) > 1 {
		nextValues := make([]int, len(current)/2)
		for i := range nextValues {
			if i%2 == 0 {
				nextValues[i] = min(current[2*i], current[2*i+1])
			} else {
				nextValues[i] = max(current[2*i], current[2*i+1])
			}
		}
		current = nextValues
	}
	return current[0]
}
