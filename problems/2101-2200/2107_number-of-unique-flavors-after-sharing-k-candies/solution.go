func shareCandies(candies []int, k int) int {
	counts := make(map[int]int)
	for _, flavor := range candies {
		counts[flavor]++
	}
	distinct := len(counts)
	for index := 0; index < k; index++ {
		flavor := candies[index]
		counts[flavor]--
		if counts[flavor] == 0 {
			distinct--
		}
	}

	answer := distinct
	for right := k; right < len(candies); right++ {
		restored := candies[right-k]
		if counts[restored] == 0 {
			distinct++
		}
		counts[restored]++
		removed := candies[right]
		counts[removed]--
		if counts[removed] == 0 {
			distinct--
		}
		if distinct > answer {
			answer = distinct
		}
	}
	return answer
}
