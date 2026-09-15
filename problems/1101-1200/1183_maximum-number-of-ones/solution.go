import "sort"

func maximumNumberOfOnes(width int, height int, sideLength int, maxOnes int) int {
	// Each residue class (r, c) mod sideLength appears in every window
	// exactly once, so the constraint binds classes. Count how many
	// grid cells fall into each class: full blocks plus the leftover
	// strip when the remainder reaches r (or c).
	counts := make([]int, sideLength*sideLength)
	for r := 0; r < sideLength; r++ {
		for c := 0; c < sideLength; c++ {
			rows := height / sideLength
			if height%sideLength > r {
				rows++
			}
			cols := width / sideLength
			if width%sideLength > c {
				cols++
			}
			counts[r*sideLength+c] = rows * cols
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(counts)))
	total := 0
	for i := 0; i < maxOnes; i++ {
		total += counts[i]
	}
	return total
}
