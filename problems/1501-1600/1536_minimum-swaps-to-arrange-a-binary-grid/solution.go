func minSwaps(grid [][]int) int {
	n := len(grid)
	trailingZeros := func(row []int) int {
		count := 0
		for i := len(row) - 1; i >= 0; i-- {
			if row[i] != 0 {
				break
			}
			count++
		}
		return count
	}

	zeros := make([]int, n)
	for i, row := range grid {
		zeros[i] = trailingZeros(row)
	}

	swaps := 0
	for i := 0; i < n; i++ {
		needed := n - i - 1
		if zeros[i] >= needed {
			continue
		}
		j := i + 1
		for j < n && zeros[j] < needed {
			j++
		}
		if j == n {
			return -1
		}
		for j > i {
			zeros[j], zeros[j-1] = zeros[j-1], zeros[j]
			j--
			swaps++
		}
	}
	return swaps
}
