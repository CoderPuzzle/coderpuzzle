import "container/heap"

type idCount struct {
	count int64
	id    int
}

type countMaxHeap []idCount

func (h countMaxHeap) Len() int            { return len(h) }
func (h countMaxHeap) Less(a, b int) bool  { return h[a].count > h[b].count }
func (h countMaxHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *countMaxHeap) Push(x interface{}) { *h = append(*h, x.(idCount)) }
func (h *countMaxHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func mostFrequentIDs(nums []int, freq []int) []int64 {
	// Only one ID's count moves per step, so a lazy max-heap of (count, id)
	// snapshots answers "most frequent" without ever hunting down the
	// previous snapshot: push the touched ID's new count, then pop entries
	// whose count no longer matches the live table. A count can reach
	// 10^5 * 10^5 = 10^10, beyond int32, so counts are int64.
	counts := make([]int64, 100001)
	snapshots := &countMaxHeap{}
	answer := make([]int64, 0, len(nums))
	for i, ident := range nums {
		counts[ident] += int64(freq[i])
		heap.Push(snapshots, idCount{counts[ident], ident})
		for snapshots.Len() > 0 && (*snapshots)[0].count != counts[(*snapshots)[0].id] {
			heap.Pop(snapshots)
		}
		answer = append(answer, (*snapshots)[0].count)
	}
	return answer
}
