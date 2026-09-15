// Greedy left-to-right scan: plant any empty plot whose previous and next
// plots are both empty, reading a missing neighbor at either end as empty.
// A plant never blocks more than it enables, so the running count is the
// bed's true capacity.
func canPlaceFlowers(flowerbed []int, n int) bool {
	count := 0
	prev := 0
	for i, plot := range flowerbed {
		nxt := 0
		if i+1 < len(flowerbed) {
			nxt = flowerbed[i+1]
		}
		if plot == 0 && prev == 0 && nxt == 0 {
			count++
			prev = 1
		} else {
			// prev carries the previous plot's effective value: 1 when a
			// flower was just planted there, otherwise the plot as read.
			prev = plot
		}
	}
	return count >= n
}
