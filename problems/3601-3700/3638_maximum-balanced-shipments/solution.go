// A run is balanced exactly where its last parcel is strictly lighter than
// the run's heaviest parcel, so one sweep tracks the open segment's maximum
// and closes on the first dip.
func maxBalancedShipments(weight []int) int {
	shipments := 0
	segmentMax := 0
	for _, w := range weight {
		if w < segmentMax {
			// Closing here is never worse than waiting: delaying the reset
			// only shrinks what later segments could use.
			shipments++
			segmentMax = 0
		} else if w > segmentMax {
			segmentMax = w
		}
	}
	return shipments
}
