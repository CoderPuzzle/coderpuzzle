func isPossible(target []int) bool {
	n := len(target)
	// With no "rest" to un-mix against, the only reachable target is [1].
	if n == 1 {
		return target[0] == 1
	}
	// Max-heap for the reverse simulation below.
	heap := make([]int, 0, n)
	push := func(v int) {
		heap = append(heap, v)
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
		last := heap[len(heap)-1]
		heap = heap[:len(heap)-1]
		if len(heap) > 0 {
			heap[0] = last
			i := 0
			for {
				l := 2*i + 1
				r := l + 1
				big := i
				if l < len(heap) && heap[l] > heap[big] {
					big = l
				}
				if r < len(heap) && heap[r] > heap[big] {
					big = r
				}
				if big == i {
					break
				}
				heap[i], heap[big] = heap[big], heap[i]
				i = big
			}
		}
		return top
	}
	total := 0
	for _, v := range target {
		total += v
		push(v)
	}
	// Reverse simulation: the total strictly grows each operation, so the
	// largest element of any reachable state was necessarily written last.
	// `total` tracks the current array sum.
	for {
		largest := pop()
		// Max is 1 => every other element (never larger) is also 1.
		if largest == 1 {
			return true
		}
		rest := total - largest
		// The last write must have exceeded the rest of the array; it
		// also catches rest == 0 before the division.
		if largest <= rest {
			return false
		}
		// Batch-jump consecutive un-mixings of the same element in one
		// go: `steps` reversals leave largest mod rest biased to [1, rest],
		// avoiding one-rest-at-a-time subtraction on 1e9-scale gaps.
		steps := (largest - 1) / rest
		prev := largest - steps*rest
		push(prev)
		total = rest + prev
	}
}
