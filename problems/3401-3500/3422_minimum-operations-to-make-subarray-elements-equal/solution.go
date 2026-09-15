import "container/heap"

type keyHeap []int64

func (h keyHeap) Len() int            { return len(h) }
func (h keyHeap) Less(a, b int) bool  { return h[a] < h[b] }
func (h keyHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *keyHeap) Push(x interface{}) { *h = append(*h, x.(int64)) }
func (h *keyHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func minOperations(nums []int, k int) int64 {
	// Equalizing a window costs sum(|x - t|), minimized at a median t. The
	// window slides over two min-heap halves -- low holds negated keys,
	// high raw keys -- with running half-sums making each window's cost
	// O(1). Every element packs to the unique key (v + 2^20) << 17 | index
	// so heap keys never tie, which makes lazy deletion exact: the outgoing
	// element routes to its true half by one comparison against the low
	// top, and stale copies are dropped only when they surface at a top.
	n := len(nums)
	low := &keyHeap{}  // negated keys: min-heap of negatives = max-heap
	high := &keyHeap{} // raw keys
	delayed := make([]byte, n)
	lowSize, highSize := 0, 0
	lowSum, highSum := int64(0), int64(0)
	best := int64(1) << 62 // above any achievable cost (<= 2e11)

	pruneLow := func() {
		for low.Len() > 0 {
			idx := (-(*low)[0]) & 131071
			if delayed[idx] == 0 {
				break
			}
			delayed[idx] = 0
			heap.Pop(low)
		}
	}
	pruneHigh := func() {
		for high.Len() > 0 {
			idx := (*high)[0] & 131071
			if delayed[idx] == 0 {
				break
			}
			delayed[idx] = 0
			heap.Pop(high)
		}
	}

	for i := 0; i < n; i++ {
		if i >= k {
			outKey := (int64(nums[i-k])+1048576)<<17 | int64(i-k)
			delayed[i-k] = 1
			if outKey <= -(*low)[0] {
				lowSize--
				lowSum -= int64(nums[i-k])
			} else {
				highSize--
				highSum -= int64(nums[i-k])
			}
		}
		key := (int64(nums[i])+1048576)<<17 | int64(i)
		if (lowSize == 0 && highSize == 0) || key <= -(*low)[0] {
			heap.Push(low, -key)
			lowSize++
			lowSum += int64(nums[i])
		} else {
			heap.Push(high, key)
			highSize++
			highSum += int64(nums[i])
		}
		if lowSize > highSize+1 {
			pruneLow()
			move := -heap.Pop(low).(int64)
			lowSize--
			lowSum -= (move >> 17) - 1048576
			heap.Push(high, move)
			highSize++
			highSum += (move >> 17) - 1048576
		} else if lowSize < highSize {
			pruneHigh()
			move := heap.Pop(high).(int64)
			highSize--
			highSum -= (move >> 17) - 1048576
			heap.Push(low, -move)
			lowSize++
			lowSum += (move >> 17) - 1048576
		}
		if i >= k-1 {
			pruneLow()
			pruneHigh()
			median := (-(*low)[0] >> 17) - 1048576
			cost := median*int64(lowSize) - lowSum + (highSum - median*int64(highSize))
			if cost < best {
				best = cost
			}
		}
	}
	return best
}
