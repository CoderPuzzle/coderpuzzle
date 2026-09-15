// counts[d] is the number of distinct numbers of the current length that
// end on digit d. Every cell seeds one number of length 1, and each pass
// pushes every count through the knight's hop list — a number ending on d
// extends by one hop to each knight-neighbor of d — so n - 1 passes grow
// the row to length n and the row sum is the answer. Cell 5 has no
// knight-neighbor, so it seeds length 1 and never extends again.
func knightDialer(n int) int {
	const mod = 1_000_000_007
	hops := [10][]int{
		{4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9}, {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4},
	}
	counts := [10]int64{1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
	for step := 1; step < n; step++ {
		var next [10]int64
		for d, row := range hops {
			for _, e := range row {
				next[e] = (next[e] + counts[d]) % mod
			}
		}
		counts = next
	}
	total := int64(0)
	for _, c := range counts {
		total = (total + c) % mod
	}
	return int(total)
}
