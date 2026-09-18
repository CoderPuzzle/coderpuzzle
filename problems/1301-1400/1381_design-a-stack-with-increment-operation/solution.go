package main

type CustomStack struct {
	values  []int64
	pending []int64
	maxSize int
}

func NewCustomStackTyped(maxSize int) *CustomStack {
	return &CustomStack{maxSize: maxSize}
}

func (design *CustomStack) push(x int) {
	if len(design.values) < design.maxSize {
		design.values = append(design.values, int64(x))
		design.pending = append(design.pending, 0)
	}
}

func (design *CustomStack) pop() int {
	if len(design.values) == 0 {
		return -1
	}
	increment := design.pending[len(design.pending)-1]
	design.pending = design.pending[:len(design.pending)-1]
	if len(design.pending) > 0 {
		design.pending[len(design.pending)-1] += increment
	}
	value := design.values[len(design.values)-1] + increment
	design.values = design.values[:len(design.values)-1]
	return int(value)
}

func (design *CustomStack) increment(k int, val int) {
	limit := min(k, len(design.values))
	if limit > 0 {
		design.pending[limit-1] += int64(val)
	}
}
