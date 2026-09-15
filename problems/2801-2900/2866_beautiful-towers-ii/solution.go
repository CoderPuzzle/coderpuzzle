// One monotonic-index sweep per side: popping every strictly taller index
// before i leaves j, the nearest index with maxHeights[j] <=
// maxHeights[i]; towers j+1..i clip to the peak height while the prefix up
// to j keeps its own best mountain, so
// left[i] = left[j] + maxHeights[i] * (i - j). Sums reach
// n * max(maxHeights[i]) = 10^5 * 10^9 = 10^14, past int32 range, so they
// are widened to int64; no intermediate exceeds that, far below the
// ~9.2 * 10^18 int64 ceiling.
func maximumSumOfHeights(maxHeights []int) int64 {
	n := len(maxHeights)
	left := make([]int64, n)
	right := make([]int64, n)
	stack := []int{}
	for i := 0; i < n; i++ {
		h := int64(maxHeights[i])
		for len(stack) > 0 && int64(maxHeights[stack[len(stack)-1]]) > h {
			stack = stack[:len(stack)-1]
		}
		if len(stack) == 0 {
			left[i] = h * int64(i+1)
		} else {
			j := stack[len(stack)-1]
			left[i] = left[j] + h*int64(i-j)
		}
		stack = append(stack, i)
	}
	stack = stack[:0]
	for i := n - 1; i >= 0; i-- {
		h := int64(maxHeights[i])
		for len(stack) > 0 && int64(maxHeights[stack[len(stack)-1]]) > h {
			stack = stack[:len(stack)-1]
		}
		if len(stack) == 0 {
			right[i] = h * int64(n-i)
		} else {
			j := stack[len(stack)-1]
			right[i] = right[j] + h*int64(j-i)
		}
		stack = append(stack, i)
	}
	best := int64(0)
	for i := 0; i < n; i++ {
		if s := left[i] + right[i] - int64(maxHeights[i]); s > best {
			best = s
		}
	}
	return best
}
