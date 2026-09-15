import "fmt"

// Recursion over "which 1-cell do we clear next" with a memo map keyed on
// the bitmask of remaining ones. At most 15 cells bounds both the state
// count (2^15) and the branching factor per state.
var memo map[int]int

func solve(state, m, n int) int {
	if state == 0 {
		return 0
	}
	if v, ok := memo[state]; ok {
		return v
	}
	best := m*n + 1
	for cell := 0; cell < m*n; cell++ {
		if (state>>cell)&1 == 0 {
			continue
		}
		cleared := state
		for j := 0; j < n; j++ {
			cleared &^= 1 << ((cell/n)*n + j)
		}
		for i := 0; i < m; i++ {
			cleared &^= 1 << (i*n + cell%n)
		}
		if candidate := 1 + solve(cleared, m, n); candidate < best {
			best = candidate
		}
	}
	memo[state] = best
	return best
}

func removeOnes(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	state := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				state |= 1 << (i*n + j)
			}
		}
	}
	memo = make(map[int]int)
	return solve(state, m, n)
}
