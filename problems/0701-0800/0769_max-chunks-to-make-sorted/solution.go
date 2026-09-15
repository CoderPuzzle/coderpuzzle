// Prefix maximum sweep: the first i + 1 elements are exactly the set {0..i}
// iff their maximum is i, so each such index is a cut.
func maxChunksToSorted(arr []int) int {
	chunks := 0
	runMax := -1
	for i, v := range arr {
		if v > runMax {
			runMax = v
		}
		// A boundary lands wherever the running max equals the index: every
		// legal cut is counted, and taking all of them is optimal.
		if runMax == i {
			chunks++
		}
	}
	return chunks
}
