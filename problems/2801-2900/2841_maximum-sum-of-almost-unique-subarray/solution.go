// Slides a fixed-length-k window holding a value->count map, so the map size
// is always the current window's distinct count. Window sums reach
// n * max(nums[i]) = 2 * 10^4 * 10^9 = 2 * 10^13, past int32 range, so they
// are widened to int64; no intermediate exceeds that, far below the
// ~9.2 * 10^18 int64 ceiling.
func maxSum(nums []int, m int, k int) int64 {
	best := int64(0)
	freq := make(map[int]int)
	var winSum int64
	for right := 0; right < len(nums); right++ {
		freq[nums[right]]++
		winSum += int64(nums[right])
		if right >= k {
			old := nums[right-k]
			freq[old]--
			if freq[old] == 0 {
				delete(freq, old)
			}
			winSum -= int64(old)
		}
		if right+1 >= k && len(freq) >= m && winSum > best {
			best = winSum
		}
	}
	return best
}
