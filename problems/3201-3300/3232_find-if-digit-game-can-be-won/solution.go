func canAliceWin(nums []int) bool {
	// Alice must swallow an entire digit class, so the two running totals
	// decide everything: singles beat doubles under one play, doubles
	// beat singles under the other.
	single := 0
	doubleSum := 0
	for _, value := range nums {
		if value < 10 {
			single += value
		} else {
			doubleSum += value
		}
	}
	// An exact tie hands Bob whichever class Alice declines with an equal
	// sum, so only a strict difference wins.
	return single != doubleSum
}
