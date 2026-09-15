import "sort"

func minimumCost(m int, n int, horizontalCut []int, verticalCut []int) int {
	// A cut costs its base price times the pieces it crosses: one more
	// for every opposite-direction cut already made. An exchange argument
	// (swapping adjacent opposite cuts never helps unless the pricier one
	// goes first) makes "expensive cuts early" the optimal schedule.
	hcuts := append([]int(nil), horizontalCut...)
	vcuts := append([]int(nil), verticalCut...)
	sort.Sort(sort.Reverse(sort.IntSlice(hcuts)))
	sort.Sort(sort.Reverse(sort.IntSlice(vcuts)))
	i, j := 0, 0
	hMade, vMade := 0, 0
	total := 0
	// Two-pointer merge: always take the head with the larger base cost,
	// while its multiplier (opposite cuts made + 1) is still small.
	for i < len(hcuts) && j < len(vcuts) {
		// Ties (>=) may go to the horizontal head: equal base costs are
		// interchangeable in the exchange argument.
		if hcuts[i] >= vcuts[j] {
			total += hcuts[i] * (vMade + 1)
			i++
			hMade++
		} else {
			total += vcuts[j] * (hMade + 1)
			j++
			vMade++
		}
	}
	// One direction is drained, so the other's multiplier is now fixed.
	for i < len(hcuts) {
		total += hcuts[i] * (vMade + 1)
		i++
	}
	for j < len(vcuts) {
		total += vcuts[j] * (hMade + 1)
		j++
	}
	return total
}
