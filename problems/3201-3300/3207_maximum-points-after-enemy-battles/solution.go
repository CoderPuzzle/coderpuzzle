// Keep the smallest enemy unmarked as a recharge battery: its value m is the
// cheapest point source, and if the initial energy cannot beat even m, no
// first point is possible (marking needs one). Otherwise every other enemy
// gets marked eventually and each lot of m converts to a point, so the
// answer divides initial energy plus all other energies by m. The sum stays
// below 10^5 * 10^9 + 10^9, so accumulate in an int64.
func maximumPoints(enemyEnergies []int, currentEnergy int) int64 {
	smallest := enemyEnergies[0]
	for _, e := range enemyEnergies {
		if e < smallest {
			smallest = e
		}
	}
	if currentEnergy < smallest {
		return 0
	}
	total := int64(currentEnergy)
	for _, e := range enemyEnergies {
		total += int64(e)
	}
	return (total - int64(smallest)) / int64(smallest)
}
