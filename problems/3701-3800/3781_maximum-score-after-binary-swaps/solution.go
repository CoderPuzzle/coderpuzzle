import "container/heap"

type maxHeap3781 struct {
	data []int64
}

func (h *maxHeap3781) Len() int           { return len(h.data) }
func (h *maxHeap3781) Less(i, j int) bool { return h.data[i] > h.data[j] }
func (h *maxHeap3781) Swap(i, j int)      { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *maxHeap3781) Push(x interface{}) { h.data = append(h.data, x.(int64)) }
func (h *maxHeap3781) Pop() interface{} {
	old := h.data
	n := len(old)
	x := old[n-1]
	h.data = old[:n-1]
	return x
}

func maximumScore(nums []int, s string) int64 {
	// Sweep left to right pushing every value as a candidate final slot;
	// the '1' met at index i claims the best slot offered so far. The
	// score peaks at 10^5 * 10^9 = 10^14, so it accumulates in an int64.
	h := &maxHeap3781{}
	var answer int64
	for i := 0; i < len(nums); i++ {
		heap.Push(h, int64(nums[i]))
		if s[i] == '1' {
			answer += h.data[0]
			heap.Pop(h)
		}
	}
	return answer
}
