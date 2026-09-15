import "strings"

func maximumOddBinaryNumber(s string) string {
	// Parity fixes the last bit: one '1' must sit in the final position,
	// so push every remaining '1' to the front and let all '0's slot in
	// between them and that trailing one.
	ones := 0
	for k := 0; k < len(s); k++ {
		if s[k] == '1' {
			ones++
		}
	}
	return strings.Repeat("1", ones-1) + strings.Repeat("0", len(s)-ones) + "1"
}
