import "sort"

func subsetsWithDup(nums []int) [][]int {
	// Sort in place: each branch chooses among the remaining values in
	// ascending order, so the subsets emerge in the pinned ascending
	// lexicographic order.
	sort.Ints(nums)
	subsets := [][]int{}
	current := []int{}
	var backtrack func(start int)
	backtrack = func(start int) {
		// Every node of the walk is itself a subset: the root is [].
		subset := make([]int, len(current))
		copy(subset, current)
		subsets = append(subsets, subset)
		for i := start; i < len(nums); i++ {
			// A value equal to the sibling just tried at this level would
			// rebuild the same subset, so skip runs of equal values: a
			// duplicate may only open a branch as the first of its run.
			if i > start && nums[i] == nums[i-1] {
				continue
			}
			current = append(current, nums[i])
			backtrack(i + 1)
			current = current[:len(current)-1]
		}
	}
	backtrack(0)
	return subsets
}
