// Wealth is a per-row quantity: each customer's wealth is the sum of
// their row, and the answer is the largest of those sums. Every balance
// is at least 1, so a running maximum seeded at 0 is always overwritten
// by the first row.
func maximumWealth(accounts [][]int) int {
	richest := 0
	for _, row := range accounts {
		wealth := 0
		for _, balance := range row {
			wealth += balance
		}
		if wealth > richest {
			richest = wealth
		}
	}
	return richest
}
