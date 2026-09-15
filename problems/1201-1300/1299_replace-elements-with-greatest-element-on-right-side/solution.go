func replaceElements(arr []int) []int {
	// Sweep right to left: answer[i] is the max seen strictly right of i,
	// which the running maximum holds before arr[i] joins it.
	answer := make([]int, len(arr))
	for i := range answer {
		answer[i] = -1
	}
	runningMax := -1
	for i := len(arr) - 1; i >= 0; i-- {
		answer[i] = runningMax
		if arr[i] > runningMax {
			runningMax = arr[i]
		}
	}
	return answer
}
