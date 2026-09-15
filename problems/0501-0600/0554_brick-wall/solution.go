func leastBricks(wall [][]int) int {
	edgeCounts := make(map[int]int)
	// Flip the question: a line at position p crosses a row unless that
	// row has a brick edge at p, so count edges per position.
	for _, row := range wall {
		position := 0
		// Prefix sums excluding the last brick: the final cumulative
		// width is the wall's right border, which is forbidden.
		for i := 0; i+1 < len(row); i++ {
			position += row[i]
			edgeCounts[position]++
		}
	}
	// Rows minus the most-shared edge position; 0 covers walls where
	// every row is a single brick.
	bestEdges := 0
	for _, count := range edgeCounts {
		if count > bestEdges {
			bestEdges = count
		}
	}
	return len(wall) - bestEdges
}
