import "strconv"

func simplifiedFractions(n int) []string {
	result := make([]string, 0)
	for numer := 1; numer < n; numer++ {
		for denom := numer + 1; denom <= n; denom++ {
			if gcd1447(numer, denom) == 1 {
				result = append(result, strconv.Itoa(numer)+"/"+strconv.Itoa(denom))
			}
		}
	}
	return result
}

func gcd1447(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
