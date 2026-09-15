func convertArray(nums []int) int {
	cost := func(values []int) int {
		h := &maxHeap{}
		total := 0
		for _, v := range values {
			h.push(v)
			if h.peek() > v {
				total += h.pop() - v
				h.push(v)
			}
		}
		return total
	}
	negated := make([]int, len(nums))
	for i, v := range nums {
		negated[i] = -v
	}
	up := cost(nums)
	down := cost(negated)
	if up < down {
		return up
	}
	return down
}

type maxHeap struct{ data []int }

func (h *maxHeap) Len() int { return len(h.data) }
func (h *maxHeap) peek() int {
	return h.data[0]
}
func (h *maxHeap) push(v int) {
	h.data = append(h.data, v)
	i := len(h.data) - 1
	for i > 0 {
		p := (i - 1) / 2
		if h.data[p] >= h.data[i] {
			break
		}
		h.data[p], h.data[i] = h.data[i], h.data[p]
		i = p
	}
}
func (h *maxHeap) pop() int {
	top := h.data[0]
	last := len(h.data) - 1
	h.data[0] = h.data[last]
	h.data = h.data[:last]
	i := 0
	for {
		l, r := 2*i+1, 2*i+2
		big := i
		if l < len(h.data) && h.data[l] > h.data[big] {
			big = l
		}
		if r < len(h.data) && h.data[r] > h.data[big] {
			big = r
		}
		if big == i {
			break
		}
		h.data[i], h.data[big] = h.data[big], h.data[i]
		i = big
	}
	return top
}
