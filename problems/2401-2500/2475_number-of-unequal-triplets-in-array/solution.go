func unequalTriplets(nums []int) int {
	// Three distinct positions with three distinct values order uniquely
	// by index, so for each value v the valid triplets using v as the
	// value-sorted middle are left * freq[v] * right. Values lie in
	// [1, 1000], so a fixed table indexed by value replaces the map.
	count := [1001]int{}
	for _, value := range nums {
		count[value]++
	}
	total := len(nums)
	left := 0
	answer := 0
	for value := 1; value <= 1000; value++ {
		freq := count[value]
		if freq != 0 {
			answer += left * freq * (total - left - freq)
			left += freq
		}
	}
	return answer
}
