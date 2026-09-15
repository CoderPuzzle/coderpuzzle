func kidsWithCandies(candies []int, extraCandies int) []bool {
	maximum := candies[0]
	for _, count := range candies {
		if count > maximum {
			maximum = count
		}
	}
	result := make([]bool, len(candies))
	for i, count := range candies {
		result[i] = count+extraCandies >= maximum
	}
	return result
}
