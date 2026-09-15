import (
	"container/heap"
	"sort"
)

// itemHeap holds [value, count] entries ordered so the root is the
// weakest keeper: smallest count, and among equal counts the largest
// value — eviction order mirrors the final ranking.
type itemHeap [][2]int

func (h itemHeap) Len() int { return len(h) }
func (h itemHeap) Less(i, j int) bool {
	if h[i][1] != h[j][1] {
		return h[i][1] < h[j][1]
	}
	return h[i][0] > h[j][0]
}
func (h itemHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *itemHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *itemHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func topKFrequent(nums []int, k int) []int {
	// One counting pass over the array.
	counts := make(map[int]int)
	for _, x := range nums {
		counts[x]++
	}
	h := &itemHeap{}
	for value, count := range counts {
		item := [2]int{value, count}
		if h.Len() < k {
			heap.Push(h, item)
			continue
		}
		root := (*h)[0]
		// Replace the root only when the newcomer outranks it: higher
		// count, or equal count and smaller value.
		if count > root[1] || (count == root[1] && value < root[0]) {
			heap.Pop(h)
			heap.Push(h, item)
		}
	}
	survivors := append([][2]int(nil), *h...)
	// Survivors are exactly the top k by (higher count, then smaller
	// value); emit them in that order.
	sort.Slice(survivors, func(i, j int) bool {
		if survivors[i][1] != survivors[j][1] {
			return survivors[i][1] > survivors[j][1]
		}
		return survivors[i][0] < survivors[j][0]
	})
	result := make([]int, 0, k)
	for i := 0; i < k && i < len(survivors); i++ {
		result = append(result, survivors[i][0])
	}
	return result
}
