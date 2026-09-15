import "container/heap"

type maxHeap3275 struct {
	data []int64
}

func (h *maxHeap3275) Len() int           { return len(h.data) }
func (h *maxHeap3275) Less(i, j int) bool { return h.data[i] > h.data[j] }
func (h *maxHeap3275) Swap(i, j int)      { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *maxHeap3275) Push(x interface{}) { h.data = append(h.data, x.(int64)) }
func (h *maxHeap3275) Pop() interface{} {
	old := h.data
	n := len(old)
	x := old[n-1]
	h.data = old[:n-1]
	return x
}

func abs64(x int64) int64 {
	if x < 0 {
		return -x
	}
	return x
}

func resultsArray(queries [][]int, k int) []int {
	// Max-heap of the k smallest distances so far; its root is the kth
	// nearest once k obstacles have arrived. Distances reach 2 * 10^9,
	// beyond int32, so they are computed and stored as int64.
	h := &maxHeap3275{}
	result := make([]int, len(queries))
	for i, query := range queries {
		d := abs64(int64(query[0])) + abs64(int64(query[1]))
		if h.Len() < k {
			heap.Push(h, d)
		} else if h.data[0] > d {
			heap.Pop(h)
			heap.Push(h, d)
		}
		if h.Len() == k {
			result[i] = int(h.data[0])
		} else {
			result[i] = -1
		}
	}
	return result
}
