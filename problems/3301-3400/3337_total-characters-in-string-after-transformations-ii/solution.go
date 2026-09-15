func lengthAfterTransformations(s string, t int, nums []int) int {
	const MOD = 1000000007

	matMul := func(a, b [][]int64) [][]int64 {
		size := len(a)
		c := make([][]int64, size)
		for i := range c {
			c[i] = make([]int64, size)
		}
		for i := 0; i < size; i++ {
			for k := 0; k < size; k++ {
				aik := a[i][k]
				if aik == 0 {
					continue
				}
				rowB := b[k]
				rowC := c[i]
				for j := 0; j < size; j++ {
					rowC[j] = (rowC[j] + aik*rowB[j]) % MOD
				}
			}
		}
		return c
	}

	matPow := func(base [][]int64, exp int64) [][]int64 {
		size := len(base)
		result := make([][]int64, size)
		for i := range result {
			result[i] = make([]int64, size)
			result[i][i] = 1
		}
		for exp > 0 {
			if exp&1 != 0 {
				result = matMul(result, base)
			}
			base = matMul(base, base)
			exp >>= 1
		}
		return result
	}

	var v [26]int64
	for i := 0; i < len(s); i++ {
		v[s[i]-'a']++
	}

	// transition[i][j] = 1 if character j produces character i.
	transition := make([][]int64, 26)
	for i := range transition {
		transition[i] = make([]int64, 26)
	}
	for j := 0; j < 26; j++ {
		for a := 1; a <= nums[j]; a++ {
			transition[(j+a)%26][j] = 1
		}
	}

	powered := matPow(transition, int64(t))
	var total int64
	for i := 0; i < 26; i++ {
		var si int64
		for j := 0; j < 26; j++ {
			si = (si + powered[i][j]*v[j]) % MOD
		}
		total = (total + si) % MOD
	}
	return int(total)
}
