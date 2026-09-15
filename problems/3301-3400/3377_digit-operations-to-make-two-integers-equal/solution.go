import (
	"container/heap"
	"strconv"
)

type costItem struct {
	cost int
	val  int
}

type costHeap []costItem

func (h costHeap) Len() int { return len(h) }
func (h costHeap) Less(i, j int) bool {
	return h[i].cost < h[j].cost || (h[i].cost == h[j].cost && h[i].val < h[j].val)
}
func (h costHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *costHeap) Push(x interface{}) { *h = append(*h, x.(costItem)) }
func (h *costHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func minOperations(n int, m int) int {
	// Every value n takes must be non-prime and keeps exactly len(n)
	// digits — decrementing a leading 1 is not a legal op — so the
	// states form a tiny graph: fewer than 1e4 nodes, at most 8
	// single-digit +-1 moves each. Dijkstra with the destination value
	// as the edge weight and the start value as the initial cost sums
	// every value n takes, original included (the example path
	// 10 -> 20 -> 21 -> 22 -> 12 costs 10+20+21+22+12 = 85). Each
	// state contributes its value at most once and weights are < 1e4,
	// so costs stay under 1e8 — safely inside 32-bit range.
	const limit = 10000
	isComp := make([]bool, limit)
	for i := 2; i < limit; i++ {
		if !isComp[i] {
			for j := i * i; j < limit; j += i {
				isComp[j] = true
			}
		}
	}
	isPrime := func(v int) bool { return v >= 2 && !isComp[v] }
	if isPrime(n) || isPrime(m) {
		return -1
	}
	top := 1
	for w := len(strconv.Itoa(n)); w > 1; w-- {
		top *= 10
	}
	dist := make([]int, limit)
	for i := range dist {
		dist[i] = -1
	}
	dist[n] = n
	h := &costHeap{{n, n}}
	for h.Len() > 0 {
		cur := heap.Pop(h).(costItem)
		if cur.cost > dist[cur.val] {
			continue
		}
		if cur.val == m {
			return cur.cost
		}
		for p := top; p >= 1; p /= 10 {
			digit := (cur.val / p) % 10
			relax := func(y int) {
				if isPrime(y) || (dist[y] >= 0 && dist[y] <= cur.cost+y) {
					return
				}
				dist[y] = cur.cost + y
				heap.Push(h, costItem{cur.cost + y, y})
			}
			if digit < 9 {
				relax(cur.val + p)
			}
			if digit > 0 && !(p == top && digit == 1) {
				relax(cur.val - p)
			}
		}
	}
	return -1
}
