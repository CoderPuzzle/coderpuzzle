import "sort"

func minOperations(nums []int) int {
	length := len(nums)
	sort.Ints(nums)

	values := make([]int, 0, length)
	for _, value := range nums {
		if len(values) == 0 || values[len(values)-1] != value {
			values = append(values, value)
		}
	}

	left, kept := 0, 0
	for right, value := range values {
		for int64(value)-int64(values[left]) >= int64(length) {
			left++
		}
		if right-left+1 > kept {
			kept = right - left + 1
		}
	}

	return length - kept
}
