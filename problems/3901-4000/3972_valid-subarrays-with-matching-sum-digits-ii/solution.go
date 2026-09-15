func countValidSubarrays(nums []int, x int) int64 {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}

	var answer int64
	// Window p covers sums whose first digit is x: [x*10^p, (x+1)*10^p-1].
	scale := int64(1)
	for w := 0; w < 16; w++ {
		lo := int64(x) * scale
		hi := (int64(x)+1)*scale - 1
		scale *= 10
		if lo > prefix[n] {
			break
		}
		left := 0
		entered := 0 // prefix indices [left, entered) are inside the window
		var residue [10]int64
		for j := 1; j <= n; j++ {
			floor := prefix[j] - hi
			ceiling := prefix[j] - lo
			for entered < j && prefix[entered] <= ceiling {
				residue[prefix[entered]%10]++
				entered++
			}
			for prefix[left] < floor {
				residue[prefix[left]%10]--
				left++
			}
			target := ((prefix[j]-int64(x))%10 + 10) % 10
			answer += residue[target]
		}
	}
	return answer
}
