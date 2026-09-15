import "container/heap"

type pairItem struct {
	sum int64
	i   int
	j   int
}

type pairHeap []pairItem

func (h pairHeap) Len() int { return len(h) }
func (h pairHeap) Less(a, b int) bool {
	if h[a].sum != h[b].sum {
		return h[a].sum < h[b].sum
	}
	if h[a].i != h[b].i {
		return h[a].i < h[b].i
	}
	return h[a].j < h[b].j
}
func (h pairHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *pairHeap) Push(x interface{}) { *h = append(*h, x.(pairItem)) }
func (h *pairHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func kSmallestPairs(nums1 []int, nums2 []int, k int) [][]int {
	result := [][]int{}
	if len(nums1) == 0 || len(nums2) == 0 || k <= 0 {
		return result
	}
	h := &pairHeap{}
	// Seed each active row's minimum (nums1[i], nums2[0]); rows past
	// min(len(nums1), k) can never reach the k smallest.
	limit := len(nums1)
	if k < limit {
		limit = k
	}
	for i := 0; i < limit; i++ {
		*h = append(*h, pairItem{int64(nums1[i]) + int64(nums2[0]), i, 0})
	}
	heap.Init(h)
	for h.Len() > 0 && len(result) < k {
		top := heap.Pop(h).(pairItem)
		i, j := top.i, top.j
		// The popped pair's only unexplored successor in its row is
		// (i, j+1); pushing it keeps the heap holding the minimum of
		// every active row, so each pop yields the global minimum left.
		pair := []int{nums1[i], nums2[j]}
		result = append(result, pair)
		if j+1 < len(nums2) {
			heap.Push(h, pairItem{int64(nums1[i]) + int64(nums2[j+1]), i, j + 1})
		}
	}
	return result
}
