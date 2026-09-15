import (
	"sort"
	"strings"
)

func maxPotholes(road string, budget int) int {
	// Whole long runs are cheapest per pothole (L / (L + 1) grows with L),
	// so take longest runs first; when a full run no longer fits only one
	// partial purchase remains, worth budget - 1 potholes.
	var lengths []int
	for _, run := range strings.Split(road, ".") {
		if len(run) > 0 {
			lengths = append(lengths, len(run))
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(lengths)))
	fixed := 0
	for _, length := range lengths {
		if budget >= length+1 {
			budget -= length + 1
			fixed += length
		} else {
			if budget-1 > 0 {
				fixed += budget - 1
			}
			break
		}
	}
	return fixed
}
