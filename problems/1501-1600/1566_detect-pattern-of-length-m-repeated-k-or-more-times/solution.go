func containsPattern(arr []int, m int, k int) bool {
	n := len(arr)
	// Not even one m-length block can repeat k times if there isn't room
	// for m * k elements.
	if n < m*k {
		return false
	}
	need := m * (k - 1)
	run := 0
	// arr[i] == arr[i-m] means position i continues whatever block started
	// m slots earlier; run counts how many positions in a row have done
	// that. Once run reaches m*(k-1) the block ending just before this run
	// has repeated k times back to back.
	for i := m; i < n; i++ {
		if arr[i] == arr[i-m] {
			run++
			if run == need {
				return true
			}
		} else {
			run = 0
		}
	}
	return false
}
