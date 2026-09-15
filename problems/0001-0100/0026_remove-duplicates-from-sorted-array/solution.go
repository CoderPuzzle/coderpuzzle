// Read/write two-pointer compaction: sortedness puts every duplicate run
// adjacent, so write can grow a unique prefix in place while read scans.
func removeDuplicates(nums []int) []int {
	// The first element is always kept, so both pointers start at 1.
	write := 1
	for read := 1; read < len(nums); read++ {
		// nums[write-1] is the last value kept; in a sorted array the scan
		// meets a new value exactly when the previous run ends.
		if nums[read] != nums[write-1] {
			nums[write] = nums[read]
			write++
		}
	}
	// The statement frees the tail beyond the unique prefix, so the
	// compacted prefix is the whole judged answer; its length is k.
	return nums[:write]
}
