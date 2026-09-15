func canDivideIntoSubsequences(nums []int, k int) bool {
	// The longest run of equal values forces that many separate sequences;
	// the array is sorted, so runs are contiguous.
	maxfreq := 1
	run := 1
	for i := 1; i < len(nums); i++ {
		if nums[i] == nums[i-1] {
			run++
		} else {
			run = 1
		}
		if run > maxfreq {
			maxfreq = run
		}
	}
	// The product can hit 1e10; int64 is the honest width.
	return int64(len(nums)) >= int64(maxfreq)*int64(k)
}
