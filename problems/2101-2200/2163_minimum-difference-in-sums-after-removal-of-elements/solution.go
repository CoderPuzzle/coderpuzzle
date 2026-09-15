func minimumDifference(nums []int) int64 {
	total := len(nums)
	n := total / 3

	// Binary heap helpers over []int; `greater` selects max-heap vs min-heap.
	push := func(h *[]int, v int, greater func(a, b int) bool) {
		*h = append(*h, v)
		c := len(*h) - 1
		for c > 0 {
			p := (c - 1) / 2
			if greater((*h)[c], (*h)[p]) {
				(*h)[p], (*h)[c] = (*h)[c], (*h)[p]
				c = p
			} else {
				break
			}
		}
	}
	pop := func(h *[]int, greater func(a, b int) bool) int {
		top := (*h)[0]
		last := len(*h) - 1
		root := (*h)[last]
		*h = (*h)[:last]
		if last > 0 {
			(*h)[0] = root
			i := 0
			for {
				l := 2*i + 1
				if l >= len(*h) {
					break
				}
				m := l
				if l+1 < len(*h) && greater((*h)[l+1], (*h)[l]) {
					m = l + 1
				}
				if greater((*h)[m], (*h)[i]) {
					(*h)[i], (*h)[m] = (*h)[m], (*h)[i]
					i = m
				} else {
					break
				}
			}
		}
		return top
	}
	gt := func(a, b int) bool { return a > b } // max-heap
	lt := func(a, b int) bool { return a < b } // min-heap

	// left_min[i] = sum of the n smallest values among nums[0..i] (valid when i >= n-1)
	leftMin := make([]int64, total)
	heap := make([]int, 0, n+1) // keeps the n smallest so far
	var running int64 = 0
	for i := 0; i < total; i++ {
		value := nums[i]
		push(&heap, value, gt)
		running += int64(value)
		if len(heap) > n {
			running -= int64(pop(&heap, gt)) // drop the largest kept
		}
		if len(heap) == n {
			leftMin[i] = running
		}
	}

	// right_max[i] = sum of the n largest values among nums[i..] (valid when total - i >= n)
	rightMax := make([]int64, total)
	heap2 := make([]int, 0, n+1) // keeps the n largest so far
	var running2 int64 = 0
	for i := total - 1; i >= 0; i-- {
		value := nums[i]
		push(&heap2, value, lt)
		running2 += int64(value)
		if len(heap2) > n {
			running2 -= int64(pop(&heap2, lt)) // drop the smallest kept
		}
		if len(heap2) == n {
			rightMax[i] = running2
		}
	}

	hasAnswer := false
	var answer int64 = 0
	for i := n - 1; i <= 2*n-1; i++ {
		candidate := leftMin[i] - rightMax[i+1]
		if !hasAnswer || candidate < answer {
			answer = candidate
			hasAnswer = true
		}
	}
	return answer
}
