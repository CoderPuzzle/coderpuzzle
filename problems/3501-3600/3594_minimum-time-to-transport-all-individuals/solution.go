import (
	"container/heap"
	"math"
	"math/bits"
)

// state: people-at-base mask, stage, boat side; heap orders by leg time.
type transportState struct {
	dist float64
	mask int
	j    int
	side int
}

type transportHeap []transportState

func (h transportHeap) Len() int           { return len(h) }
func (h transportHeap) Less(i, j int) bool { return h[i].dist < h[j].dist }
func (h transportHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *transportHeap) Push(x interface{}) {
	*h = append(*h, x.(transportState))
}
func (h *transportHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

// Dijkstra over (people-at-base mask, stage, boat side). Every leg has a
// positive duration, so the first pop of a state is optimal. Base side:
// cross any subgroup of size <= k; the stage advances by floor(cross) % m.
// Destination side: one of the people already across rows back while anyone
// remains at the base.
func minTime(n int, k int, m int, time []int, mul []float64) float64 {
	full := 1<<n - 1
	// groups[mask] = subgroups of mask holding 1..k people.
	groups := make([][]int, full+1)
	for mask := 0; mask <= full; mask++ {
		for sub := mask; sub > 0; sub = (sub - 1) & mask {
			if bits.OnesCount(uint(sub)) <= k {
				groups[mask] = append(groups[mask], sub)
			}
		}
	}
	// mx[s] = largest time among s's members: it sets the crossing time.
	mx := make([]int, full+1)
	for i := 0; i < n; i++ {
		mx[1<<i] = time[i]
	}
	for s := 1; s <= full; s++ {
		low := s & -s
		if s != low {
			if mx[s^low] > mx[low] {
				mx[s] = mx[s^low]
			} else {
				mx[s] = mx[low]
			}
		}
	}
	// Leg durations precomputed as stored products: the array write rounds
	// each product to a double, so the relaxation below adds plain loads
	// (no multiply-add fusion can shift a total by an ulp).
	crossTab := make([]float64, (full+1)*m)
	for s := 1; s <= full; s++ {
		for j := 0; j < m; j++ {
			crossTab[s*m+j] = float64(mx[s]) * mul[j]
		}
	}
	retTab := make([]float64, n*m)
	for r := 0; r < n; r++ {
		for j := 0; j < m; j++ {
			retTab[r*m+j] = float64(time[r]) * mul[j]
		}
	}
	dist := make(map[int]float64)
	h := &transportHeap{{0.0, full, 0, 0}}
	ans := -1.0
	for h.Len() > 0 {
		top := heap.Pop(h).(transportState)
		d, mask, j, side := top.dist, top.mask, top.j, top.side
		key := mask<<4 | j<<1 | side
		if seen, ok := dist[key]; ok && seen < d {
			continue
		}
		if side == 0 {
			for _, s := range groups[mask] {
				cross := crossTab[s*m+j]
				nd := d + cross
				rest := mask ^ s
				if rest == 0 {
					// final crossing: nobody left behind, no return
					if ans < 0 || nd < ans {
						ans = nd
					}
				} else {
					nj := (j + int(math.Floor(cross))) % m
					nkey := rest<<4 | nj<<1 | 1
					if seen, ok := dist[nkey]; !ok || nd < seen {
						dist[nkey] = nd
						heap.Push(h, transportState{nd, rest, nj, 1})
					}
				}
			}
		} else {
			for r := 0; r < n; r++ {
				if mask>>r&1 == 1 {
					continue
				}
				ret := retTab[r*m+j]
				nj := (j + int(math.Floor(ret))) % m
				nkey := (mask|1<<r)<<4 | nj<<1
				nd := d + ret
				if seen, ok := dist[nkey]; !ok || nd < seen {
					dist[nkey] = nd
					heap.Push(h, transportState{nd, mask | 1<<r, nj, 0})
				}
			}
		}
	}
	return ans
}
