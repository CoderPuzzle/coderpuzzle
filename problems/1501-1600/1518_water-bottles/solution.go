// Every bottle is drunk exactly once, whether it started full or was
// obtained by trading in empties. Track how many empties are on hand and
// repeatedly trade in as many full groups as possible.
func numWaterBottles(numBottles int, numExchange int) int {
	drunk := numBottles
	empty := numBottles
	for empty >= numExchange {
		newFull := empty / numExchange
		empty = empty%numExchange + newFull
		drunk += newFull
	}
	return drunk
}
