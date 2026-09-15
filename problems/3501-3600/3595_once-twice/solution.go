func onceTwice(nums []int) []int {
	// Exactly one value occurs once, one occurs twice, the rest thrice;
	// a frequency table over the distinct values finds the two specials.
	counts := make(map[int]int)
	for _, x := range nums {
		counts[x]++
	}
	once, twice := 0, 0
	// First answer is the count-1 value, second the count-2 value.
	for value, count := range counts {
		if count == 1 {
			once = value
		} else if count == 2 {
			twice = value
		}
	}
	return []int{once, twice}
}
