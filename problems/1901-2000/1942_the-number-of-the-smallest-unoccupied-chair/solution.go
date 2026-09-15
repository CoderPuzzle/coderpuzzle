import "sort"

type chairHeap struct {
	a []int64
}

func (h *chairHeap) push(v int64) {
	h.a = append(h.a, v)
	i := len(h.a) - 1
	for i > 0 {
		p := (i - 1) / 2
		if h.a[p] <= h.a[i] {
			break
		}
		h.a[p], h.a[i] = h.a[i], h.a[p]
		i = p
	}
}

func (h *chairHeap) pop() int64 {
	top := h.a[0]
	last := h.a[len(h.a)-1]
	h.a = h.a[:len(h.a)-1]
	if len(h.a) > 0 {
		h.a[0] = last
		i := 0
		for {
			l := 2*i + 1
			r := l + 1
			s := i
			if l < len(h.a) && h.a[l] < h.a[s] {
				s = l
			}
			if r < len(h.a) && h.a[r] < h.a[s] {
				s = r
			}
			if s == i {
				break
			}
			h.a[s], h.a[i] = h.a[i], h.a[s]
			i = s
		}
	}
	return top
}

func smallestChair(times [][]int, targetFriend int) int {
	n := len(times)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		return times[order[a]][0] < times[order[b]][0]
	})
	// occupied: min-heap of encoded values leaving<<32 | chair
	occupied := &chairHeap{}
	free := &chairHeap{}
	nextChair := 0
	for _, i := range order {
		arrival := times[i][0]
		leaving := times[i][1]
		for len(occupied.a) > 0 && occupied.a[0]>>32 <= int64(arrival) {
			chair := occupied.pop()
			free.push(chair & 0xFFFFFFFF)
		}
		var chair int
		if len(free.a) > 0 {
			chair = int(free.pop())
		} else {
			chair = nextChair
			nextChair++
		}
		if i == targetFriend {
			return chair
		}
		occupied.push(int64(leaving)<<32 | int64(chair))
	}
	return -1
}
