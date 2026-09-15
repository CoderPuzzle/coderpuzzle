import (
	"container/heap"
	"sort"
)

type minHeap3478 struct {
	data []int
}

func (h *minHeap3478) Len() int           { return len(h.data) }
func (h *minHeap3478) Less(i, j int) bool { return h.data[i] < h.data[j] }
func (h *minHeap3478) Swap(i, j int)      { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *minHeap3478) Push(x interface{}) { h.data = append(h.data, x.(int)) }
func (h *minHeap3478) Pop() interface{} {
	old := h.data
	n := len(old)
	x := old[n-1]
	h.data = old[:n-1]
	return x
}

func findMaxSum(nums1 []int, nums2 []int, k int) []int {
	n := len(nums1)
	indices := make([]int, n)
	for i := range indices {
		indices[i] = i
	}
	// sweep indices by increasing nums1: each query pools the strictly smaller values
	sort.Slice(indices, func(a, b int) bool { return nums1[indices[a]] < nums1[indices[b]] })
	h := &minHeap3478{}
	total := 0
	result := make([]int, n)
	i := 0
	for i < n {
		j := i
		for j < n && nums1[indices[j]] == nums1[indices[i]] {
			j++
		}
		// strict <: the equal-value block is answered before its own values join
		for t := i; t < j; t++ {
			result[indices[t]] = total
		}
		// pool invariant: the heap holds the top-k nums2 so far, total their sum
		for t := i; t < j; t++ {
			// evict the current minimum only when the newcomer beats it
			val := nums2[indices[t]]
			if h.Len() < k {
				heap.Push(h, val)
				total += val
			} else if val > h.data[0] {
				total += val - h.data[0]
				heap.Pop(h)
				heap.Push(h, val)
			}
		}
		i = j
	}
	return result
}
