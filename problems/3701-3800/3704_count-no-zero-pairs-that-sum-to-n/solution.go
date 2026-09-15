func countNoZeroPairs(n int64) int {
	const MOD = 1000000007
	var ds []int
	x := n
	if x == 0 {
		ds = append(ds, 0)
	}
	for x > 0 {
		ds = append(ds, int(x%10))
		x /= 10
	}
	ds = append(ds, 0)
	length := len(ds)

	// g[carry][a_active][b_active]
	g := [2][2][2]int64{}
	g[0][0][0] = 1
	for pos := length - 1; pos >= 0; pos-- {
		var ng [2][2][2]int64
		for carry := 0; carry < 2; carry++ {
			for aa := 0; aa < 2; aa++ {
				for ba := 0; ba < 2; ba++ {
					var res int64
					for da := 0; da < 10; da++ {
						if aa == 0 && da != 0 {
							break
						}
						for db := 0; db < 10; db++ {
							if ba == 0 && db != 0 {
								break
							}
							if pos == 0 && (da == 0 || db == 0) {
								continue
							}
							s := da + db + carry
							if s%10 != ds[pos] {
								continue
							}
							nc := s / 10
							naa, nba := 0, 0
							if aa == 1 && da != 0 {
								naa = 1
							}
							if ba == 1 && db != 0 {
								nba = 1
							}
							res += g[nc][naa][nba]
						}
					}
					ng[carry][aa][ba] = res % MOD
				}
			}
		}
		g = ng
	}
	return int(g[0][1][1])
}
