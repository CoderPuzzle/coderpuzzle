func sortArray(nums []int) int {
	n := len(nums)
	opsFor := func(target []int) int {
		// sigma[i] = destination slot of the item currently at slot i.
		sigma := make([]int, n)
		for i, v := range nums {
			sigma[i] = target[v]
		}
		blank := -1
		for i, v := range nums {
			if v == 0 {
				blank = i
				break
			}
		}
		visited := make([]bool, n)
		total := 0
		for i := 0; i < n; i++ {
			if visited[i] {
				continue
			}
			// Walk one cycle of the permutation i -> sigma[i].
			length := 0
			hasBlank := false
			j := i
			for !visited[j] {
				visited[j] = true
				if j == blank {
					hasBlank = true
				}
				length++
				j = sigma[j]
			}
			if hasBlank {
				// Each move drops one item into the hole the blank occupies,
				// walking the blank home: length - 1 moves.
				total += length - 1
			} else if length >= 2 {
				// One extra move pulls the blank into this cycle (an item
				// gets displaced to the blank's own goal), then L in-cycle
				// placements return it: L + 1 moves.
				total += length + 1
			}
			// Length-1 cycles are already home and cost nothing.
		}
		return total
	}
	targetA := make([]int, n)
	targetB := make([]int, n)
	targetA[0] = n - 1
	for v := 1; v < n; v++ {
		targetA[v] = v - 1
	}
	for v := 0; v < n; v++ {
		targetB[v] = v
	}
	// Two sorted layouts exist — blank last or blank first; compare both
	// (an array cheap for one goal can be dear for the other).
	a := opsFor(targetA)
	b := opsFor(targetB)
	if a < b {
		return a
	}
	return b
}
