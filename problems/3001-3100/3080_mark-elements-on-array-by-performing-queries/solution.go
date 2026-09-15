import "sort"

func unmarkedSumArray(nums []int, queries [][]int) []int64 {
	// Marking only ever removes elements, so one monotone sweep over the
	// indices sorted by (value, index) answers every query's "k smallest
	// unmarked" step: the pointer skips entries marked by name and never
	// revisits one. A running total absorbs each mark — it can reach
	// 10^5 * 10^5 = 10^10, beyond int32, so the total is an int64.
	n := len(nums)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		if nums[order[a]] != nums[order[b]] {
			return nums[order[a]] < nums[order[b]]
		}
		return order[a] < order[b]
	})
	marked := make([]bool, n)
	total := 0
	for _, num := range nums {
		total += num
	}
	pointer := 0
	answer := make([]int64, 0, len(queries))
	for _, query := range queries {
		index, count := query[0], query[1]
		if !marked[index] {
			marked[index] = true
			total -= nums[index]
		}
		taken := 0
		for taken < count && pointer < n {
			candidate := order[pointer]
			pointer++
			if marked[candidate] {
				continue
			}
			marked[candidate] = true
			total -= nums[candidate]
			taken++
		}
		answer = append(answer, int64(total))
	}
	return answer
}
