// Read/write two-pointer compaction: sortedness puts every duplicate run
// adjacent, so write can grow an at-most-twice prefix in place while read scans.
func removeDuplicates(nums []int) []int {
	// The first two elements are always kept, so both pointers start at 2.
	if len(nums) <= 2 {
		return nums
	}
	write := 2
	for read := 2; read < len(nums); read++ {
		// nums[write-2] is the value two slots back in the kept prefix; it
		// equals nums[read] only when that value already holds both copies.
		if nums[read] != nums[write-2] {
			nums[write] = nums[read]
			write++
		}
	}
	// The statement frees the tail beyond the kept prefix, so the
	// compacted prefix is the whole judged answer; its length is k.
	return nums[:write]
}
