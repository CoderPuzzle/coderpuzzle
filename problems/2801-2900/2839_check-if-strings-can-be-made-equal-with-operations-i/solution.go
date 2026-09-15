import "sort"

func canBeEqual(s1 string, s2 string) bool {
	// A legal swap joins indices exactly 2 apart, so it exchanges only
	// the slots {0, 2} or only the slots {1, 3}: no letter can ever
	// cross between the two pairs, and repeating a swap just undoes it.
	// Both strings are therefore stuck reshuffling inside their own two
	// pairs, and they can be made equal exactly when each pair already
	// carries the same two letters in either order — compare unordered.
	for _, a := range []int{0, 1} {
		p := []string{s1[a : a+1], s1[a+2 : a+3]}
		q := []string{s2[a : a+1], s2[a+2 : a+3]}
		sort.Strings(p)
		sort.Strings(q)
		if p[0] != q[0] || p[1] != q[1] {
			return false
		}
	}
	return true
}
