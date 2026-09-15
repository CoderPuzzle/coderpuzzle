func maxProfit(prices []int, fee int) int64 {
	// cash: best profit holding no share; hold: best profit holding one.
	// The sentinel makes pre-day-1 holding unreachable; cash=0 means do nothing.
	cash, hold := int64(0), -(int64(1) << 60)
	for _, price := range prices {
		// Both maxes read yesterday's values: sell charges the fee once,
		// on the sell leg; buy subtracts the price.
		newCash := cash
		if v := hold + int64(price) - int64(fee); v > newCash {
			newCash = v
		}
		newHold := hold
		if v := cash - int64(price); v > newHold {
			newHold = v
		}
		cash, hold = newCash, newHold
	}
	// Ending with a share in hand is never better than having sold.
	return cash
}
