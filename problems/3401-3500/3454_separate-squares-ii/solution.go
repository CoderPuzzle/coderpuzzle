import "sort"

type event struct {
	y, x1, x2 int64
	delta     int
}

func separateSquares(squares [][]int) float64 {
	n := len(squares)
	// compressed x-coordinates (square left and right edges)
	raw := make([]int64, 0, 2*n)
	for _, sq := range squares {
		raw = append(raw, int64(sq[0]), int64(sq[0])+int64(sq[2]))
	}
	sort.Slice(raw, func(a, b int) bool { return raw[a] < raw[b] })
	xs := make([]int64, 0, len(raw))
	for _, v := range raw {
		if len(xs) == 0 || xs[len(xs)-1] != v {
			xs = append(xs, v)
		}
	}
	m := len(xs)
	index := make(map[int64]int, m)
	for i, v := range xs {
		index[v] = i
	}

	// y-sweep events: square bottom (+1) and top (-1)
	events := make([]event, 0, 2*n)
	for _, sq := range squares {
		x := int64(sq[0])
		l := int64(sq[2])
		events = append(events,
			event{int64(sq[1]), x, x + l, 1},
			event{int64(sq[1]) + l, x, x + l, -1},
		)
	}
	sort.Slice(events, func(a, b int) bool { return events[a].y < events[b].y })

	count := make([]int, 4*m)
	cover := make([]int64, 4*m)
	var update func(node, lo, hi, i, j, delta int)
	update = func(node, lo, hi, i, j, delta int) {
		if j <= lo || hi <= i {
			return
		}
		if i <= lo && hi <= j {
			count[node] += delta
		} else {
			mid := (lo + hi) / 2
			update(2*node, lo, mid, i, j, delta)
			update(2*node+1, mid, hi, i, j, delta)
		}
		if count[node] > 0 {
			cover[node] = xs[hi] - xs[lo]
		} else if hi-lo == 1 {
			cover[node] = 0
		} else {
			cover[node] = cover[2*node] + cover[2*node+1]
		}
	}

	// Pass 1: record every positive-width band and accumulate the total
	// covered (union) area — exact integer arithmetic throughout.
	type band struct {
		y0, y1, width, areaBefore int64
	}
	bands := make([]band, 0)
	var total int64
	k := 0
	for k < len(events) {
		y := events[k].y
		for k < len(events) && events[k].y == y {
			e := events[k]
			update(1, 0, m-1, index[e.x1], index[e.x2], e.delta)
			k++
		}
		if k < len(events) {
			if width := cover[1]; width > 0 {
				y1 := events[k].y
				bands = append(bands, band{y, y1, width, total})
				total += width * (y1 - y)
			}
		}
	}

	// Pass 2: the first band whose end reaches half of the total contains
	// the balance line; only here do we divide.
	var area int64
	for _, b := range bands {
		after := area + b.width*(b.y1-b.y0)
		if 2*after >= total {
			return float64(b.y0) + float64(total-2*area)/(2.0*float64(b.width))
		}
		area = after
	}
	return 0.0 // unreachable: at least one square covers positive area
}
