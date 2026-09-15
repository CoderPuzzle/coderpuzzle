import "sort"

// All strings share one length, so trimmed suffixes do too, and
// lexicographic order on equal-length digit strings equals numeric
// order — no numeric conversion needed (suffixes can exceed 64 bits).
func smallestTrimmedNumbers(nums []string, queries [][]int) []int {
	answer := make([]int, 0, len(queries))
	order := make([]int, len(nums))
	for _, query := range queries {
		k, trim := query[0], query[1]
		for i := range order {
			order[i] = i
		}
		sort.Slice(order, func(left, right int) bool {
			a, b := nums[order[left]][len(nums[order[left]])-trim:],
				nums[order[right]][len(nums[order[right]])-trim:]
			if a != b {
				return a < b
			}
			return order[left] < order[right]
		})
		answer = append(answer, order[k-1])
	}
	return answer
}
