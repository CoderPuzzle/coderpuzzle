func zigZagArrays(n int, l int, r int) int {
	const mod = 1_000_000_007
	m := r - l + 1
	// Reflecting the range (x -> l + r - x) swaps "next step must rise" with
	// "must fall" while fixing the all-ones start, so the falling block
	// always mirrors the rising one and one block evolves alone: by the
	// matrix S with S[w][u] = 1 exactly when u + w <= m - 2.
	s := make([][]int64, m)
	for w := range s {
		s[w] = make([]int64, m)
		for u := 0; u+w <= m-2; u++ {
			s[w][u] = 1
		}
	}
	v := make([]int64, m)
	for i := range v {
		v[i] = 1
	}
	k := int64(n) - 1
	for k > 0 {
		if k&1 == 1 {
			nv := make([]int64, m)
			for i := 0; i < m; i++ {
				// A residue product stays under 2^60, so reduce every eight
				// additions to keep the accumulator inside int64.
				var acc int64
				t := 0
				for j := 0; j < m; j++ {
					acc += s[i][j] * v[j]
					t++
					if t == 8 {
						acc %= mod
						t = 0
					}
				}
				nv[i] = acc % mod
			}
			v = nv
		}
		k >>= 1
		if k > 0 {
			// S[w][u] depends only on w + u, so S is symmetric and stays
			// symmetric under powers: square it as its Gram matrix, one
			// triangle at a time.
			g := make([][]int64, m)
			for i := range g {
				g[i] = make([]int64, m)
			}
			for i := 0; i < m; i++ {
				for j := i; j < m; j++ {
					var acc int64
					t := 0
					for q := 0; q < m; q++ {
						acc += s[i][q] * s[j][q]
						t++
						if t == 8 {
							acc %= mod
							t = 0
						}
					}
					g[i][j] = acc % mod
					g[j][i] = g[i][j]
				}
			}
			s = g
		}
	}
	// The mirrored block doubles the surviving block's mass.
	var total int64
	for _, x := range v {
		total += x
	}
	return int(2 * total % mod)
}
