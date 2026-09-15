// Every operation covers the prefix rectangle anchored at the top-left corner,
// so the cells incremented by all of them form the rectangle sized by the
// smallest a and the smallest b; only those cells can hold the maximum.
// Starting both minima at m and n covers empty ops, where every cell stays 0
// and all m*n cells are maximal.
func maxCount(m int, n int, ops [][]int) int64 {
	minA, minB := m, n
	for _, op := range ops {
		if op[0] < minA {
			minA = op[0]
		}
		if op[1] < minB {
			minB = op[1]
		}
	}
	return int64(minA) * int64(minB)
}
