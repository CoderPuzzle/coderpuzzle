// A common divisor string can only exist if the two strings agree on
// their concatenation order; that is exactly the algebraic signature of
// both being built from repetitions of one string. The largest such
// divisor is the prefix whose length is the GCD of the two string
// lengths, found via the Euclidean algorithm.
func gcdOfStrings(str1 string, str2 string) string {
	if str1+str2 != str2+str1 {
		return ""
	}
	a, b := len(str1), len(str2)
	for b != 0 {
		a, b = b, a%b
	}
	return str1[:a]
}
