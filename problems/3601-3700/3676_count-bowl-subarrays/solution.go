// A bowl is pinned by the maximum sitting strictly between its rims: that
// element needs a strictly greater neighbour on both sides, and those
// nearest greater elements are exactly the two rims. Sweep left to right
// with a decreasing stack — when a value pops an entry, it is that entry's
// next greater element and what remains beneath names its previous greater
// one. The pop is a bowl unless the stack emptied, i.e. no greater element
// on the left; entries never popped never meet a greater element at all.
func bowlSubarrays(nums []int) int64 {
	count := int64(0)
	stack := make([]int, 0, len(nums))
	for _, x := range nums {
		for len(stack) > 0 && stack[len(stack)-1] < x {
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				count++
			}
		}
		stack = append(stack, x)
	}
	return count
}
