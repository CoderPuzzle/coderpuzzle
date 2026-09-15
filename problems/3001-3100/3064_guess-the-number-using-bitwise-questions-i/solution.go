package main

type Solution struct{}

func (solution *Solution) findNumber(hiddenNumber *HiddenNumber) int {
	// A single-bit mask shares at most one bit with n, so the reply is
	// 0 or 1: positive means bit i of n itself is set.
	number := 0
	for bit := 0; bit < 30; bit++ {
		if hiddenNumber.CommonSetBits(1<<bit) > 0 {
			number |= 1 << bit
		}
	}
	return number
}
