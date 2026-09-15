package main

type SmallerNumbersThanCurrent struct{}

func NewSmallerNumbersThanCurrentTyped() *SmallerNumbersThanCurrent {
	return &SmallerNumbersThanCurrent{}
}

func (design *SmallerNumbersThanCurrent) smallerNumbersThanCurrent(nums []int) []int {
	counts := make([]int, 101)
	for _, v := range nums {
		counts[v]++
	}
	for v := 1; v <= 100; v++ {
		counts[v] += counts[v-1]
	}
	below := make([]int, 101)
	for v := 1; v <= 100; v++ {
		below[v] = counts[v-1]
	}
	answer := make([]int, len(nums))
	for i, v := range nums {
		answer[i] = below[v]
	}
	return answer
}
