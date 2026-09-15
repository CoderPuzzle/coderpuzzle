import (
	"strconv"
	"strings"
)

// Only the first two pieces of a split are free — every later term is the
// sum of the two before it — so a candidate split is nothing but a pair of
// cuts. Try cut pairs shortest piece first (a term fits in 32 bits, so ten
// digits cap each piece), follow the forced run under each pair, and return
// the first sequence that consumes the string: exactly the shortest-first
// split the statement pins.
func splitIntoFibonacci(num string) []int {
	const limit = 1<<31 - 1
	n := len(num)
	for i := 1; i <= min(10, n-2); i++ {
		if num[0] == '0' && i > 1 {
			break
		}
		a, _ := strconv.Atoi(num[:i])
		if a > limit {
			break
		}
		for j := i + 1; j <= min(i+10, n-1); j++ {
			if num[i] == '0' && j-i > 1 {
				break
			}
			b, _ := strconv.Atoi(num[i:j])
			if b > limit {
				break
			}
			seq := []int{a, b}
			pos, x, y := j, a, b
			for pos < n {
				z := x + y
				if z > limit {
					break
				}
				s := strconv.Itoa(z)
				if !strings.HasPrefix(num[pos:], s) {
					break
				}
				seq = append(seq, z)
				pos += len(s)
				x, y = y, z
			}
			if pos == n {
				return seq
			}
		}
	}
	return []int{}
}
