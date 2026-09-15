func averageValue(nums []int) int {
	// Divisible by 2 and by 3 means divisible by 6 (hint 2). Sum the
	// multiples of 6, count them, and floor-divide; with none present
	// return 0 as the statement asks.
	total, count := 0, 0
	for _, value := range nums {
		if value%6 == 0 {
			total += value
			count++
		}
	}
	if count == 0 {
		return 0
	}
	return total / count
}
