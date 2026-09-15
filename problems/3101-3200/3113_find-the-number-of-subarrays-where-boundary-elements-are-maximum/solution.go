import "sort"

func numberOfSubarrays(nums []int) int64 {
	n := len(nums)
	// leftGreater[i]: nearest index to the left with a strictly greater value
	leftGreater := make([]int, n)
	stack := make([]int, 0, n)
	for i, x := range nums {
		// values <= x can never be the nearest greater for a later element
		for len(stack) > 0 && nums[stack[len(stack)-1]] <= x {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			leftGreater[i] = stack[len(stack)-1]
		} else {
			leftGreater[i] = -1
		}
		stack = append(stack, i)
	}

	// earlier positions of each value, always appended in increasing order
	positions := make(map[int][]int)
	var ans int64
	for i, x := range nums {
		lst := positions[x]
		if lst == nil {
			lst = []int{}
			positions[x] = lst
		}
		// SearchInts with lg+1 acts as bisect_right: starts beyond leftGreater[i]
		lo := sort.SearchInts(lst, leftGreater[i]+1)
		// equal-value starts beyond leftGreater[i], plus the singleton [i..i]
		count := int64(1 + len(lst) - lo)
		ans += count
		positions[x] = append(lst, i)
	}
	return ans
}
