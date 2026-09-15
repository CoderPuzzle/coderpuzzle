func subarrayBitwiseORs(arr []int) int {
	seen := map[int]struct{}{}
	// current: distinct OR values of subarrays ending at this index.
	current := map[int]struct{}{}
	for _, x := range arr {
		// Every subarray ending here is [x] alone or an old suffix OR
		// extended by x; OR never clears bits, so current stays small
		// (at most ~b+1 values for b-bit numbers).
		nxt := make(map[int]struct{}, len(current)+1)
		for y := range current {
			nxt[x|y] = struct{}{}
		}
		nxt[x] = struct{}{}
		current = nxt
		for v := range current {
			seen[v] = struct{}{}
		}
	}
	return len(seen)
}
