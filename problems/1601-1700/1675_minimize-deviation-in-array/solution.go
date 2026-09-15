import "container/heap"

type deviationHeap []int

func (h deviationHeap) Len() int           { return len(h) }
func (h deviationHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h deviationHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *deviationHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}
func (h *deviationHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func minimumDeviation(nums []int) int {
	h := &deviationHeap{}
	// Normalize: odd values are doubled once — their only upward move —
	// so afterwards every element can only shrink by halving, and every
	// reachable configuration is still visited.
	currentMin := int(^uint(0) >> 1)
	for _, v := range nums {
		m := v
		if v%2 == 1 {
			m = v * 2
		}
		heap.Push(h, m)
		// The heap yields the maximum; the minimum is tracked separately.
		if m < currentMin {
			currentMin = m
		}
	}
	// Snapshot the untouched configuration before any halving.
	best := (*h)[0] - currentMin
	// An even maximum can still be halved; once the maximum is odd
	// nothing can grow, so the deviation can never improve again.
	for (*h)[0]%2 == 0 {
		half := (*h)[0] / 2
		heap.Pop(h)
		heap.Push(h, half)
		if half < currentMin {
			currentMin = half
		}
		// Re-check max − min after each halving.
		if d := (*h)[0] - currentMin; d < best {
			best = d
		}
	}
	return best
}
