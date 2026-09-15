import (
	"strconv"
	"strings"
)

// Long division on the magnitudes: a map from each remainder to the position
// of the digit it produced detects the cycle, and the first remainder seen
// twice opens the recurring parentheses at its recorded position.
func fractionToDecimal(numerator int, denominator int) string {
	// MinInt32 has no positive 32-bit counterpart, so widen before magnitudes;
	// every later intermediate is a remainder below 2^31 times 10.
	n := int64(numerator)
	if n < 0 {
		n = -n
	}
	d := int64(denominator)
	if d < 0 {
		d = -d
	}
	// Magnitudes in, sign out: "-" is prepended once, and never on a zero
	// result (0 over a negative denominator must not become "-0").
	var out strings.Builder
	if (numerator < 0) != (denominator < 0) && n != 0 {
		out.WriteByte('-')
	}
	out.WriteString(strconv.FormatInt(n/d, 10))
	remainder := n % d
	if remainder == 0 {
		return out.String()
	}
	out.WriteByte('.')
	// Remainder -> position of the fraction digit it produced.
	seen := make(map[int64]int)
	fraction := ""
	for remainder != 0 {
		if start, ok := seen[remainder]; ok {
			// Everything from that position recurs: close the cycle there.
			fraction = fraction[:start] + "(" + fraction[start:] + ")"
			break
		}
		seen[remainder] = len(fraction)
		remainder *= 10
		fraction += strconv.FormatInt(remainder/d, 10)
		remainder %= d
	}
	return out.String() + fraction
}
