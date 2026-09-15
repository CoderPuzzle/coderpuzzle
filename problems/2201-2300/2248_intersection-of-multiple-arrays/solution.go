import "sort"

func intersection(nums [][]int) []int {
	// Count how many arrays contain each value; a value present in every
	// array (each nums[i] holds distinct values) is counted exactly
	// len(nums) times, and the statement asks for those values ascending.
	counts := make(map[int]int)
	for _, arr := range nums {
		for _, v := range arr {
			counts[v]++
		}
	}
	result := []int{}
	for v, c := range counts {
		if c == len(nums) {
			result = append(result, v)
		}
	}
	sort.Ints(result)
	return result
}
