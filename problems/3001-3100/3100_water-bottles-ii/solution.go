func maxBottlesDrunk(numBottles int, numExchange int) int {
	// Every bottle drunk becomes an empty and exchange prices only rise,
	// so no optimal schedule ever gains by holding stock back: drink
	// everything in hand, then spend empties on one bottle per price tier
	// from cheapest upward while any tier is still affordable.
	drunk := 0
	empty := 0
	for numBottles > 0 {
		// Drink all held bottles; they may fund further exchanges.
		drunk += numBottles
		empty += numBottles
		numBottles = 0
		if empty >= numExchange {
			// Pay exactly the current tier; the next batch costs more.
			empty -= numExchange
			numExchange++
			numBottles = 1
		}
	}
	return drunk
}
