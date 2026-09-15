import "math"

func numberOfRoutes(grid []string, d int) int64 {
	const MOD = 1_000_000_007
	n := len(grid)
	m := len(grid[0])
	// up[c]: ways standing on (r, c) after an arrival from below (or the
	// start); same_: ways standing there after a same-row slide. A slide
	// may not follow another slide, so slides feed only from up.
	up := make([]int64, m)
	for c := 0; c < m; c++ {
		if grid[n-1][c] == '.' {
			up[c] = 1
		}
	}

	slidesOf := func(upValues []int64, row int) []int64 {
		// Prefix sums over the row's up-values; the Euclidean bound for a
		// same-row move is |dc| <= d (dr = 0).
		pref := make([]int64, m+1)
		for v := 0; v < m; v++ {
			if grid[row][v] == '.' {
				pref[v+1] = (pref[v] + upValues[v]) % MOD
			} else {
				pref[v+1] = pref[v]
			}
		}
		out := make([]int64, m)
		for c := 0; c < m; c++ {
			if grid[row][c] != '.' {
				continue
			}
			lo := max(0, c-d)
			hi := min(m-1, c+d)
			out[c] = ((pref[hi+1]-pref[lo]-upValues[c])%MOD + MOD) % MOD
		}
		return out
	}

	same_ := slidesOf(up, n-1)
	// An up move has dr = -1, so 1 + dc^2 <= d^2 bounds |dc| by
	// floor(sqrt(d^2 - 1)) — d = 1 forbids diagonals entirely.
	wUp := int(math.Floor(math.Sqrt(float64(d*d - 1))))
	for r := n - 2; r >= 0; r-- {
		// Every way of standing anywhere in row r+1 may step up into
		// row r's window around column c.
		pref := make([]int64, m+1)
		for v := 0; v < m; v++ {
			if grid[r+1][v] == '.' {
				pref[v+1] = (pref[v] + up[v] + same_[v]) % MOD
			} else {
				pref[v+1] = pref[v]
			}
		}
		newUp := make([]int64, m)
		for c := 0; c < m; c++ {
			if grid[r][c] != '.' {
				continue
			}
			lo := max(0, c-wUp)
			hi := min(m-1, c+wUp)
			newUp[c] = ((pref[hi+1]-pref[lo])%MOD + MOD) % MOD
		}
		same_ = slidesOf(newUp, r)
		up = newUp
	}
	var ans int64
	for c := 0; c < m; c++ {
		if grid[0][c] == '.' {
			ans = (ans + up[c] + same_[c]) % MOD
		}
	}
	return ans
}
