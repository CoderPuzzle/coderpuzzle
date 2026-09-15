// A plan that drinks A at hour i either drank A at hour i-1 or drank B at
// hour i-2 and idled through the cleanse hour i-1, so
// dpA[i] = max(dpA[i-1], dpB[i-2]) + energyDrinkA[i] and symmetrically for
// B. Four rolling variables carry the current pair and the one-hour-older
// pair; totals reach 10^10, past the 32-bit range.
func maxEnergyBoost(energyDrinkA []int, energyDrinkB []int) int64 {
	a := int64(energyDrinkA[0]) + int64(energyDrinkA[1])
	b := int64(energyDrinkB[0]) + int64(energyDrinkB[1])
	oldA, oldB := int64(energyDrinkA[0]), int64(energyDrinkB[0])
	for i := 2; i < len(energyDrinkA); i++ {
		nextA := max(a, oldB) + int64(energyDrinkA[i])
		nextB := max(b, oldA) + int64(energyDrinkB[i])
		oldA, oldB = a, b
		a, b = nextA, nextB
	}
	return max(a, b)
}
