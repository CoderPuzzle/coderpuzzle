// reach[i] is the largest L with target[i:i+L] a prefix of some word:
// for each word, one Z-function over word + separator + target yields,
// at every target offset, how many characters continue to match the
// word's own prefix. With reach fixed, the pieces form a jump game:
// standing at position i jumps right by any length in [1, reach[i]],
// and the fewest jumps to cover n characters is the classic layered
// greedy scan — every position folds its reach into the frontier
// before the boundary trigger fires.
func minValidStrings(words []string, target string) int {
	n := len(target)
	reach := make([]int, n)
	for _, w := range words {
		values := make([]int, 0, len(w)+1+n)
		for k := 0; k < len(w); k++ {
			values = append(values, int(w[k]))
		}
		values = append(values, -1)
		for k := 0; k < n; k++ {
			values = append(values, int(target[k]))
		}
		z := zFunction(values)
		base := len(w) + 1
		for i := 0; i < n; i++ {
			if z[base+i] > reach[i] {
				reach[i] = z[base+i]
			}
		}
	}
	steps := 0
	curEnd := 0 // with `steps` pieces, target[:curEnd] is formable
	farthest := 0
	for i := 0; i < n; i++ {
		r := i + reach[i]
		if r > farthest {
			farthest = r
		}
		if i == curEnd {
			if farthest <= curEnd {
				return -1
			}
			steps++
			curEnd = farthest
			if curEnd >= n {
				return steps
			}
		}
	}
	return -1
}

func zFunction(values []int) []int {
	m := len(values)
	z := make([]int, m)
	z[0] = m
	left, right := 0, 0
	for i := 1; i < m; i++ {
		if i < right {
			if v := z[i-left]; v < right-i {
				z[i] = v
			} else {
				z[i] = right - i
			}
		}
		for i+z[i] < m && values[z[i]] == values[i+z[i]] {
			z[i]++
		}
		if i+z[i] > right {
			left, right = i, i+z[i]
		}
	}
	return z
}
