// A building sees the ocean iff it strictly exceeds the max of
// everything to its right; sweep inland carrying that max.
func findBuildings(heights []int) []int {
	var out []int
	tallest := 0
	for i := len(heights) - 1; i >= 0; i-- {
		if heights[i] > tallest {
			out = append(out, i)
			tallest = heights[i]
		}
	}
	for l, r := 0, len(out)-1; l < r; l, r = l+1, r-1 {
		out[l], out[r] = out[r], out[l]
	}
	return out
}
