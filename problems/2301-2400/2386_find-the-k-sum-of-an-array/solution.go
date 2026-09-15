import (
	"container/heap"
	"sort"
)

type kSumPair struct {
	s int64
	i int
}

type kSumHeap []kSumPair

func (h kSumHeap) Len() int { return len(h) }
func (h kSumHeap) Less(a, b int) bool {
	if h[a].s != h[b].s {
		return h[a].s < h[b].s
	}
	return h[a].i < h[b].i
}
func (h kSumHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *kSumHeap) Push(x interface{}) { *h = append(*h, x.(kSumPair)) }
func (h *kSumHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func kSum(nums []int, k int) int64 {
	// every subsequence sum = base - (subset sum of absolute values)
	var base int64
	for _, x := range nums {
		if x > 0 {
			base += int64(x)
		}
	}
	costs := make([]int64, len(nums))
	for i, x := range nums {
		if x < 0 {
			costs[i] = int64(-x)
		} else {
			costs[i] = int64(x)
		}
	}
	sort.Slice(costs, func(a, b int) bool { return costs[a] < costs[b] })
	if k == 1 {
		return base
	}
	n := len(costs)
	h := &kSumHeap{{costs[0], 0}}
	heap.Init(h)
	count := int64(1) // empty subset (sum 0) is the 1st smallest
	for count < int64(k) {
		top := heap.Pop(h).(kSumPair)
		cur, idx := top.s, top.i
		count++
		if count == int64(k) {
			return base - cur
		}
		if idx+1 < n {
			heap.Push(h, kSumPair{cur - costs[idx] + costs[idx+1], idx + 1})
			heap.Push(h, kSumPair{cur + costs[idx+1], idx + 1})
		}
	}
	return base
}
