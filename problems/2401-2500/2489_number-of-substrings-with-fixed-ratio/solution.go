func fixedRatio(s string, num1 int, num2 int) int64 {
	// A substring's zeros z and ones o have ratio num1 : num2 exactly when
	// z*num2 == o*num1. With prefix counts Z, O, the substring (l, r)
	// qualifies exactly when Z[r]*num2 - O[r]*num1 equals Z[l]*num2 -
	// O[l]*num1, so counting pairs of equal prefix keys is the whole task.
	// The key reaches 10^5*10^5 = 10^10, so it is stored as an int64.
	seen := map[int64]int64{0: 1}
	z, o := 0, 0
	var ans int64
	for i := 0; i < len(s); i++ {
		if s[i] == '0' {
			z++
		} else {
			o++
		}
		key := int64(z)*int64(num2) - int64(o)*int64(num1)
		ans += seen[key]
		seen[key]++
	}
	return ans
}
