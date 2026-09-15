import "sort"

func maxSubsequence(nums []int, k int) []int {
	indices := make([]int, len(nums))
	for index := range indices {
		indices[index] = index
	}
	sort.Slice(indices, func(left, right int) bool {
		leftIndex := indices[left]
		rightIndex := indices[right]
		if nums[leftIndex] != nums[rightIndex] {
			return nums[leftIndex] > nums[rightIndex]
		}
		return leftIndex < rightIndex
	})
	chosen := indices[:k]
	sort.Ints(chosen)
	answer := make([]int, k)
	for index, originalIndex := range chosen {
		answer[index] = nums[originalIndex]
	}
	return answer
}
