func numberOfWays(s string, t string, k int64) int {
	const mod = 1000000007
	n := len(s)
	cnt := countRotations2851(s, t)

	// Aggregate rotations into two classes: cnt that spell t and n - cnt
	// that do not. From a T rotation one operation lands on cnt - 1 others
	// (the identity shift is forbidden) or n - cnt non-T; from a non-T it
	// lands on cnt T or n - 1 - cnt non-T. Length-k walk counts depend only
	// on the starting class, hence this 2x2 matrix.
	mat := [2][2]int64{
		{modNorm2851(int64(cnt-1), mod), modNorm2851(int64(cnt), mod)},
		{modNorm2851(int64(n-cnt), mod), modNorm2851(int64(n-1-cnt), mod)},
	}
	// k reaches 1e15, so exponentiate by repeated squaring: O(log k)
	// constant-size multiplications under the modulus.
	mk := matPow2851(mat, k, mod)
	// Start on the class-T rotation iff s == t; the answer is the class-T
	// component (automatically 0 when cnt = 0).
	v0 := int64(0)
	if s == t {
		v0 = 1
	}
	v1 := 1 - v0
	return int((mk[0][0]*v0 + mk[0][1]*v1) % mod)
}

func modNorm2851(x int64, m int64) int64 {
	r := x % m
	if r < 0 {
		r += m
	}
	return r
}

func countRotations2851(s string, t string) int {
	// Every operation rotates s by a nonzero shift, so s is always one of
	// its n rotations. Count those equal to t by searching t in s+s
	// truncated to 2n-1 characters (dropping the last so the full-string
	// rotation is not double counted).
	n := len(s)
	pi := make([]int, n)
	for i := 1; i < n; i++ {
		j := pi[i-1]
		for j > 0 && t[i] != t[j] {
			j = pi[j-1]
		}
		if t[i] == t[j] {
			j++
		}
		pi[i] = j
	}
	cnt := 0
	j := 0
	for i := 0; i < 2*n-1; i++ {
		c := s[i%n]
		for j > 0 && c != t[j] {
			j = pi[j-1]
		}
		if c == t[j] {
			j++
		}
		if j == n {
			cnt++
			j = pi[j-1]
		}
	}
	return cnt
}

func matMul2851(a, b [2][2]int64, mod int64) [2][2]int64 {
	var out [2][2]int64
	for i := 0; i < 2; i++ {
		for j := 0; j < 2; j++ {
			out[i][j] = (a[i][0]*b[0][j] + a[i][1]*b[1][j]) % mod
		}
	}
	return out
}

func matPow2851(m [2][2]int64, p int64, mod int64) [2][2]int64 {
	r := [2][2]int64{{1, 0}, {0, 1}}
	for p > 0 {
		if p&1 == 1 {
			r = matMul2851(r, m, mod)
		}
		m = matMul2851(m, m, mod)
		p >>= 1
	}
	return r
}
