func getDescentPeriods(prices []int) int64 {
	run := int64(1)
	total := int64(1)
	for index := 1; index < len(prices); index++ {
		if prices[index-1]-prices[index] == 1 {
			run++
		} else {
			run = 1
		}
		total += run
	}
	return total
}
