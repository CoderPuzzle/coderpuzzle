func minRefuelStops(target int, startFuel int, stations [][]int) int {
	fuel := int64(startFuel)
	available := make([]int, 0, len(stations)) // fuels at stations already passed
	stops := 0
	i := 0
	n := len(stations)
	for {
		if fuel >= int64(target) {
			return stops
		}
		for i < n && int64(stations[i][0]) <= fuel {
			available = append(available, stations[i][1])
			i++
		}
		if len(available) == 0 {
			return -1
		}
		// Take the largest available fuel.
		best := 0
		for j := 1; j < len(available); j++ {
			if available[j] > available[best] {
				best = j
			}
		}
		fuel += int64(available[best])
		available[best] = available[len(available)-1]
		available = available[:len(available)-1]
		stops++
	}
}
