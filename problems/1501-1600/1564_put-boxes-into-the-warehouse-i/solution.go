import "sort"

func maxBoxesInWarehouse(boxes []int, warehouse []int) int {
	// A box entering from room 0 can only ever reach room i if every room
	// 0..i also let it through, so the height that actually matters at
	// position i is the prefix minimum of warehouse[0..i].
	n := len(warehouse)
	effective := make([]int, n)
	runningMin := warehouse[0]
	for i := 0; i < n; i++ {
		if warehouse[i] < runningMin {
			runningMin = warehouse[i]
		}
		effective[i] = runningMin
	}

	// effective is non-increasing outward-to-inward, so read it from the
	// back (deepest room, smallest allowance) forward. Match it against
	// boxes sorted ascending: the smallest remaining box is the best fit
	// for the tightest remaining room.
	sortedBoxes := make([]int, len(boxes))
	copy(sortedBoxes, boxes)
	sort.Ints(sortedBoxes)

	placed := 0
	j := 0
	for i := n - 1; i >= 0; i-- {
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
