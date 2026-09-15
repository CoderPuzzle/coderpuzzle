// Positions split by parity: (n+1)//2 even indices each hold one of
// the 5 even digits, n//2 odd indices one of the 4 prime digits. The
// product 5^e * 4^o is folded by iterative square-and-multiply, so n
// up to 10^15 costs ~50 modular multiplications.
func countGoodNumbers(n int64) int {
	const mod = 1000000007
	return int(power(5, (n+1)/2) * power(4, n/2) % mod)
}

// Squares stay below (10^9+6)^2 ~ 10^18, safely inside int64 range.
func power(base, exp int64) int64 {
	const mod = 1000000007
	result := int64(1)
	b := base % mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * b % mod
		}
		b = b * b % mod
		exp >>= 1
	}
	return result
}
