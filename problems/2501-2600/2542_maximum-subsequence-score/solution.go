import "container/heap"
import "sort"

type minHeap []int64

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(int64)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func maxScore(nums1 []int, nums2 []int, k int) int64 {
	n := len(nums1)
	idx := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	sort.SliceStable(idx, func(a, b int) bool { return nums2[idx[a]] > nums2[idx[b]] })
	// The sort above sweeps indices in descending nums2 order, so everything
	// already seen has nums2 >= b: b is the minimum of any set drawn from
	// seen pairs, which is the element the sweep currently enumerates.
	h := &minHeap{}
	heap.Init(h)
	var total, best int64
	for _, j := range idx {
		a := int64(nums1[j])
		heap.Push(h, a)
		total += a
		// Min-heap of size k with a running sum holds the k largest nums1
		// seen so far; ejecting the smallest keeps the top-k sum correct.
		if h.Len() > k {
			total -= heap.Pop(h).(int64)
		}
		// With k companions available, total * nums2[j] is the best score
		// under the assumption that nums2[j] is the minimum; take the max
		// over the sweep. Ties in nums2 are safe: the last of them still
		// sees all the others in the heap.
		if h.Len() == k {
			b := total * int64(nums2[j])
			if b > best {
				best = b
			}
		}
	}
	return best
}
