import (
	"sort"
	"strconv"
)

func sortByReflection(nums []int) []int {
	// Reflect every value once — reverse its binary string and parse it
	// back, which drops any leading zeros the reversal produced — then
	// sort on the composite key (reflection, value) so ties break by
	// ascending original value regardless of sort stability.
	reflection := make(map[int]int, len(nums))
	for _, value := range nums {
		reversed := []byte(strconv.FormatInt(int64(value), 2))
		for i, j := 0, len(reversed)-1; i < j; i, j = i+1, j-1 {
			reversed[i], reversed[j] = reversed[j], reversed[i]
		}
		parsed, _ := strconv.ParseInt(string(reversed), 2, 64)
		reflection[value] = int(parsed)
	}
	sort.SliceStable(nums, func(i, j int) bool {
		if reflection[nums[i]] != reflection[nums[j]] {
			return reflection[nums[i]] < reflection[nums[j]]
		}
		return nums[i] < nums[j]
	})
	return nums
}
