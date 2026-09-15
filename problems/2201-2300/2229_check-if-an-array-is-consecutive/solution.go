import "sort"

func isConsecutive(nums []int) bool {
	sort.Ints(nums)
	for i := 1; i < len(nums); i++ {
		if nums[i]-nums[i-1] != 1 {
			return false
		}
	}
	return true
}
