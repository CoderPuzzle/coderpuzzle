import "container/heap"

// An int64 heap over packed (count, value) keys with a configurable
// order: packing is count * 2e9 + value, whose numeric order is exactly
// (count, value) order.
type pairHeap struct {
	data []int64
	max  bool
}

func (h *pairHeap) Len() int { return len(h.data) }
func (h *pairHeap) Less(i, j int) bool {
	if h.max {
		return h.data[i] > h.data[j]
	}
	return h.data[i] < h.data[j]
}
func (h *pairHeap) Swap(i, j int) { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *pairHeap) Push(x any)    { h.data = append(h.data, x.(int64)) }
func (h *pairHeap) Pop() any {
	old := h.data
	n := len(old)
	x := old[n-1]
	h.data = old[:n-1]
	return x
}

func findXSum(nums []int, k int, x int) []int64 {
	// TOP is a min-heap and REST a max-heap of (count, value) snapshots
	// of the live distinct values: TOP's peek is the worst kept pair,
	// REST's peek the best dropped one. Each slide moves at most two
	// pairs between the heaps, and `total` follows every membership
	// change, so one O(n log n) pass answers every window; stale
	// snapshots are skipped on peek and popped when surfaced.
	const pack = int64(2_000_000_001)
	packOf := func(count, value int64) int64 { return count*pack + value }
	cnt := func(key int64) int64 { return key / pack }
	val := func(key int64) int64 { return key % pack }
	const (
		TOP  = 0
		REST = 1
	)
	freq := make(map[int]int64)
	topHeap := &pairHeap{max: false}
	restHeap := &pairHeap{max: true}
	membership := make(map[int64]int)
	topSize := 0
	var total int64
	answer := make([]int64, 0, len(nums)-k+1)

	peekTop := func() int64 {
		for topHeap.Len() > 0 {
			key := topHeap.data[0]
			if role, ok := membership[key]; ok && role == TOP && freq[int(val(key))] == cnt(key) {
				return key
			}
			heap.Pop(topHeap)
		}
		return -1
	}
	peekRest := func() int64 {
		for restHeap.Len() > 0 {
			key := restHeap.data[0]
			if role, ok := membership[key]; ok && role == REST && freq[int(val(key))] == cnt(key) {
				return key
			}
			heap.Pop(restHeap)
		}
		return -1
	}
	erase := func(erasedCount, erasedValue int64) {
		key := packOf(erasedCount, erasedValue)
		role, ok := membership[key]
		if !ok {
			return
		}
		delete(membership, key)
		if role != TOP {
			return
		}
		topSize--
		total -= erasedCount * erasedValue
		for topSize < x {
			best := peekRest()
			if best < 0 {
				break
			}
			heap.Pop(restHeap)
			membership[best] = TOP
			heap.Push(topHeap, best)
			topSize++
			total += cnt(best) * val(best)
		}
	}
	place := func(placedCount, placedValue int64) {
		key := packOf(placedCount, placedValue)
		if topSize < x {
			membership[key] = TOP
			heap.Push(topHeap, key)
			topSize++
			total += placedCount * placedValue
			return
		}
		worst := peekTop()
		if key > worst {
			// the newcomer beats the worst kept pair: swap them
			membership[worst] = REST
			heap.Push(restHeap, worst)
			total -= cnt(worst) * val(worst)
			topSize--
			membership[key] = TOP
			heap.Push(topHeap, key)
			topSize++
			total += placedCount * placedValue
		} else {
			membership[key] = REST
			heap.Push(restHeap, key)
		}
	}

	for i := 0; i < len(nums); i++ {
		value := int64(nums[i])
		count := freq[int(value)]
		if count > 0 {
			erase(count, value)
		}
		freq[int(value)] = count + 1
		place(count+1, value)
		if i >= k {
			leaving := int64(nums[i-k])
			old := freq[int(leaving)]
			erase(old, leaving)
			old--
			freq[int(leaving)] = old
			if old > 0 {
				// a count that just reached 0 leaves no pair behind
				place(old, leaving)
			}
		}
		if i >= k-1 {
			answer = append(answer, total)
		}
	}
	return answer
}
