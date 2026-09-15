import "fmt"

// One left-to-right scan reads each fraction: an optional sign, the
// numerator's digits, '/', the denominator's digits. Fold it into the running
// num/den by cross-multiplication - num/den +/- v/w = (num*w +/- v*den)/(den*w)
// - integers only, never floats.
func fractionAddition(expression string) string {
	num, den := int64(0), int64(1)
	i, n := 0, len(expression)
	for i < n {
		sign := int64(1)
		mark := expression[i]
		if mark == '+' || mark == '-' {
			if mark == '-' {
				sign = -1
			}
			i++
		}
		value := int64(0)
		for i < n && expression[i] >= '0' && expression[i] <= '9' {
			value = value*10 + int64(expression[i]-'0')
			i++
		}
		i++ // the '/' between numerator and denominator
		divisor := int64(0)
		for i < n && expression[i] >= '0' && expression[i] <= '9' {
			divisor = divisor*10 + int64(expression[i]-'0')
			i++
		}
		num = num*divisor + sign*value*den
		den *= divisor
	}
	// Reduce once at the end. gcd(0, den) is den, so a zero sum collapses to
	// 0/1 and an integer keeps its denominator 1; the sign stays on the
	// numerator because den, a product of positives, is positive.
	a, b := num, den
	if a < 0 {
		a = -a
	}
	for b != 0 {
		a, b = b, a%b
	}
	return fmt.Sprintf("%d/%d", num/a, den/a)
}
