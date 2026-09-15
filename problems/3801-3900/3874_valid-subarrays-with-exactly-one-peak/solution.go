// Each peak is the only peak in exactly those subarrays whose left endpoint
// stays past the previous peak and whose right endpoint stays before the
// next peak, both also within k of the peak. The count can reach
// (n/2+1)*(n/2) on a single-peaked array, so the running total is an int64.
func validSubarrays(nums []int, k int) int64 {
	n := len(nums)
	peaks := []int{}
	for i := 1; i < n-1; i++ {
		if nums[i] > nums[i-1] && nums[i] > nums[i+1] {
			peaks = append(peaks, i)
		}
	}
	var total int64 = 0
	for idx, i := range peaks {
		prev := -1
		if idx > 0 {
			prev = peaks[idx-1]
		}
		nxt := n
		if idx+1 < len(peaks) {
			nxt = peaks[idx+1]
		}
		lo := i - k
		if prev+1 > lo {
			lo = prev + 1
		}
		hi := i + k
		if nxt-1 < hi {
			hi = nxt - 1
		}
		total += int64(i-lo+1) * int64(hi-i+1)
	}
	return total
}
