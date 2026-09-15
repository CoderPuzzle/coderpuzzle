func numTimesAllBlue(flips []int) int {
	rightmost := 0
	count := 0
	for i, position := range flips {
		if position > rightmost {
			rightmost = position
		}
		if rightmost == i+1 {
			count++
		}
	}
	return count
}
