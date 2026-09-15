import "strings"

func customSortString(order string, s string) string {
	// How many of each letter s holds; the alphabet is a fixed
	// constant, so 26 slots replace a hash map.
	counts := [26]int{}
	for _, c := range []byte(s) {
		counts[c-'a']++
	}
	var out strings.Builder
	out.Grow(len(s))
	// Emission pass 1: walk order itself, emitting each letter it
	// names as many times as s holds it. order's sequence IS the
	// relative order the answer must carry, so this prefix already
	// satisfies it; letters absent from s contribute nothing. The
	// zeroing doubles as a membership mark for pass 2.
	for _, c := range []byte(order) {
		if n := counts[c-'a']; n > 0 {
			for i := 0; i < n; i++ {
				out.WriteByte(c)
			}
			counts[c-'a'] = 0
		}
	}
	// Emission pass 2: leftovers. Letters order never mentions are
	// unconstrained, so the pinned form sends them to the tail in
	// their original s order — walk s and keep the still-counted.
	for _, c := range []byte(s) {
		if counts[c-'a'] > 0 {
			out.WriteByte(c)
			counts[c-'a']--
		}
	}
	return out.String()
}
