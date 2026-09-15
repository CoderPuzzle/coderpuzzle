import (
	"container/heap"
	"math/bits"
)

type spreadEntry []int64

type spreadHeap []spreadEntry

func (h spreadHeap) Len() int            { return len(h) }
func (h spreadHeap) Less(a, b int) bool  { return h[a][0] > h[b][0] }
func (h spreadHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *spreadHeap) Push(x interface{}) { *h = append(*h, x.(spreadEntry)) }
func (h *spreadHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func maxTotalValue(nums []int, k int) int64 {
	n := len(nums)
	// Sparse tables: level j holds the max/min of every window of length
	// 2^j, each derived from the previous level in one pass.
	levels := bits.Len(uint(n))
	maxTable := make([][]int, levels)
	minTable := make([][]int, levels)
	maxTable[0] = append([]int(nil), nums...)
	minTable[0] = append([]int(nil), nums...)
	for j := 1; j < levels; j++ {
		half := 1 << (j - 1)
		length := n - (1 << j) + 1
		maxTable[j] = make([]int, length)
		minTable[j] = make([]int, length)
		for i := 0; i < length; i++ {
			maxTable[j][i] = max(maxTable[j-1][i], maxTable[j-1][i+half])
			minTable[j][i] = min(minTable[j-1][i], minTable[j-1][i+half])
		}
	}
	logTable := make([]int, n+1)
	for i := 2; i <= n; i++ {
		logTable[i] = logTable[i>>1] + 1
	}
	// Two overlapping power-of-two windows cover [l, r].
	spread := func(l, r int) int64 {
		j := logTable[r-l+1]
		low := 1 << j
		hi := max(maxTable[j][l], maxTable[j][r-low+1])
		lo := min(minTable[j][l], minTable[j][r-low+1])
		return int64(hi - lo)
	}
	// Row l is non-increasing as r shrinks toward l, so the heap merges n
	// sorted rows and always holds each row's largest unseen entry.
	h := &spreadHeap{}
	for l := 0; l < n; l++ {
		heap.Push(h, spreadEntry{spread(l, n-1), int64(l), int64(n - 1)})
	}
	var total int64
	for picked := 0; picked < k; picked++ {
		top := heap.Pop(h).(spreadEntry)
		l := int(top[1])
		r := int(top[2])
		total += top[0]
		if r > l {
			heap.Push(h, spreadEntry{spread(l, r-1), int64(l), int64(r - 1)})
		}
	}
	return total
}
