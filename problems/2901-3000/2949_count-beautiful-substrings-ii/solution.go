// A beautiful substring has equal vowels and consonants (the prefix
// vowel-minus-consonant balance is equal at both ends) and with both
// counts equal to x, x*x % k == 0 holds exactly when x is a multiple of
// m, the least x >= 1 with x*x % k == 0 — for k = p1^a1 * p2^a2 * ...
// that is the product of p^ceil(a/2). So a substring counts iff its end
// balances match and its length is a multiple of 2m, i.e. both end
// indices agree modulo 2m. One pass counts earlier prefixes with the same
// (balance, index mod 2m) key, encoded as one int64.
func beautifulSubstrings(s string, k int) int {
	isVowel := func(c byte) bool {
		return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
	}
	m, rest := 1, k
	for p := 2; p*p <= rest; p++ {
		if rest%p == 0 {
			a := 0
			for rest%p == 0 {
				rest /= p
				a++
			}
			for t := 0; t < (a+1)/2; t++ {
				m *= p
			}
		}
	}
	if rest > 1 {
		m *= rest
	}
	period := 2 * m
	n := len(s)
	seen := make(map[int64]int64)
	seen[int64(n)*int64(period)] = 1 // empty prefix: balance 0, index 0
	var total int64
	balance := 0
	for i := 1; i <= n; i++ {
		if isVowel(s[i-1]) {
			balance++
		} else {
			balance--
		}
		key := int64(balance+n)*int64(period) + int64(i%period)
		total += seen[key]
		seen[key] = seen[key] + 1
	}
	return int(total)
}
