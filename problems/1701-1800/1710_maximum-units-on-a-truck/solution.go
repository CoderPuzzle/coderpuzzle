import "sort"

// Every box spends one truck slot regardless of type, so each slot should
// hold the richest box still available: sort by units per box descending
// and fill the truck front-to-back.
func maximumUnits(boxTypes [][]int, truckSize int) int {
	sort.Slice(boxTypes, func(i, j int) bool { return boxTypes[i][1] > boxTypes[j][1] })
	unitsTotal := int64(0)
	remaining := truckSize
	for _, box := range boxTypes {
		if remaining == 0 {
			break
		}
		take := min(box[0], remaining)
		// the total tops out at 10^9 — inside the 32-bit return range, but
		// narrowly, so the sum runs in an int64 and narrows on return
		unitsTotal += int64(take) * int64(box[1])
		remaining -= take
	}
	return int(unitsTotal)
}
