import (
	"container/heap"
	"sort"
)

type worker struct{ cost, idx int }

type workerHeap []worker

func (h workerHeap) Len() int { return len(h) }
func (h workerHeap) Less(i, j int) bool {
	if h[i].cost != h[j].cost {
		return h[i].cost < h[j].cost
	}
	return h[i].idx < h[j].idx
}
func (h workerHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *workerHeap) Push(x interface{}) { *h = append(*h, x.(worker)) }
func (h *workerHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

func totalCost(costs []int, k int, candidates int) int64 {
	n := len(costs)
	// Windows overlap => every remaining worker is always eligible, so
	// the greedy is just "hire the k cheapest overall".
	if 2*candidates >= n {
		sorted := make([]int, n)
		copy(sorted, costs)
		sort.Ints(sorted)
		var total int64
		for i := 0; i < k; i++ {
			total += int64(sorted[i])
		}
		return total
	}
	// Heaps hold {cost, idx}: order breaks cost ties by smaller index.
	// left = front window, right = back window.
	left := &workerHeap{}
	right := &workerHeap{}
	for i := 0; i < candidates; i++ {
		*left = append(*left, worker{costs[i], i})
	}
	for i := n - candidates; i < n; i++ {
		*right = append(*right, worker{costs[i], i})
	}
	heap.Init(left)
	heap.Init(right)
	// i feeds left and j feeds right from the untouched middle; i <= j
	// guards against inserting a middle worker twice.
	i, j := candidates, n-candidates-1
	var total int64
	for t := 0; t < k; t++ {
		// Cheaper top wins; the tie comparison prefers left.
		takeLeft := right.Len() == 0
		if !takeLeft && left.Len() > 0 {
			l, r := (*left)[0], (*right)[0]
			if l.cost < r.cost || (l.cost == r.cost && l.idx <= r.idx) {
				takeLeft = true
			}
		}
		if takeLeft {
			w := heap.Pop(left).(worker)
			total += int64(w.cost)
			if i <= j {
				heap.Push(left, worker{costs[i], i})
				i++
			}
		} else {
			w := heap.Pop(right).(worker)
			total += int64(w.cost)
			if i <= j {
				heap.Push(right, worker{costs[j], j})
				j--
			}
		}
	}
	return total
}
