func minFlips(s string) int {
	const inf = 1 << 30
	dp := [3][3]int{{inf, inf, inf}, {inf, inf, inf}, {inf, inf, inf}}
	dp[0][0] = 0
	p1 := "011"
	p2 := "110"
	for i := 0; i < len(s); i++ {
		next := [3][3]int{{inf, inf, inf}, {inf, inf, inf}, {inf, inf, inf}}
		for a := 0; a < 3; a++ {
			for b := 0; b < 3; b++ {
				if dp[a][b] == inf {
					continue
				}
				for _, putByte := range []byte("01") {
					put := rune(putByte)
					total := dp[a][b]
					if put != rune(s[i]) {
						total++
					}
					na := a
					if put == rune(p1[a]) {
						na++
					}
					nb := b
					if put == rune(p2[b]) {
						nb++
					}
					if na == 3 || nb == 3 {
						continue
					}
					if total < next[na][nb] {
						next[na][nb] = total
					}
				}
			}
		}
		dp = next
	}
	answer := inf
	for a := 0; a < 3; a++ {
		for b := 0; b < 3; b++ {
			if dp[a][b] < answer {
				answer = dp[a][b]
			}
		}
	}
	return answer
}
