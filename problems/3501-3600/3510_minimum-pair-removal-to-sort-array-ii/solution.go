import "container/heap"

type pairHeap [][3]int64

func (h pairHeap) Len() int { return len(h) }
func (h pairHeap) Less(i, j int) bool {
	return h[i][0] < h[j][0] || (h[i][0] == h[j][0] && h[i][1] < h[j][1])
}
func (h pairHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

func (h *pairHeap) Push(x interface{}) {
	*h = append(*h, x.([3]int64))
}

func (h *pairHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

// Simulate with a doubly linked list over the original indices and a
// min-heap of (sum, left, right). A pair is valid only if its left node is
// still alive and still points at its recorded right neighbour; stale
// entries are discarded when popped. A "bad count" of adjacent descents
// tells us when the array is non-decreasing.
func minimumPairRemoval(nums []int) int {
	n := len(nums)
	val := make([]int64, n)
	for i, v := range nums {
		val[i] = int64(v)
	}
	prev := make([]int, n)
	nxt := make([]int, n)
	for i := 0; i < n; i++ {
		prev[i] = i - 1
		nxt[i] = i + 1
	}
	nxt[n-1] = -1
	alive := make([]bool, n)
	for i := range alive {
		alive[i] = true
	}
	bad := 0
	for i := 0; i < n-1; i++ {
		if val[i] > val[nxt[i]] {
			bad++
		}
	}
	if bad == 0 {
		return 0
	}
	h := &pairHeap{}
	heap.Init(h)
	for i := 0; i < n-1; i++ {
		heap.Push(h, [3]int64{val[i] + val[i+1], int64(i), int64(i + 1)})
	}
	ops := 0
	for bad > 0 {
		top := heap.Pop(h).([3]int64)
		a := int(top[1])
		b := int(top[2])
		if !alive[a] || nxt[a] != b || val[a]+val[b] != top[0] {
			continue
		}
		pa := prev[a]
		nb := nxt[b]
		// Folding b into a replaces the three adjacencies (pa,a), (a,b) and
		// (b,nb) with (pa,a) and (a,nb), so adjust bad around them.
		if pa != -1 && val[pa] > val[a] {
			bad--
		}
		if val[a] > val[b] {
			bad--
		}
		if nb != -1 && val[b] > val[nb] {
			bad--
		}
		val[a] += val[b]
		alive[b] = false
		nxt[a] = nb
		if nb != -1 {
			prev[nb] = a
		}
		if pa != -1 && val[pa] > val[a] {
			bad++
		}
		if nb != -1 && val[a] > val[nb] {
			bad++
		}
		ops++
		if bad == 0 {
			break
		}
		if pa != -1 {
			heap.Push(h, [3]int64{val[pa] + val[a], int64(pa), int64(a)})
		}
		if nb != -1 {
			heap.Push(h, [3]int64{val[a] + val[nb], int64(a), int64(nb)})
		}
	}
	return ops
}
