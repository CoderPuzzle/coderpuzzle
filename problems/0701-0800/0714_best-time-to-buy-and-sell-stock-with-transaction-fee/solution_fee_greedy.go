func maxProfit(prices []int, fee int) int64 {
	// total: profit already banked; basis: the fee-adjusted effective buy.
	// The sentinel opens beyond every price, so day one always sets the entry.
	total, basis := int64(0), int64(1)<<60
	for _, price := range prices {
		// A rise past basis + fee clears a round trip: bank the surplus and
		// rebate the fee into the next buy, so a further rise extends the
		// same trade instead of opening a billable new one.
		if int64(price) > basis+int64(fee) {
			total += int64(price) - basis - int64(fee)
			basis = int64(price) - int64(fee)
		} else if int64(price) < basis {
			// A dip below the basis is a strictly cheaper entry.
			basis = int64(price)
		}
	}
	// Only banked profit counts; the trailing basis is bookkeeping, not a position.
	return total
}
