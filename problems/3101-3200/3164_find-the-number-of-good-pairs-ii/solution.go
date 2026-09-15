func numberOfPairs(nums1 []int, nums2 []int, k int) int64 {
	highest := 0
	for _, num := range nums1 {
		if num > highest {
			highest = num
		}
	}
	counts1 := make([]int64, highest+1)
	for _, num := range nums1 {
		counts1[num]++
	}
	counts2 := make(map[int]int64)
	for _, num := range nums2 {
		counts2[num]++
	}
	var total int64
	for base, amount := range counts2 {
		step := int64(base) * int64(k)
		if step > int64(highest) {
			continue
		}
		var divisible int64
		for value := step; value <= int64(highest); value += step {
			divisible += counts1[value]
		}
		total += amount * divisible
	}
	return total
}
