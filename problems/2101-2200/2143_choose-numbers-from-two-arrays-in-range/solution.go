func countSubranges(nums1 []int, nums2 []int) int {
	const mod = 1000000007
	const offset = 10000
	const size = 20001
	previous := make([]int, size)
	answer := 0
	for index := range nums1 {
		current := make([]int, size)
		current[offset+nums1[index]] = 1
		current[offset-nums2[index]] = (current[offset-nums2[index]] + 1) % mod
		for position, count := range previous {
			if count == 0 {
				continue
			}
			if position+nums1[index] < size {
				current[position+nums1[index]] = (current[position+nums1[index]] + count) % mod
			}
			if position-nums2[index] >= 0 {
				current[position-nums2[index]] = (current[position-nums2[index]] + count) % mod
			}
		}
		answer = (answer + current[offset]) % mod
		previous = current
	}
	return answer
}
