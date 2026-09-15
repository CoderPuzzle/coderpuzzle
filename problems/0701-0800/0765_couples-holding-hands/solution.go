func minSwapsCouples(row []int) int {
	arr := make([]int, len(row))
	copy(arr, row)
	n := len(arr)
	pos := make([]int, n)
	for i, person := range arr {
		pos[person] = i
	}

	swaps := 0
	for i := 0; i < n; i += 2 {
		first := arr[i]
		partner := first ^ 1 // couples are (0,1), (2,3), ...
		if arr[i+1] == partner {
			continue
		}
		j := pos[partner]
		other := arr[i+1]
		arr[i+1] = partner
		arr[j] = other
		pos[partner] = i + 1
		pos[other] = j
		swaps++
	}
	return swaps
}
