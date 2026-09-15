// The rules fix every decision, so simulate them directly: each fruit takes
// the leftmost free basket that fits, scanning from index 0.
func numOfUnplacedFruits(fruits []int, baskets []int) int {
	used := make([]bool, len(baskets))
	unplaced := 0
	for _, quantity := range fruits {
		j := 0
		// skip occupied baskets and capacities that are too small
		for j < len(baskets) && (used[j] || baskets[j] < quantity) {
			j++
		}
		// scan ran off the end: nothing fits this fruit
		if j == len(baskets) {
			unplaced++
		} else {
			used[j] = true
		}
	}
	return unplaced
}
