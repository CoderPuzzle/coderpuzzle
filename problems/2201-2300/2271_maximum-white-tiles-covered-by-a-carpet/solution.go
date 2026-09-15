import "sort"

// Sort by start, then slide a window of intervals whose left ends fall inside
// the carpet. Aligning the carpet's left edge with a tile start is always
// optimal, so trying every tile as the first covered one is enough.
// Non-overlapping tiles in [1, 1e9] keep every sum within int32, but the
// reach l + carpetLen - 1 can approach 2e9.
func maximumWhiteTiles(tiles [][]int, carpetLen int) int {
	sort.Slice(tiles, func(i, j int) bool { return tiles[i][0] < tiles[j][0] })
	n := len(tiles)
	prefix := make([]int64, n+1)
	for i, t := range tiles {
		prefix[i+1] = prefix[i] + int64(t[1]-t[0]+1)
	}
	ans := int64(0)
	j := 0
	for i, t := range tiles {
		end := int64(t[0]) + int64(carpetLen) - 1
		for j < n && int64(tiles[j][0]) <= end {
			j++
		}
		covered := prefix[j] - prefix[i]
		if int64(tiles[j-1][1]) > end {
			covered -= int64(tiles[j-1][1]) - end
		}
		if covered > ans {
			ans = covered
		}
	}
	return int(ans)
}
