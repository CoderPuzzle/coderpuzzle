import "math/bits"

func countKReducibleNumbers(s string, k int) int {
	const MOD = 1000000007
	L := len(s)
	// f[x] = number of operations to reduce x to 1.
	f := make([]int, L+1)
	for x := 2; x <= L; x++ {
		bits := bits.OnesCount(uint(x))
		f[x] = 1 + f[bits]
	}
	// Pascal's triangle mod MOD.
	C := make([][]int, L+1)
	for i := 0; i <= L; i++ {
		C[i] = make([]int, L+1)
		C[i][0] = 1
		for j := 1; j <= i; j++ {
			C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD
		}
	}
	// cnt[p] = number of integers x in [0, n-1] with popcount(x) == p.
	cnt := make([]int, L+1)
	ones := 0
	for i := 0; i < L; i++ {
		if s[i] == '1' {
			remaining := L - i - 1
			for p := 0; p <= remaining; p++ {
				cnt[ones+p] = (cnt[ones+p] + C[remaining][p]) % MOD
			}
			ones++
		}
	}
	ans := 0
	for p := 1; p <= L; p++ {
		if 1+f[p] <= k {
			ans = (ans + cnt[p]) % MOD
		}
	}
	return ans
}
