import (
	"container/heap"
	"sort"
)

type rightHeap []int

func (h rightHeap) Len() int            { return len(h) }
func (h rightHeap) Less(a, b int) bool  { return h[a] > h[b] }
func (h rightHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *rightHeap) Push(v interface{}) { *h = append(*h, v.(int)) }
func (h *rightHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func maxRemoval(nums []int, queries [][]int) int {
	// Sweep indices left to right with the queries sorted by start; a
	// max-heap by right endpoint holds the queries covering the current
	// index. Whenever the running coverage of already selected queries
	// falls short of nums[i], select the query reaching farthest right
	// and retire its coverage one step past r via a difference array.
	// Return -1 when the heap runs dry on a deficit.
	sort.Slice(queries, func(a, b int) bool { return queries[a][0] < queries[b][0] })
	rights := &rightHeap{}
	delta := make([]int, len(nums)+1)
	cover := 0
	selected := 0
	j := 0
	for i, need := range nums {
		cover += delta[i]
		for j < len(queries) && queries[j][0] <= i {
			heap.Push(rights, queries[j][1])
			j++
		}
		for cover < need {
			for rights.Len() > 0 && (*rights)[0] < i {
				heap.Pop(rights)
			}
			if rights.Len() == 0 {
				return -1
			}
			r := heap.Pop(rights).(int)
			cover++
			delta[r+1]--
			selected++
		}
	}
	return len(queries) - selected
}
