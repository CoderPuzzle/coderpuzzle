func minimumChanges(s string, k int) int {
	n := len(s)
	// Proper divisors of every length L: 1 <= d < L. A part of length 1
	// has none, so every part of a valid partition has length >= 2.
	divisors := make([][]int, n+1)
	for d := 1; d <= n/2; d++ {
		for length := 2 * d; length <= n; length += d {
			divisors[length] = append(divisors[length], d)
		}
	}
	const inf = 1 << 30
	// cost[i][j]: min letter changes turning s[i..j] into a
	// semi-palindrome, minimized over its proper divisors d. For each d
	// the d repeating-pattern groups must each become a palindrome, and
	// a group costs one change per mismatched mirror pair.
	cost := make([][]int, n)
	for i := range cost {
		cost[i] = make([]int, n)
	}
	for i := 0; i+1 < n; i++ {
		for j := i + 1; j < n; j++ {
			length := j - i + 1
			best := inf
			for _, d := range divisors[length] {
				changes := 0
				for g := 0; g < d; g++ {
					members := (length-1-g)/d + 1
					for a, b := g, g+(members-1)*d; a < b; a, b = a+d, b-d {
						if s[i+a] != s[i+b] {
							changes++
						}
					}
				}
				if changes < best {
					best = changes
				}
			}
			cost[i][j] = best
		}
	}
	// ways[i] for the current part count p: min changes splitting the
	// suffix s[i:] into p semi-palindrome parts. Transition: pick the
	// first part s[i..x] and add the (p - 1)-part cost of s[x + 1:].
	cur := make([]int, n)
	prev := make([]int, n)
	for i := 0; i < n; i++ {
		cur[i] = cost[i][n-1]
	}
	for parts := 2; parts <= k; parts++ {
		cur, prev = prev, cur
		for i := range cur {
			cur[i] = inf
		}
		// First part s[i..x] needs x - i + 1 >= 2 and the remaining
		// suffix needs length >= 2 * (parts - 1): x <= n - 2*parts + 1.
		lastStart := n - 2*parts + 1
		for i := 0; i < lastStart; i++ {
			best := inf
			for x := i + 1; x <= lastStart; x++ {
				if v := cost[i][x] + prev[x+1]; v < best {
					best = v
				}
			}
			cur[i] = best
		}
	}
	return cur[0]
}
