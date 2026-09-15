// Hand out one gift per turn, cycling through the row. Each turn the gift
// grows by one; when fewer candies remain than the next gift, the current
// person takes what is left and the loop ends.
func distributeCandies(candies int, num_people int) []int {
	result := make([]int, num_people)
	give := 1
	for index := 0; candies > 0; index++ {
		take := give
		if take > candies {
			take = candies
		}
		result[index%num_people] += take
		candies -= take
		give++
	}
	return result
}
