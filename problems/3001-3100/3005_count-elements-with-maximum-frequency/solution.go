func maxFrequencyElements(nums []int) int {
	// One pass builds the value -> frequency map; every value whose
	// frequency equals the maximum contributes that many elements.
	frequencies := make(map[int]int)
	for _, num := range nums {
		frequencies[num]++
	}
	maximum := 0
	for _, count := range frequencies {
		if count > maximum {
			maximum = count
		}
	}
	total := 0
	for _, count := range frequencies {
		if count == maximum {
			total += count
		}
	}
	return total
}
