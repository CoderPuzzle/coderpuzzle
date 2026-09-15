import "strconv"

func countDistinct(nums []int, k int, p int) int {
	// dedup by content: the comma-joined string identifies a subarray
	seen := make(map[string]bool)
	n := len(nums)
	for i := 0; i < n; i++ {
		// for each left endpoint i, extend j, tracking the running count of
		// elements divisible by p
		divisible := 0
		cur := make([]byte, 0, 64)
		for j := i; j < n; j++ {
			if nums[j]%p == 0 {
				divisible++
			}
			// the separator keeps [1,2] and [12] distinct
			if len(cur) > 0 {
				cur = append(cur, ',')
			}
			cur = strconv.AppendInt(cur, int64(nums[j]), 10)
			// over the limit: any longer extension stays over, so stop extending
			if divisible > k {
				break
			}
			seen[string(cur)] = true
		}
	}
	return len(seen)
}
