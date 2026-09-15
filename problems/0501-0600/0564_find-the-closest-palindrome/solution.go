import (
	"strconv"
	"strings"
)

// A palindrome is fixed by its first half, so the palindromes nearest n
// nearly share n's own half: mirror the half, and the half +/- 1, for at most
// three same-width candidates. The +/- 1 step can leave the width (10...0
// decremented, 9...9 incremented); those neighbors are the boundary
// candidates 10^(L-1) - 1 (all 9s, one digit shorter) and 10^L + 1 (1, zeros,
// 1).
func nearestPalindromic(n string) string {
	length := len(n)
	half := (length + 1) / 2
	prefix, _ := strconv.ParseInt(n[:half], 10, 64)
	candidates := make([]string, 0, 5)
	for delta := -1; delta <= 1; delta++ {
		shifted := strconv.FormatInt(prefix+int64(delta), 10)
		// A half that no longer has exactly `half` digits would mirror onto
		// leading zeros - the boundary candidates own that ground.
		if len(shifted) != half || (shifted == "0" && length > 1) {
			continue
		}
		head := []byte(shifted[:length-half])
		for i, j := 0, len(head)-1; i < j; i, j = i+1, j-1 {
			head[i], head[j] = head[j], head[i]
		}
		candidates = append(candidates, shifted+string(head))
	}
	if length == 1 {
		candidates = append(candidates, "0")
	} else {
		candidates = append(candidates, strings.Repeat("9", length-1))
	}
	candidates = append(candidates, "1"+strings.Repeat("0", length-1)+"1")

	// Everything fits a signed 64-bit integer: n is below 10^18, the widest
	// candidate is 10^18 + 1, and no distance passes 9 * 10^17 + 1 - an
	// order of magnitude inside int64's 9.22 * 10^18 ceiling.
	value, _ := strconv.ParseInt(n, 10, 64)
	var best string
	var bestValue, bestDistance int64
	for _, candidate := range candidates {
		candidateValue, _ := strconv.ParseInt(candidate, 10, 64)
		if candidateValue == value {
			continue // n itself never counts
		}
		distance := candidateValue - value
		if distance < 0 {
			distance = -distance
		}
		if best == "" || distance < bestDistance ||
			(distance == bestDistance && candidateValue < bestValue) {
			best, bestValue, bestDistance = candidate, candidateValue, distance
		}
	}
	return best
}
