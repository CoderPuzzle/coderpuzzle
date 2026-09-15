func numberOfGoodPartitions(nums []int) int {
	// A value may not straddle a cut, so every free cut sits at an index
	// that has already seen the last occurrence of every value to its left;
	// each such gap independently doubles the count, giving 2^(number of
	// gaps).
	const MOD = 1000000007
	last := make(map[int]int)
	for i, v := range nums {
		last[v] = i
	}
	result := 1
	reach := 0
	for i := 0; i+1 < len(nums); i++ {
		if last[nums[i]] > reach {
			reach = last[nums[i]]
		}
		if reach == i {
			result = result * 2 % MOD
		}
	}
	return result
}
