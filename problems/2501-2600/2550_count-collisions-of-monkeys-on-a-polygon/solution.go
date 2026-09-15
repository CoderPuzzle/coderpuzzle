// Complement counting: only the two unanimous rotations avoid all
// collisions, so the answer is (2^n - 2) mod 1e9+7 by iterative binary
// exponentiation; int64 absorbs the ~10^18 intermediate products safely.
func monkeyMove(n int) int {
	const mod = int64(1000000007)
	result := int64(1)
	base := int64(2)
	for e := int64(n); e > 0; e >>= 1 {
		if e&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
	}
	return int((result - 2 + mod) % mod)
}
