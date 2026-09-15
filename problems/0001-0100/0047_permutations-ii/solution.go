import "sort"

func permuteUnique(nums []int) [][]int {
	// Sort in place: every position chooses among the remaining values in
	// ascending order, so the finished permutations emerge in lexicographic
	// order.
	sort.Ints(nums)
	permutations := [][]int{}
	current := []int{}
	// One flag per slot: each element is consumed at most once per
	// permutation, cleared again on the way back up.
	used := make([]bool, len(nums))
	var backtrack func()
	backtrack = func() {
		if len(current) == len(nums) {
			// Every position filled: snapshot the finished permutation.
			permutation := make([]int, len(current))
			copy(permutation, current)
			permutations = append(permutations, permutation)
			return
		}
		for i := 0; i < len(nums); i++ {
			if used[i] {
				continue
			}
			// A value equal to the one just abandoned at this depth would
			// rebuild the same permutation, so skip runs of equal values: a
			// duplicate may only be placed once its left twin is used.
			if i > 0 && nums[i] == nums[i-1] && !used[i-1] {
				continue
			}
			used[i] = true
			current = append(current, nums[i])
			backtrack()
			current = current[:len(current)-1]
			used[i] = false
		}
	}
	backtrack()
	return permutations
}
