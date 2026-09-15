import (
	"math"
	"sort"
)

// Equal values are interchangeable, so a permutation is decided by how many
// copies of each distinct value land at each step — collapse nums to
// distinct values with multiplicities, precompute which value pairs sum to
// a perfect square (pair sums reach 2 * 10^9, so the root must survive an
// integer round-trip, not a bare float), and depth-first search: extend a
// partial sequence only through adjacent values that are still in stock; a
// branch consuming all n elements is one squareful permutation.
func numSquarefulPerms(nums []int) int64 {
	stock := make(map[int]int)
	for _, v := range nums {
		stock[v]++
	}
	values := make([]int, 0, len(stock))
	for v := range stock {
		values = append(values, v)
	}
	sort.Ints(values)
	d := len(values)
	counts := make([]int, d)
	for i, v := range values {
		counts[i] = stock[v]
	}
	adj := make([][]bool, d)
	for i, a := range values {
		adj[i] = make([]bool, d)
		for j, b := range values {
			adj[i][j] = isSquare(int64(a) + int64(b))
		}
	}
	var walk func(prev, left int) int64
	walk = func(prev, left int) int64 {
		if left == 0 {
			return 1
		}
		var total int64
		for j := 0; j < d; j++ {
			if counts[j] > 0 && adj[prev][j] {
				counts[j]--
				total += walk(j, left-1)
				counts[j]++
			}
		}
		return total
	}
	var answer int64
	for start := 0; start < d; start++ {
		counts[start]--
		answer += walk(start, len(nums)-1)
		counts[start]++
	}
	return answer
}

// isSquare tests s exactly: the float64 root guess is corrected by integer
// round-trips, since a pair sum reaches 2 * 10^9.
func isSquare(s int64) bool {
	r := int64(math.Sqrt(float64(s)))
	for r*r > s {
		r--
	}
	for (r+1)*(r+1) <= s {
		r++
	}
	return r*r == s
}
