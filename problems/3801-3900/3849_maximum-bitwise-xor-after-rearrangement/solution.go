import "strings"

func maximumXor(s string, t string) string {
	n := len(s)
	sOnes := strings.Count(s, "1")
	tOnes := strings.Count(t, "1")
	// Ones of t that can land on s's '0' positions and zeros of t that
	// can land on s's '1' positions — the largest pair of opposite-bit
	// counts the two multisets allow, maxed together.
	onesOnZeros := min(tOnes, n-sOnes)
	zerosOnOnes := min(n-tOnes, sOnes)
	// Greedy left-to-right fill: spend an opposite bit at each position
	// while its class still has one, which pushes every achievable XOR
	// one as far left as it can go.
	result := make([]byte, 0, n)
	for i := 0; i < n; i++ {
		if s[i] == '0' {
			if onesOnZeros > 0 {
				result = append(result, '1')
				onesOnZeros--
			} else {
				result = append(result, '0')
			}
		} else if zerosOnOnes > 0 {
			result = append(result, '1')
			zerosOnOnes--
		} else {
			result = append(result, '0')
		}
	}
	return string(result)
}
