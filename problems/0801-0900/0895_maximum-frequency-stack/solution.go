package main

type FreqStack struct {
	freq    map[int]int
	groups  [][]int
	maxfreq int
}

func NewFreqStackTyped() *FreqStack {
	return &FreqStack{freq: make(map[int]int)}
}

func (design *FreqStack) ensure() {
	if design.freq == nil {
		design.freq = make(map[int]int)
	}
}

func (design *FreqStack) push(val int) {
	design.ensure()
	frequency := design.freq[val] + 1
	design.freq[val] = frequency
	for len(design.groups) < frequency {
		design.groups = append(design.groups, nil)
	}
	design.groups[frequency-1] = append(design.groups[frequency-1], val)
	if frequency > design.maxfreq {
		design.maxfreq = frequency
	}
}

func (design *FreqStack) pop() int {
	design.ensure()
	top := design.groups[design.maxfreq-1]
	val := top[len(top)-1]
	top = top[:len(top)-1]
	design.groups[design.maxfreq-1] = top
	design.freq[val]--
	if len(top) == 0 {
		design.maxfreq--
	}
	return val
}
