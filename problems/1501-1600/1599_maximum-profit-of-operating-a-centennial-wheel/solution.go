// Simulate one rotation at a time: consume the next arrivals (once
// customers is exhausted, no more arrive), board up to four of whoever
// is waiting, and track the running profit. bestProfit starts at 0 and
// only moves on a *strict* improvement, so the first rotation to reach
// the eventual maximum is the one kept — matching "return the minimum
// number of rotations" on ties.
func minOperationsMaxProfit(customers []int, boardingCost int, runningCost int) int {
	waiting := 0
	boarded := 0
	bestProfit := 0
	bestRotation := -1
	rotation := 0
	n := len(customers)
	index := 0
	for index < n || waiting > 0 {
		if index < n {
			waiting += customers[index]
			index++
		}
		board := waiting
		if board > 4 {
			board = 4
		}
		waiting -= board
		boarded += board
		rotation++
		profit := boarded*boardingCost - rotation*runningCost
		if profit > bestProfit {
			bestProfit = profit
			bestRotation = rotation
		}
	}
	if bestProfit > 0 {
		return bestRotation
	}
	return -1
}
