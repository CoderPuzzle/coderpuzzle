import (
	"math"
	"sort"
)

func mincostToHireWorkers(quality []int, wage []int, k int) float64 {
	type worker struct {
		w, q int
	}
	workers := make([]worker, len(quality))
	for i := range quality {
		workers[i] = worker{w: wage[i], q: quality[i]}
	}
	sort.SliceStable(workers, func(i, j int) bool {
		return float64(workers[i].w)/float64(workers[i].q) < float64(workers[j].w)/float64(workers[j].q)
	})

	// Local max-heap of chosen qualities.
	heap := make([]int, 0, k+1)
	push := func(q int) {
		heap = append(heap, q)
		i := len(heap) - 1
		for i > 0 {
			p := (i - 1) / 2
			if heap[p] >= heap[i] {
				break
			}
			heap[p], heap[i] = heap[i], heap[p]
			i = p
		}
	}
	pop := func() int {
		top := heap[0]
		heap[0] = heap[len(heap)-1]
		heap = heap[:len(heap)-1]
		i := 0
		for {
			l, r, m := 2*i+1, 2*i+2, i
			if l < len(heap) && heap[l] > heap[m] {
				m = l
			}
			if r < len(heap) && heap[r] > heap[m] {
				m = r
			}
			if m == i {
				break
			}
			heap[i], heap[m] = heap[m], heap[i]
			i = m
		}
		return top
	}

	best := math.Inf(1)
	totalQuality := 0
	for _, wk := range workers {
		push(wk.q)
		totalQuality += wk.q
		if len(heap) > k {
			totalQuality -= pop()
		}
		if len(heap) == k {
			cost := float64(totalQuality) * (float64(wk.w) / float64(wk.q))
			if cost < best {
				best = cost
			}
		}
	}
	return best
}
