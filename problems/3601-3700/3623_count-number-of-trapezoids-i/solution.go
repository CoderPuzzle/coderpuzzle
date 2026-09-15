func countTrapezoids(points [][]int) int {
	const mod = 1000000007
	// A horizontal trapezoid is exactly: two points on one horizontal
	// line and two on another. Count each line's pairs, then combine.
	rows := make(map[int]int)
	for _, p := range points {
		rows[p[1]]++
	}
	// Per-line pair counts s = C(c, 2) reach ~5e9, past the int32
	// range, and the pair products range far past 64 bits — reduce
	// modulo the prime as every value is produced.
	total, squared := int64(0), int64(0)
	for _, count := range rows {
		pairs := int64(count) * int64(count-1) / 2 % mod
		total = (total + pairs) % mod
		squared = (squared + pairs*pairs) % mod
	}
	// The sum over line pairs s_i * s_j equals (total^2 - squared)/2;
	// dividing by 2 becomes multiplying by the inverse of 2.
	inv2 := int64(mod+1) / 2
	return int((total*total - squared + mod) % mod * inv2 % mod)
}
