func duplicateZeros(arr []int) []int {
	// Two-pointer write from the end: every element is written to a
	// position at or to the right of its source, so no unread value is ever
	// overwritten. i reads the original array, j writes into the extended
	// one; writes with j beyond the real length fall off.
	n := len(arr)
	zeros := 0
	for _, v := range arr {
		if v == 0 {
			zeros++
		}
	}
	i := n - 1
	j := n + zeros - 1
	for i >= 0 {
		if j < n {
			arr[j] = arr[i]
		}
		j--
		if arr[i] == 0 {
			if j < n {
				arr[j] = 0
			}
			j--
		}
		i--
	}
	return arr
}
