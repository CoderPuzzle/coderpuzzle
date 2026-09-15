func fixedPoint(arr []int) int {
	for i := range arr {
		if arr[i] == i {
			return i
		}
	}
	return -1
}
