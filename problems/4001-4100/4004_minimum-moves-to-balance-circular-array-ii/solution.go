// Parametric wrap cut: fix the signed flow t across the wrap edge, cost is
// |t| plus the minimum internal path flow; the total is convex in t, so a
// binary search finds the integer minimizer. The inner cost sweeps positions
// keeping the convex suffix-min envelope of the DP as a constant plus
// rising-flank breakpoints.
import "container/heap"

type breakpointHeap []int64

func (h breakpointHeap) Len() int           { return len(h) }
func (h breakpointHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h breakpointHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *breakpointHeap) Push(x interface{}) {
	*h = append(*h, x.(int64))
}
func (h *breakpointHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func lineCost(balance []int, t int64) int64 {
	n := int64(len(balance))
	cost := int64(0)
	var delta int64
	bp := &breakpointHeap{}
	for k := int64(0); k < n-1; k++ {
		delta += int64(balance[k])
		cap := delta
		z := -t
		if bp.Len() > 0 {
			low := (*bp)[0] + delta
			if z <= low {
				heap.Push(bp, z-delta)
			} else if z <= cap {
				// valley below the current minimum: consume it and split
				// the flank in two inside the support
				cost += z - low
				heap.Pop(bp)
				heap.Push(bp, z-delta)
				heap.Push(bp, z-delta)
			} else {
				// valley beyond the capped support: lowest breakpoint is
				// absorbed into the constant
				cost += z - low
				heap.Pop(bp)
			}
		} else if z <= cap {
			heap.Push(bp, z-delta)
		} else {
			cost += z - cap
		}
	}
	limit := -int64(balance[len(balance)-1])
	for bp.Len() > 0 && (*bp)[0]+delta < limit {
		cost += limit - ((*bp)[0] + delta)
		heap.Pop(bp)
	}
	return cost
}

func total(balance []int, t int64) int64 {
	if t < 0 {
		return -t + lineCost(balance, t)
	}
	return t + lineCost(balance, t)
}

func minMoves(balance []int) int64 {
	n := len(balance)
	sum := int64(0)
	for _, x := range balance {
		sum += int64(x)
	}
	if sum < 0 {
		return -1
	}
	if n == 1 {
		return 0
	}
	bound := total(balance, 0)
	lo, hi := -bound, bound
	for lo < hi {
		mid := lo + (hi-lo)/2
		if total(balance, mid) <= total(balance, mid+1) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return total(balance, lo)
}
