// Every "AB" rides along for free (2 * z total): prepend unused ones to a
// string starting with 'A', or slide them between the first two Bs of a
// "BB"-led string — either way k idle blocks become 2k characters and no
// AAA/BBB appears, so some optimum uses all z copies. What remains
// alternates whole "AA"/"BB" blocks (AABB… or BBAA…); alternating runs
// differ by at most one — the larger side gains exactly one extra run when
// x != y — pricing the doubles at 4 * min(x, y) + 2 * (x != y).
func longestString(x int, y int, z int) int {
	extra := 0
	if x != y {
		extra = 2
	}
	return 2*z + 4*min(x, y) + extra
}
