func decompressRLElist(nums []int) []int {
	// Size the output up front: it is the sum of all frequencies.
	total := 0
	for i := 0; i < len(nums); i += 2 {
		total += nums[i]
	}
	out := make([]int, 0, total)
	for i := 0; i+1 < len(nums); i += 2 {
		for k := 0; k < nums[i]; k++ {
			out = append(out, nums[i+1])
		}
	}
	return out
}
