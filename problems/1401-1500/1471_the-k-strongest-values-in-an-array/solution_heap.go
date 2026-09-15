import (
	"container/heap"
	"sort"
)

// itemHeap holds {distance, value, index} entries ordered so the root is
// the weakest keeper: shortest distance, then smallest value, then latest
// index — a later duplicate can never outrank an earlier one.
type itemHeap [][3]int

func (h itemHeap) Len() int { return len(h) }
func (h itemHeap) Less(i, j int) bool {
	if h[i][0] != h[j][0] {
		return h[i][0] < h[j][0]
	}
	if h[i][1] != h[j][1] {
		return h[i][1] < h[j][1]
	}
	return h[i][2] > h[j][2]
}
func (h itemHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *itemHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *itemHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func getStrongest(arr []int, k int) []int {
	sortedArr := make([]int, len(arr))
	copy(sortedArr, arr)
	sort.Ints(sortedArr)
	m := sortedArr[(len(arr)-1)/2]
	h := &itemHeap{}
	for i, v := range arr {
		d := v - m
		if d < 0 {
			d = -d
		}
		entry := [3]int{d, v, i}
		if h.Len() < k {
			heap.Push(h, entry)
			continue
		}
		root := (*h)[0]
		// Replace the root only when the newcomer is strictly mightier:
		// longer distance, or larger value on a distance tie (an exact
		// duplicate never displaces an earlier index).
		if entry[0] > root[0] || (entry[0] == root[0] && entry[1] > root[1]) ||
			(entry[0] == root[0] && entry[1] == root[1] && entry[2] < root[2]) {
			heap.Pop(h)
			heap.Push(h, entry)
		}
	}
	survivors := append([][3]int(nil), *h...)
	// The heap holds the top k; emit them by original index.
	sort.Slice(survivors, func(i, j int) bool { return survivors[i][2] < survivors[j][2] })
	result := make([]int, 0, k)
	for _, entry := range survivors {
		result = append(result, entry[1])
	}
	return result
}
