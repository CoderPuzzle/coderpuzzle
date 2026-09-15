func maxDifference(s string, k int) int {
	n := len(s)
	best := int64(-(1 << 62))
	for a := 0; a < 5; a++ {
		for b := 0; b < 5; b++ {
			if a == b {
				continue
			}
			diff := make([]int, n+1)
			pa := make([]int, n+1)
			pb := make([]int, n+1)
			lastBAt := make([]int, n+1)
			lastB := -1
			for i := 0; i < n; i++ {
				d := int(s[i] - '0')
				diff[i+1] = diff[i]
				pa[i+1] = pa[i]
				pb[i+1] = pb[i]
				if d == a {
					diff[i+1]++
					pa[i+1] ^= 1
				} else if d == b {
					diff[i+1]--
					pb[i+1] ^= 1
					lastB = i
				}
				lastBAt[i+1] = lastB
			}
			const INF = int64(1) << 62
			var minVal [2][2]int64
			for i := 0; i < 2; i++ {
				for j := 0; j < 2; j++ {
					minVal[i][j] = INF
				}
			}
			prevBound := -1
			for r := 1; r <= n; r++ {
				lb := lastBAt[r]
				bound := -1
				if lb != -1 {
					bound = r - k
					if lb < bound {
						bound = lb
					}
				}
				if bound >= 0 {
					for l := prevBound + 1; l <= bound; l++ {
						v := int64(diff[l])
						if v < minVal[pa[l]][pb[l]] {
							minVal[pa[l]][pb[l]] = v
						}
					}
					prevBound = bound
					mv := minVal[pa[r]^1][pb[r]]
					if mv != INF {
						cand := int64(diff[r]) - mv
						if cand > best {
							best = cand
						}
					}
				}
			}
		}
	}
	return int(best)
}
