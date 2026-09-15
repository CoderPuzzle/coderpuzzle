import "container/heap"

// liveHeap orders (-value, index) pairs so the root is the largest
// usable value.
type liveHeap [][2]int

func (h liveHeap) Len() int { return len(h) }
func (h liveHeap) Less(i, j int) bool {
	if h[i][0] != h[j][0] {
		return h[i][0] < h[j][0]
	}
	return h[i][1] < h[j][1]
}
func (h liveHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *liveHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *liveHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

// An element unlocks when step reaches its threshold and stays usable
// forever after. Bucket indices by unlock step; everything at threshold
// 1 starts in the max-heap of usable values.
func maxSum(nums []int, threshold []int) int64 {
	n := len(nums)
	waiting := make([][]int, n+1)
	live := &liveHeap{}
	for i := 0; i < n; i++ {
		if threshold[i] <= 1 {
			*live = append(*live, [2]int{-nums[i], i})
		} else {
			waiting[threshold[i]] = append(waiting[threshold[i]], i)
		}
	}
	heap.Init(live)
	var total int64
	step := 1
	for {
		// Fold in this step's unlocks, then stop if nothing is usable.
		if step <= n {
			for _, i := range waiting[step] {
				heap.Push(live, [2]int{-nums[i], i})
			}
		}
		if live.Len() == 0 {
			break
		}
		total += int64(-(*live)[0][0])
		heap.Pop(live)
		step++
	}
	return total
}
