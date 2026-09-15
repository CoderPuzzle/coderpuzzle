import "sort"

func divideArray(nums []int, k int) [][]int {
	// Sorting is forced: the global minimum may only share a group with
	// the two values closest above it, and inductively every valid
	// division groups consecutive sorted values — so sort and check each
	// consecutive triple's spread (last minus first is the widest).
	sort.Ints(nums)
	result := make([][]int, 0, len(nums)/3)
	for i := 0; i+2 < len(nums); i += 3 {
		if nums[i+2]-nums[i] > k {
			return [][]int{}
		}
		result = append(result, nums[i:i+3])
	}
	return result
}
