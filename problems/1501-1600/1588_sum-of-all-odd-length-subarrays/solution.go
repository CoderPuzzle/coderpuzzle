func sumOddLengthSubarrays(arr []int) int {
	// For each index i, left = i + 1 choices for the subarray's start and
	// right = n - i choices for its end; among those left * right
	// subarrays through i, exactly ceil(left * right / 2) have odd
	// length. Sum arr[i] times that count over every index.
	n := len(arr)
	total := 0
	for i, value := range arr {
		left := i + 1
		right := n - i
		oddCount := (left*right + 1) / 2
		total += value * oddCount
	}
	return total
}
