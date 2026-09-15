func sortColors(nums []int) []int {
	// With only three keys the multiset fixes the output, so tally each
	// color into a slot indexed by the value itself.
	counts := [3]int{}
	for _, value := range nums {
		counts[value]++
	}
	// Overwrite pass: emitting blocks 0,1,2 in order partitions nums;
	// safe because the tally above already captured every element.
	index := 0
	for color := 0; color < 3; color++ {
		for c := 0; c < counts[color]; c++ {
			nums[index] = color
			index++
		}
	}
	return nums
}
