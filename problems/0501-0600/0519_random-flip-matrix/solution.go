package main

import "math/rand"

type Solution struct {
	columns   int
	total     int
	remaining int
	mapping   map[int]int
	random    *rand.Rand
}

func NewSolutionTyped(m int, n int) *Solution {
	return &Solution{
		columns:   n,
		total:     m * n,
		remaining: m * n,
		mapping:   make(map[int]int),
		random:    rand.New(rand.NewSource(519)),
	}
}

func (design *Solution) flip() []int {
	index := design.random.Intn(design.remaining)
	value, known := design.mapping[index]
	if !known {
		value = index
	}
	last := design.remaining - 1
	lastValue, lastKnown := design.mapping[last]
	if !lastKnown {
		lastValue = last
	}
	delete(design.mapping, last)
	if index != last {
		design.mapping[index] = lastValue
	}
	design.remaining = last
	return []int{value / design.columns, value % design.columns}
}

func (design *Solution) reset() {
	design.remaining = design.total
	design.mapping = make(map[int]int)
}
