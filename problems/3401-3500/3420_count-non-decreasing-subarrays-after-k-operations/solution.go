func countNonDecreasingSubarrays(nums []int, k int) int64 {
	n := len(nums)
	var result int64
	var cnt int64
	dq := make([]int, n)
	tail := 0 // back of deque (next push position)
	head := 0 // front of deque
	right := n - 1
	for left := n - 1; left >= 0; left-- {
		// Merge stack segments: raise smaller elements to nums[left].
		for head < tail && nums[dq[tail-1]] < nums[left] {
			tail--
			l := dq[tail]
			var r int
			if head < tail {
				r = dq[tail-1] - 1
			} else {
				r = right
			}
			cnt += int64(r-l+1) * int64(nums[left]-nums[l])
		}
		dq[tail] = left
		tail++
		// Shrink the window from the right if the cost exceeds k.
		for cnt > int64(k) {
			cnt -= int64(nums[dq[head]] - nums[right])
			if dq[head] == right {
				head++
			}
			right--
		}
		result += int64(right - left + 1)
	}
	return result
}
