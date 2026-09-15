import "sort"

func countSmallerOppositeParity(nums []int) []int {
	values := append([]int(nil), nums...)
	sort.Ints(values)
	unique := values[:0]
	for _, value := range values {
		if len(unique) == 0 || unique[len(unique)-1] != value {
			unique = append(unique, value)
		}
	}
	trees := [][]int{make([]int, len(unique)+1), make([]int, len(unique)+1)}

	query := func(tree []int, index int) int {
		total := 0
		for index > 0 {
			total += tree[index]
			index -= index & -index
		}
		return total
	}
	update := func(tree []int, index int) {
		for index < len(tree) {
			tree[index]++
			index += index & -index
		}
	}

	answer := make([]int, len(nums))
	for i := len(nums) - 1; i >= 0; i-- {
		rank := sort.SearchInts(unique, nums[i]) + 1
		parity := nums[i] & 1
		answer[i] = query(trees[parity^1], rank-1)
		update(trees[parity], rank)
	}
	return answer
}
