func minimumDistance(nums []int) int {
	// Sorted as a < b < c, a good tuple's distance collapses to
	// (b - a) + (c - b) + (c - a) = 2 * (c - a): only the outermost
	// indices matter, so the tightest triple of a value spans three
	// consecutive occurrences of it.
	best := -1
	// Last two indices seen for each value (-1 marks "not seen yet");
	// any older occurrence can only widen the span, so it never matters
	// again.
	recent := map[int][2]int{}
	for i, num := range nums {
		last, ok := recent[num]
		if !ok {
			last = [2]int{-1, -1}
		}
		if last[0] != -1 {
			distance := 2 * (i - last[0])
			if best == -1 || distance < best {
				best = distance
			}
		}
		recent[num] = [2]int{last[1], i}
	}
	return best
}
