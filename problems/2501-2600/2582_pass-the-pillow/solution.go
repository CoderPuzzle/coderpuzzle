// One forward traversal of the line spans n - 1 seconds, so the walk
// decomposes into full traversals plus a remainder leg. An even count of
// traversals ends moving forward from person 1; an odd count ends moving
// backward from person n.
func passThePillow(n int, time int) int {
	legs := time / (n - 1)
	rem := time % (n - 1)
	if legs%2 == 0 {
		return 1 + rem
	}
	return n - rem
}
