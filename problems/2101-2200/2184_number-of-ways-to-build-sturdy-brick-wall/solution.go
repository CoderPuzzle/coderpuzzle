// A row is fully described by its internal-joint bitmask; adjacent rows
// must be disjoint. Enumerate row masks once, then run one count-vector
// transition per row.
func buildWall(height int, width int, bricks []int) int {
	const MOD = 1000000007

	var masks []int
	var rec func(position, mask int)
	rec = func(position, mask int) {
		if position == width {
			masks = append(masks, mask)
			return
		}
		for _, brick := range bricks {
			if position+brick > width {
				continue
			}
			next := position + brick
			extra := 0
			if next < width {
				extra = 1 << (next - 1)
			}
			rec(next, mask|extra)
		}
	}
	rec(0, 0)
	if len(masks) == 0 {
		return 0
	}

	counts := make(map[int]int64, len(masks))
	for _, mask := range masks {
		counts[mask] = 1
	}
	for row := 1; row < height; row++ {
		nextCounts := make(map[int]int64, len(masks))
		for _, below := range masks {
			var total int64
			for _, above := range masks {
				if above&below == 0 {
					total += counts[above]
				}
			}
			nextCounts[below] = total % MOD
		}
		counts = nextCounts
	}
	var answer int64
	for _, value := range counts {
		answer = (answer + value) % MOD
	}
	return int(answer)
}
