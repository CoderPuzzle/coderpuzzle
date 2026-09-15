func maxCandies(status []int, candies []int, keys [][]int, containedBoxes [][]int, initialBoxes []int) int64 {
	// Two waiting rooms: owned-but-locked boxes, and the openable queue.
	n := len(status)
	lockedHeld := make([]bool, n)
	opened := make([]bool, n)
	var total int64
	queue := make([]int, 0, n)

	acquire := func(box int) {
		// Ownership event: an initial box, or one found inside another.
		if opened[box] || lockedHeld[box] {
			return
		}
		if status[box] == 1 {
			queue = append(queue, box)
		} else {
			lockedHeld[box] = true
		}
	}

	for _, b := range initialBoxes {
		acquire(b)
	}

	for len(queue) > 0 {
		b := queue[0]
		queue = queue[1:]
		if opened[b] {
			continue
		}
		opened[b] = true
		total += int64(candies[b])
		for _, k := range keys[b] {
			status[k] = 1
			if lockedHeld[k] {
				// The key only matters for a box already owned and parked;
				// release it into the queue now that it unlocks.
				lockedHeld[k] = false
				queue = append(queue, k)
			}
		}
		for _, c := range containedBoxes[b] {
			acquire(c)
		}
	}
	return total
}
