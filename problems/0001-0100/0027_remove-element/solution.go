// Write pointer: nums[:k] always holds the survivors seen so far, so one read
// pass compacts them to the front in place — no shifting.
func removeElement(nums []int, val int) []int {
	k := 0
	for _, value := range nums {
		if value != val {
			nums[k] = value
			k++
		}
	}
	// The statement frees both the order and the tail beyond k, so the
	// compacted prefix is the whole judged answer; its length is k.
	return nums[:k]
}
