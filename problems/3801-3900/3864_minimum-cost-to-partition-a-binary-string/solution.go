// A segment's cost depends only on its length L and its count X of ones:
// flatCost when X == 0, otherwise L * X * encCost. Because an even segment
// may be split into two equal halves, the best value of a segment is the
// cheaper of stopping here or paying for both halves. The halves are
// disjoint intervals, so a plain recursion visits each reachable segment
// exactly once and is O(n).
func minCost(s string, encCost int, flatCost int) int64 {
	prefix := make([]int, len(s)+1)
	for i := 0; i < len(s); i++ {
		prefix[i+1] = prefix[i]
		if s[i] == '1' {
			prefix[i+1]++
		}
	}
	var solve func(l, length int) int64
	solve = func(l, length int) int64 {
		x := prefix[l+length] - prefix[l]
		var best int64
		if x == 0 {
			best = int64(flatCost)
		} else {
			best = int64(length) * int64(x) * int64(encCost)
		}
		if length%2 == 0 {
			half := length / 2
			split := solve(l, half) + solve(l+half, half)
			if split < best {
				best = split
			}
		}
		return best
	}
	return solve(0, len(s))
}
