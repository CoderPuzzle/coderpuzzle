func sumSubarrayMins(arr []int) int {
	const MOD = 1000000007
	n := len(arr)
	left := make([]int, n)
	right := make([]int, n)
	stack := []int{}
	// left[i]: index of the previous strictly smaller element (pops >=),
	// with -1 letting the dominance span reach the left border.
	for i := 0; i < n; i++ {
		for len(stack) > 0 && arr[stack[len(stack)-1]] >= arr[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			left[i] = stack[len(stack)-1]
		} else {
			left[i] = -1
		}
		stack = append(stack, i)
	}
	stack = []int{}
	// right[i]: next smaller-or-equal element (pops only >). The
	// asymmetry attributes tied minima to the leftmost position, so
	// no subarray is counted twice; n spans to the right border.
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && arr[stack[len(stack)-1]] > arr[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			right[i] = stack[len(stack)-1]
		} else {
			right[i] = n
		}
		stack = append(stack, i)
	}
	// arr[i] is the minimum exactly when the subarray's endpoints lie in
	// (left[i], i] x [i, right[i]) — that product counts them all.
	total := int64(0)
	for i := 0; i < n; i++ {
		total += int64(arr[i]) * int64(i-left[i]) * int64(right[i]-i)
	}
	return int(total % MOD)
}
