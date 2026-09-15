import "sort"

// Only the heaters need order: each house binds to its nearest one.
func findRadius(houses []int, heaters []int) int {
	sort.Ints(heaters)
	radius := 0
	for _, house := range houses {
		// SearchInts lands on the first heater at or right of the house, so
		// the nearest heater is it, or the one just before.
		index := sort.SearchInts(heaters, house)
		var nearest int
		if index == 0 {
			nearest = heaters[0] - house
		} else if index == len(heaters) {
			nearest = house - heaters[index-1]
		} else {
			nearest = house - heaters[index-1]
			if heaters[index]-house < nearest {
				nearest = heaters[index] - house
			}
		}
		if nearest > radius {
			radius = nearest
		}
	}
	return radius
}
