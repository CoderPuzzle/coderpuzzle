import "sort"

// A square centred at the origin takes exactly the points whose Chebyshev
// radius max(|x|, |y|) is within its half side, so valid squares
// correspond to prefixes of the order sorted by radius -- an entire
// equal-radius block sits inside or out as one. Sweep blocks outward
// holding a global seen-tag table; a block that repeats a tag inside
// itself or against earlier blocks is where every larger square breaks,
// so the count gathered before it is optimal.
func maxPointsInsideSquare(points [][]int, s string) int {
	radius := func(i int) int {
		x, y := points[i][0], points[i][1]
		if x < 0 {
			x = -x
		}
		if y < 0 {
			y = -y
		}
		if x > y {
			return x
		}
		return y
	}
	order := make([]int, len(points))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return radius(order[a]) < radius(order[b]) })
	var seen [26]bool
	run := 0
	i := 0
	for i < len(order) {
		j := i
		for j < len(order) && radius(order[j]) == radius(order[i]) {
			j++
		}
		var block [26]bool
		ok := true
		for k := i; k < j; k++ {
			bit := s[order[k]] - 'a'
			if seen[bit] || block[bit] {
				ok = false
				break
			}
			block[bit] = true
		}
		if !ok {
			return run
		}
		for b := 0; b < 26; b++ {
			if block[b] {
				seen[b] = true
			}
		}
		run += j - i
		i = j
	}
	return run
}
