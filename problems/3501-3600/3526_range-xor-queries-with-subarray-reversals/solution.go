type tnode struct {
	val  int
	prio uint32
	size int
	xr   int
	rev  bool
	l, r *tnode
}

type treap struct {
	seed uint32
}

func (t *treap) nextPrio() uint32 {
	t.seed = (t.seed*1103515245 + 12345) & 0x7fffffff
	return t.seed
}

func (t *treap) make(val int) *tnode {
	return &tnode{val: val, prio: t.nextPrio(), size: 1, xr: val}
}

func sz(x *tnode) int {
	if x == nil {
		return 0
	}
	return x.size
}

func xr(x *tnode) int {
	if x == nil {
		return 0
	}
	return x.xr
}

func push(x *tnode) {
	if x != nil && x.rev {
		x.rev = false
		x.l, x.r = x.r, x.l
		if x.l != nil {
			x.l.rev = !x.l.rev
		}
		if x.r != nil {
			x.r.rev = !x.r.rev
		}
	}
}

func pull(x *tnode) {
	if x != nil {
		x.size = 1 + sz(x.l) + sz(x.r)
		x.xr = x.val ^ xr(x.l) ^ xr(x.r)
	}
}

func merge(a, b *tnode) *tnode {
	if a == nil {
		return b
	}
	if b == nil {
		return a
	}
	push(a)
	push(b)
	if a.prio < b.prio {
		a.r = merge(a.r, b)
		pull(a)
		return a
	}
	b.l = merge(a, b.l)
	pull(b)
	return b
}

// split into (first k nodes, the rest)
func split(x *tnode, k int) (*tnode, *tnode) {
	if x == nil {
		return nil, nil
	}
	push(x)
	left := sz(x.l)
	if k <= left {
		a, b := split(x.l, k)
		x.l = b
		pull(x)
		return a, x
	}
	a, b := split(x.r, k-left-1)
	x.r = a
	pull(x)
	return x, b
}

func getResults(nums []int, queries [][]int) []int {
	t := &treap{seed: 123456789}
	var root *tnode
	for _, value := range nums {
		root = merge(root, t.make(value))
	}

	out := []int{}
	for _, q := range queries {
		switch q[0] {
		case 1:
			index, value := q[1], q[2]
			a, b := split(root, index)
			mid, c := split(b, 1)
			mid.val = value
			mid.xr = value
			root = merge(a, merge(mid, c))
		case 2:
			l, r := q[1], q[2]
			a, b := split(root, l)
			mid, c := split(b, r-l+1)
			out = append(out, xr(mid))
			root = merge(a, merge(mid, c))
		default:
			l, r := q[1], q[2]
			a, b := split(root, l)
			mid, c := split(b, r-l+1)
			mid.rev = !mid.rev
			root = merge(a, merge(mid, c))
		}
	}
	return out
}
