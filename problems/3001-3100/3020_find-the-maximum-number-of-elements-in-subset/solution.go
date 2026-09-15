func maximumLength(nums []int) int {
	counts := make(map[int]int)
	for _, value := range nums {
		counts[value]++
	}
	best := 0
	if ones := counts[1]; ones > 0 {
		// 1 squared is 1, so a run of 1s forms its own pattern: an odd
		// number is selectable; drop one when the count is even.
		if ones%2 == 1 {
			best = ones
		} else {
			best = ones - 1
		}
	}
	for value := range counts {
		if value == 1 {
			continue
		}
		// Climb x, x^2, x^4, ... taking a pair at every level but the top,
		// which stays single. Cap 31622 is the largest base whose square
		// does not exceed the 10^9 constraint bound, keeping the int64
		// product below well inside range.
		length := 1
		current := value
		for current <= 31622 && counts[current] >= 2 {
			square := int64(current) * int64(current)
			next := counts[int(square)]
			if next == 0 {
				break
			}
			length += 2
			current = int(square)
		}
		if length > best {
			best = length
		}
	}
	return best
}
