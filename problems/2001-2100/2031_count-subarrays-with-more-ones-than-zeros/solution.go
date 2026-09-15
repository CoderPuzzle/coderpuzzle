func subarraysWithMoreOnesThanZeroes(nums []int) int {
	const mod int64 = 1000000007
	size := 2*len(nums) + 3
	offset := len(nums) + 1
	bit := make([]int, size)

	add := func(index int) {
		for index < size {
			bit[index]++
			index += index & -index
		}
	}
	query := func(index int) int {
		total := 0
		for index > 0 {
			total += bit[index]
			index -= index & -index
		}
		return total
	}

	add(offset)
	prefix := 0
	var answer int64
	for _, value := range nums {
		if value == 1 {
			prefix++
		} else {
			prefix--
		}
		index := prefix + offset
		answer = (answer + int64(query(index-1))) % mod
		add(index)
	}
	return int(answer)
}
