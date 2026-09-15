import "sort"

func distinctAverages(nums []int) int {
	// Sort, then pair the i-th smallest with the i-th largest. The average
	// (a+b)/2 is distinct exactly when the sum a+b is distinct, so track pair
	// sums and never touch floats.
	sort.Ints(nums)
	sums := map[int]bool{}
	for i := 0; i < len(nums)/2; i++ {
		sums[nums[i]+nums[len(nums)-1-i]] = true
	}
	return len(sums)
}
