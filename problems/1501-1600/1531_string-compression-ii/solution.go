import "math"

// dp(i, budget) is the shortest encoding of s[i:] using at most `budget`
// more deletions. Memoized on (i, budget), both bounded by n.
func getLengthOfOptimalCompression(s string, k int) int {
	n := len(s)
	memo := make([][]int, n+1)
	for i := range memo {
		memo[i] = make([]int, k+1)
		for b := range memo[i] {
			memo[i][b] = -1
		}
	}

	var dp func(i, budget int) int
	dp = func(i, budget int) int {
		if n-i <= budget {
			// Every remaining character can simply be deleted.
			return 0
		}
		if memo[i][budget] != -1 {
			return memo[i][budget]
		}
		// Delete s[i] outright and move on.
		best := math.MaxInt32
		if budget > 0 {
			best = dp(i+1, budget-1)
		}
		// Or keep a run of s[i]'s character: scan forward, paying one
		// deletion for every mismatched character folded into the run.
		same, diff := 0, 0
		for j := i; j < n; j++ {
			if s[j] == s[i] {
				same++
			} else {
				diff++
				if diff > budget {
					break
				}
			}
			best = min(best, calcLen(same)+dp(j+1, budget-diff))
		}
		memo[i][budget] = best
		return best
	}

	return dp(0, k)
}

func calcLen(count int) int {
	if count == 0 {
		return 0
	}
	if count == 1 {
		return 1
	}
	if count < 10 {
		return 2
	}
	if count < 100 {
		return 3
	}
	return 4
}
