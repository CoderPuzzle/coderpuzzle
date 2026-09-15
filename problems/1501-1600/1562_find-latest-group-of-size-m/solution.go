func findLatestStep(arr []int, m int) int {
	n := len(arr)
	// length[p] is meaningful only at the two ends of a 1-group: the
	// length of that group. Interior positions go stale once a group
	// grows past them, and are never read again.
	length := make([]int, n+2)
	// count[k] = how many groups currently have length exactly k.
	count := make([]int, n+1)
	ans := -1

	for step := 1; step <= n; step++ {
		pos := arr[step-1]
		left := length[pos-1]
		right := length[pos+1]
		newLen := left + right + 1
		length[pos-left] = newLen
		length[pos+right] = newLen
		if left > 0 {
			count[left]--
		}
		if right > 0 {
			count[right]--
		}
		count[newLen]++
		if count[m] > 0 {
			ans = step
		}
	}

	return ans
}
