import (
	"fmt"
	"strings"
)

// Split at the one '=' and reduce each side to a*x + b with a single scan.
// A term is an optional sign, digits (empty before an 'x' means coefficient
// 1), and a possible trailing 'x'; '0x' contributes a zero coefficient and
// drops out by itself.
func solveEquation(equation string) string {
	eq := strings.IndexByte(equation, '=')
	la, lb := parseSide(equation[:eq])
	ra, rb := parseSide(equation[eq+1:])
	// la*x + lb = ra*x + rb -> (la - ra)*x = rb - lb. A zero coefficient
	// leaves either every x or no x; otherwise the division is exact.
	a, b := la-ra, rb-lb
	if a == 0 {
		if b == 0 {
			return "Infinite solutions"
		}
		return "No solution"
	}
	return fmt.Sprintf("x=%d", b/a)
}

func parseSide(side string) (a, b int64) {
	i, n := 0, len(side)
	for i < n {
		sign := int64(1)
		mark := side[i]
		if mark == '+' || mark == '-' {
			if mark == '-' {
				sign = -1
			}
			i++
		}
		value := int64(0)
		hasDigits := false
		for i < n && side[i] >= '0' && side[i] <= '9' {
			value = value*10 + int64(side[i]-'0')
			hasDigits = true
			i++
		}
		if i < n && side[i] == 'x' {
			coefficient := value
			if !hasDigits {
				coefficient = 1
			}
			a += sign * coefficient
			i++
		} else {
			b += sign * value
		}
	}
	return a, b
}
