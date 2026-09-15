func missingNumber(arr []int) int {
	// Endpoints survive, so the full progression had len(arr)+1 terms from
	// arr[0] to arr[-1]; the gap between its Gauss sum and the surviving
	// sum is the removed value.
	n := len(arr)
	full := (arr[0] + arr[n-1]) * (n + 1) / 2
	sum := 0
	for _, value := range arr {
		sum += value
	}
	return full - sum
}
