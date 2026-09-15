func minSwaps(nums []int, forbidden []int) int {
	// A swap repairs at most two bad positions, and two bad positions
	// sharing a value cannot repair each other, so the answer is at least
	// max(ceil(bad/2), worst same-value cluster). A value whose combined
	// count in nums and forbidden exceeds n has nowhere to hide and makes
	// the task impossible; otherwise both lower bounds are achievable,
	// and their max is the answer.
	n := len(nums)
	freq := make(map[int]int)
	for _, x := range nums {
		freq[x]++
	}
	for _, x := range forbidden {
		freq[x]++
	}
	for _, count := range freq {
		if count >= n+1 {
			return -1
		}
	}
	bad := make(map[int]int)
	for i := 0; i < n; i++ {
		if nums[i] == forbidden[i] {
			bad[nums[i]]++
		}
	}
	total := 0
	worst := 0
	for _, count := range bad {
		total += count
		if count > worst {
			worst = count
		}
	}
	return max((total+1)/2, worst)
}
