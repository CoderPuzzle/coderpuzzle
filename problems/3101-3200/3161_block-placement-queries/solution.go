import "sort"

// Segment tree over starts 0..span-1 holding each start's free run d[i];
// tag 0 means untagged because every real obstacle distance is >= 1.
type gapTree struct {
	mx   []int
	tag  []int
	span int
}

func newGapTree(span int) *gapTree {
	t := &gapTree{mx: make([]int, 4*span), tag: make([]int, 4*span), span: span}
	t.build(1, 0, span-1)
	return t
}

func (t *gapTree) build(node, lo, hi int) {
	if lo == hi {
		// No obstacle yet: read the run as reaching past span, which
		// stays above any achievable sz without inventing blockage.
		t.mx[node] = t.span - lo
		return
	}
	mid := (lo + hi) / 2
	t.build(node*2, lo, mid)
	t.build(node*2+1, mid+1, hi)
	if t.mx[node*2+1] > t.mx[node*2] {
		t.mx[node] = t.mx[node*2+1]
	} else {
		t.mx[node] = t.mx[node*2]
	}
}

// assign lays an obstacle at t over [ql, qr]: the run t - i shrinks as i
// grows, so the gap's best sits left.
func (t *gapTree) applyTo(node, lo, ob int) {
	t.tag[node] = ob
	t.mx[node] = ob - lo
}

func (t *gapTree) pushDown(node, lo, mid int) {
	if t.tag[node] != 0 {
		t.applyTo(node*2, lo, t.tag[node])
		t.applyTo(node*2+1, mid+1, t.tag[node])
		t.tag[node] = 0
	}
}

func (t *gapTree) assign(node, lo, hi, ql, qr, ob int) {
	if qr < lo || hi < ql {
		return
	}
	if ql <= lo && hi <= qr {
		t.applyTo(node, lo, ob)
		return
	}
	mid := (lo + hi) / 2
	t.pushDown(node, lo, mid)
	t.assign(node*2, lo, mid, ql, qr, ob)
	t.assign(node*2+1, mid+1, hi, ql, qr, ob)
	if t.mx[node*2+1] > t.mx[node*2] {
		t.mx[node] = t.mx[node*2+1]
	} else {
		t.mx[node] = t.mx[node*2]
	}
}

func (t *gapTree) runMax(node, lo, hi, ql, qr int) int {
	if qr < lo || hi < ql {
		return 0
	}
	if ql <= lo && hi <= qr {
		return t.mx[node]
	}
	mid := (lo + hi) / 2
	t.pushDown(node, lo, mid)
	a := t.runMax(node*2, lo, mid, ql, qr)
	b := t.runMax(node*2+1, mid+1, hi, ql, qr)
	if b > a {
		return b
	}
	return a
}

func getResults(queries [][]int) []bool {
	// d[i] is the free run at start i: the distance from i to the first
	// obstacle strictly after it. A block of size sz can be laid down at
	// start i exactly when d[i] >= sz -- an obstacle may be touched at
	// either end, so only one strictly inside the block forbids it.
	// Placing an obstacle at t rewrites that affine run across the gap it
	// splits; each type-2 query asks whether the best run among starts
	// [0, x - sz] reaches sz.
	span := 1
	candSet := make(map[int]bool)
	for _, q := range queries {
		if q[0] == 2 {
			if q[1] > span {
				span = q[1]
			}
		} else {
			candSet[q[1]] = true
		}
	}
	cands := make([]int, 0, len(candSet))
	for v := range candSet {
		cands = append(cands, v)
	}
	sort.Ints(cands)
	k := len(cands)
	fen := make([]int, k+1)
	fenAdd := func(i int) {
		for ; i <= k; i += i & -i {
			fen[i]++
		}
	}
	fenSum := func(i int) int {
		total := 0
		for ; i > 0; i -= i & -i {
			total += fen[i]
		}
		return total
	}

	tree := newGapTree(span)
	result := make([]bool, 0, len(queries))
	for _, q := range queries {
		if q[0] == 1 {
			t := q[1]
			rank := sort.SearchInts(cands, t) + 1
			below := fenSum(rank - 1)
			previous := -1
			if below > 0 {
				// Largest marked rank below ours = previous obstacle.
				pos, remaining := 0, below
				for step := 1 << 16; step > 0; step >>= 1 {
					next := pos + step
					if next <= k && fen[next] < remaining {
						remaining -= fen[next]
						pos = next
					}
				}
				previous = cands[pos]
			}
			fenAdd(rank)
			lo, hi := previous, t-1
			if lo < 0 {
				lo = 0
			}
			if hi > span-1 {
				hi = span - 1
			}
			// Everything right of t keeps its old nearest obstacle.
			if lo <= hi {
				tree.assign(1, 0, span-1, lo, hi, t)
			}
		} else {
			x, sz := q[1], q[2]
			best := 0
			if x-sz >= 0 {
				best = tree.runMax(1, 0, span-1, 0, x-sz)
			}
			result = append(result, best >= sz)
		}
	}
	return result
}
