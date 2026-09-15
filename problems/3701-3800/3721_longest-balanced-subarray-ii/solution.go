type segTree struct {
	n            int
	mn, mx, lazy []int
}

func buildSeg(node, nl, nr int, values []int, t *segTree) {
	if nl == nr {
		t.mn[node] = values[nl]
		t.mx[node] = values[nl]
		return
	}
	mid := (nl + nr) / 2
	buildSeg(node*2, nl, mid, values, t)
	buildSeg(node*2+1, mid+1, nr, values, t)
	left, right := node*2, node*2+1
	if t.mn[left] < t.mn[right] {
		t.mn[node] = t.mn[left]
	} else {
		t.mn[node] = t.mn[right]
	}
	if t.mx[left] > t.mx[right] {
		t.mx[node] = t.mx[left]
	} else {
		t.mx[node] = t.mx[right]
	}
}

func pushSeg(node int, t *segTree) {
	z := t.lazy[node]
	if z != 0 {
		for _, c := range []int{node * 2, node*2 + 1} {
			t.mn[c] += z
			t.mx[c] += z
			t.lazy[c] += z
		}
		t.lazy[node] = 0
	}
}

func addSeg(node, nl, nr, ql, qr, delta int, t *segTree) {
	if ql <= nl && nr <= qr {
		t.mn[node] += delta
		t.mx[node] += delta
		t.lazy[node] += delta
		return
	}
	pushSeg(node, t)
	mid := (nl + nr) / 2
	if ql <= mid {
		addSeg(node*2, nl, mid, ql, qr, delta, t)
	}
	if qr > mid {
		addSeg(node*2+1, mid+1, nr, ql, qr, delta, t)
	}
	left, right := node*2, node*2+1
	if t.mn[left] < t.mn[right] {
		t.mn[node] = t.mn[left]
	} else {
		t.mn[node] = t.mn[right]
	}
	if t.mx[left] > t.mx[right] {
		t.mx[node] = t.mx[left]
	} else {
		t.mx[node] = t.mx[right]
	}
}

func rightmostZero(node, nl, nr, ql, qr int, t *segTree) int {
	if qr < nl || nr < ql {
		return -1
	}
	if ql <= nl && nr <= qr {
		if t.mn[node] > 0 || t.mx[node] < 0 {
			return -1
		}
		if nl == nr {
			return nl
		}
		pushSeg(node, t)
		mid := (nl + nr) / 2
		res := rightmostZero(node*2+1, mid+1, nr, ql, qr, t)
		if res != -1 {
			return res
		}
		return rightmostZero(node*2, nl, mid, ql, qr, t)
	}
	pushSeg(node, t)
	mid := (nl + nr) / 2
	res := rightmostZero(node*2+1, mid+1, nr, ql, qr, t)
	if res != -1 {
		return res
	}
	return rightmostZero(node*2, nl, mid, ql, qr, t)
}

func longestBalanced(nums []int) int {
	n := len(nums)
	// first occurrence of each value (seeds balance(0, r)) and the next
	// occurrence of each position (tells where a value stops mattering).
	first := make(map[int]int)
	nxt := make([]int, n)
	for i := range nxt {
		nxt[i] = n
	}
	last := make(map[int]int)
	for i := n - 1; i >= 0; i-- {
		v := nums[i]
		if p, ok := last[v]; ok {
			nxt[i] = p
		}
		last[v] = i
	}
	for i, v := range nums {
		if _, ok := first[v]; !ok {
			first[v] = i
		}
	}
	// Seed balance(0, r): each value contributes its sign to every right
	// end at or after its first occurrence, via O(log n) range adds.
	init := make([]int, n)
	t := &segTree{n: n, mn: make([]int, 4*n), mx: make([]int, 4*n), lazy: make([]int, 4*n)}
	buildSeg(1, 0, n-1, init, t)
	for v, p := range first {
		s := 1
		if v%2 == 0 {
			s = -1
		}
		addSeg(1, 0, n-1, p, n-1, s, t)
	}
	best := 0
	for l := 0; l < n; l++ {
		r := rightmostZero(1, 0, n-1, l, n-1, t)
		if r != -1 && r-l+1 > best {
			best = r - l + 1
		}
		v := nums[l]
		s := 1
		if v%2 == 0 {
			s = -1
		}
		if nxt[l] > l {
			addSeg(1, 0, n-1, l, nxt[l]-1, -s, t)
		}
	}
	return best
}
