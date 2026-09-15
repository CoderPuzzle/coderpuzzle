import "sort"

func maxBoxesInWarehouse(boxes []int, warehouse []int) int {
	// A box can enter from either side, so room i only has to survive
	// whichever path is more forgiving: the prefix minimum coming from
	// the left, or the suffix minimum coming from the right.
	n := len(warehouse)
	prefixMin := make([]int, n)
	running := warehouse[0]
	for i := 0; i < n; i++ {
		if warehouse[i] < running {
			running = warehouse[i]
		}
		prefixMin[i] = running
	}

	suffixMin := make([]int, n)
	running = warehouse[n-1]
	for i := n - 1; i >= 0; i-- {
		if warehouse[i] < running {
			running = warehouse[i]
		}
		suffixMin[i] = running
	}

	effective := make([]int, n)
	for i := 0; i < n; i++ {
		effective[i] = prefixMin[i]
		if suffixMin[i] > effective[i] {
			effective[i] = suffixMin[i]
		}
	}

	// effective is no longer monotonic, so sort both sides and sweep
	// with two pointers: the smallest remaining box is the best fit
	// for the smallest remaining room capacity.
	sort.Ints(effective)
	sortedBoxes := make([]int, len(boxes))
	copy(sortedBoxes, boxes)
	sort.Ints(sortedBoxes)

	placed := 0
	j := 0
	for i := 0; i < n; i++ {
		if j >= len(sortedBoxes) {
			break
		}
		if sortedBoxes[j] <= effective[i] {
			placed++
			j++
		}
	}
	return placed
}
