// The floor of the answer is the sum of the longest prefix in which every
// value is exactly its predecessor plus one; the first break in that
// progression ends the prefix, so one scan settles it. From that floor,
// step upward past every value the array holds; the first gap is the
// smallest missing integer.
func missingInteger(nums []int) int {
	total := nums[0]
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[i-1]+1 {
			break
		}
		total += nums[i]
	}
	present := make(map[int]struct{}, len(nums))
	for _, v := range nums {
		present[v] = struct{}{}
	}
	for {
		if _, ok := present[total]; !ok {
			return total
		}
		total++
	}
}
