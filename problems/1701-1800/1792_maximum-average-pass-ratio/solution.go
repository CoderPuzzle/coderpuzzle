import "math"

type item struct {
	g float64
	p int64
	t int64
}

func less(a, b item) bool {
	if a.g != b.g {
		return a.g < b.g
	}
	if a.p != b.p {
		return a.p < b.p
	}
	return a.t < b.t
}

func gain(p, t int64) float64 {
	return float64(p+1)/float64(t+1) - float64(p)/float64(t)
}

// The heap below is a literal port of CPython's heapq so the array layout —
// and therefore the final summation order — matches the Python reference exactly.
func siftUp(heap []item, pos int) {
	endpos := len(heap)
	startpos := pos
	newitem := heap[pos]
	childpos := 2*pos + 1
	for childpos < endpos {
		rightpos := childpos + 1
		if rightpos < endpos && !less(heap[childpos], heap[rightpos]) {
			childpos = rightpos
		}
		heap[pos] = heap[childpos]
		pos = childpos
		childpos = 2*pos + 1
	}
	heap[pos] = newitem
	siftDown(heap, startpos, pos)
}

func siftDown(heap []item, startpos, pos int) {
	newitem := heap[pos]
	for pos > startpos {
		parentpos := (pos - 1) >> 1
		parent := heap[parentpos]
		if less(newitem, parent) {
			heap[pos] = parent
			pos = parentpos
			continue
		}
		break
	}
	heap[pos] = newitem
}

func heapify(heap []item) {
	n := len(heap)
	for i := n/2 - 1; i >= 0; i-- {
		siftUp(heap, i)
	}
}

func heappush(heap *[]item, it item) {
	*heap = append(*heap, it)
	siftDown(*heap, 0, len(*heap)-1)
}

func heappop(heap *[]item) item {
	lastelt := (*heap)[len(*heap)-1]
	*heap = (*heap)[:len(*heap)-1]
	if len(*heap) > 0 {
		returnitem := (*heap)[0]
		(*heap)[0] = lastelt
		siftUp(*heap, 0)
		return returnitem
	}
	return lastelt
}

func maxAverageRatio(classes [][]int, extraStudents int) float64 {
	heap := make([]item, len(classes))
	for i, c := range classes {
		p, t := int64(c[0]), int64(c[1])
		heap[i] = item{-gain(p, t), p, t}
	}
	// Average over a fixed class count, so maximize the ratio sum: one more
	// student in class (p, t) gains (p+1)/(t+1) - p/t, and that marginal
	// gain shrinks as the class grows — allocate each identical student
	// where it buys the most.
	heapify(heap)
	for k := 0; k < extraStudents; k++ {
		top := heappop(&heap)
		p, t := top.p+1, top.t+1
		// Re-push: after absorbing a student the class's gain drops and
		// another class may now offer the best marginal return.
		heappush(&heap, item{-gain(p, t), p, t})
	}
	// Python's sum() uses Neumaier compensated summation for floats; mirror it
	// so the final average is bit-identical to the reference.
	f := float64(heap[0].p) / float64(heap[0].t)
	c := 0.0
	for i := 1; i < len(heap); i++ {
		x := float64(heap[i].p) / float64(heap[i].t)
		t := f + x
		if math.Abs(f) >= math.Abs(x) {
			c += (f - t) + x
		} else {
			c += (x - t) + f
		}
		f = t
	}
	return (f + c) / float64(len(heap))
}
