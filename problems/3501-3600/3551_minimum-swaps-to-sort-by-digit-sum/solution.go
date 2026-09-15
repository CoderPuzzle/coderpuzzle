import "sort"

func minSwaps(nums []int) int {
	// Sorting by (digit sum, value) fixes the target order; mapping
	// every element to its target position turns the rearrangement
	// into a permutation, and the minimum number of swaps is
	// n - (number of cycles): each cycle of length L costs L - 1.
	// The cycle walk is iterative -- n reaches 10^5, past any safe
	// recursion depth.
	digitSum := func(v int) int {
		s := 0
		for ; v > 0; v /= 10 {
			s += v % 10
		}
		return s
	}
	n := len(nums)
	type item struct{ sum, value, idx int }
	order := make([]item, n)
	for i, v := range nums {
		order[i] = item{sum: digitSum(v), value: v, idx: i}
	}
	sort.Slice(order, func(a, b int) bool {
		if order[a].sum != order[b].sum {
			return order[a].sum < order[b].sum
		}
		return order[a].value < order[b].value
	})
	pos := make([]int, n)
	for target, it := range order {
		pos[it.idx] = target
	}
	swaps := 0
	visited := make([]bool, n)
	for i := 0; i < n; i++ {
		if visited[i] {
			continue
		}
		length := 0
		for j := i; !visited[j]; j = pos[j] {
			visited[j] = true
			length++
		}
		swaps += length - 1
	}
	return swaps
}
