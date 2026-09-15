import "sort"

// Sort ascending: the maximal-perimeter triangle, if one exists, sits on
// three consecutive sorted entries, so a scan from the top decides the
// answer.
func largestPerimeter(nums []int) int {
	sort.Ints(nums)
	for i := len(nums) - 3; i >= 0; i-- {
		// Strict inequality only: the two smaller sides summing to the
		// largest is a zero-area line, not a triangle.
		if nums[i]+nums[i+1] > nums[i+2] {
			return nums[i] + nums[i+1] + nums[i+2]
		}
	}
	return 0
}
