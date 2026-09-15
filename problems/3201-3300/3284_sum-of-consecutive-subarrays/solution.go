func getSum(nums []int) int {
	// Scan maximal constant-step (+1 / -1) runs left to right, carrying
	// ending, the sum of all consecutive subarrays that end at the current
	// index. Repeating the direction grows the run and extends every such
	// subarray (ending += chain * x after the increment); a unit step in a
	// new direction keeps only the fresh pair plus [x]; any other step
	// keeps only [x]. Reduced mod 10^9 + 7 each step, so the widest
	// intermediate is chain * x <= 10^10, within int64.
	const mod = 1000000007
	total := int64(nums[0])
	chain := 1
	ending := int64(nums[0])
	direction := 0
	for i := 1; i < len(nums); i++ {
		d := nums[i] - nums[i-1]
		if d == direction && d != 0 {
			chain++
			ending = (ending + int64(chain)*int64(nums[i])) % mod
		} else if d == 1 || d == -1 {
			direction = d
			chain = 2
			ending = (int64(nums[i-1]) + 2*int64(nums[i])) % mod
		} else {
			direction = 0
			chain = 1
			ending = int64(nums[i])
		}
		total = (total + ending) % mod
	}
	return int(total)
}
