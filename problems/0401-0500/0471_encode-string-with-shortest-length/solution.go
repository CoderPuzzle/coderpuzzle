import (
	"strconv"
	"strings"
)

func encode(s string) string {
	n := len(s)
	// dp[i][j] = shortest encoding of s[i..j]; growing interval lengths
	// guarantee every subinterval is solved before it is needed.
	dp := make([][]string, n)
	for i := range dp {
		dp[i] = make([]string, n)
	}
	for length := 1; length <= n; length++ {
		for i := 0; i+length <= n; i++ {
			j := i + length - 1
			substr := s[i : j+1]
			// Candidate 1: keep the substring verbatim.
			best := substr
			// Candidate 2: split in two, concatenate optimal encodings.
			for k := i; k < j; k++ {
				candidate := dp[i][k] + dp[k+1][j]
				if len(candidate) < len(best) {
					best = candidate
				}
			}
			compression := ""
			hasCompression := false
			// Candidate 3: k[pattern] when a period divides the interval.
			// Embedding the pattern's own encoding (not raw text) gives
			// nested forms like 4[2[a]] for free.
			for p := 1; p < length; p++ {
				if length%p == 0 {
					pattern := s[i : i+p]
					if strings.Repeat(pattern, length/p) == substr {
						encoded := strconv.Itoa(length/p) + "[" + dp[i][i+p-1] + "]"
						if !hasCompression || len(encoded) < len(compression) {
							compression = encoded
							hasCompression = true
						}
					}
				}
			}
			// Encode only if strictly shorter — or tied against an
			// already-encoded best; a tie with the raw text keeps the text
			// ("aaa" stays "aaa", "aaaaa" becomes "5[a]").
			if hasCompression {
				if len(compression) < len(best) ||
					(len(compression) == len(best) && best != substr) {
					best = compression
				}
			}
			dp[i][j] = best
		}
	}
	return dp[0][n-1]
}
