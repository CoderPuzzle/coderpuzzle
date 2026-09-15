import "sort"

func maxCaloriesBurnt(heights []int) int64 {
	// Sorted extremes alternate through the routine: the largest
	// remaining height takes each even index (descending), the smallest
	// takes each odd index (ascending), so every edge spans the widest
	// gap available and the first jump claims the tallest block.
	s := make([]int, len(heights))
	copy(s, heights)
	sort.Ints(s)
	n := len(s)
	arr := make([]int, n)
	lo, hi := 0, n-1
	for index := 0; index < n; index++ {
		if index%2 == 0 {
			arr[index] = s[hi]
			hi--
		} else {
			arr[index] = s[lo]
			lo++
		}
	}
	// Squared gaps reach ~10^10 and totals approach 10^15: widen to
	// int64 before multiplying, an int square overflows at once.
	total := int64(arr[0]) * int64(arr[0])
	for index := 1; index < n; index++ {
		gap := int64(arr[index-1]) - int64(arr[index])
		total += gap * gap
	}
	return total
}
