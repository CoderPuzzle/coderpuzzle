import "sort"

func maxSum(nums []int, k int, mul int) int64 {
	sort.Sort(sort.Reverse(sort.IntSlice(nums)))
	var answer int64
	take := k
	if mul-1 < take {
		take = mul - 1
	}
	if take < 0 {
		take = 0
	}
	for i := 0; i < k; i++ {
		factor := 1
		if i < take {
			factor = mul - i
		}
		answer += int64(nums[i]) * int64(factor)
	}
	return answer
}
