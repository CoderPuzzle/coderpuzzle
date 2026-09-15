// Product over words of the multinomial len!/prod(count!), all reduced
// modulo 1e9+7; division becomes multiplication by the Fermat inverse
// x^(p-2).
func countAnagrams(s string) int {
	const mod = 1_000_000_007
	answer := int64(1)
	start := 0
	for i := 0; i <= len(s); i++ {
		if i == len(s) || s[i] == ' ' {
			answer = answer * wordWays(s, start, i, mod) % mod
			start = i + 1
		}
	}
	return int(answer)
}

func wordWays(s string, from int, to int, mod int64) int64 {
	var counts [26]int64
	for i := from; i < to; i++ {
		counts[s[i]-'a']++
	}
	term := factorialMod(int64(to-from), mod)
	for _, count := range counts {
		if count > 1 {
			term = term * modPow(factorialMod(count, mod), mod-2, mod) % mod
		}
	}
	return term
}

func factorialMod(n int64, mod int64) int64 {
	result := int64(1)
	for i := int64(2); i <= n; i++ {
		result = result * i % mod
	}
	return result
}

func modPow(base int64, exp int64, mod int64) int64 {
	result := int64(1)
	base %= mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}
