import "strings"

// The operation maps (0,0)->(0,0), (0,1)/(1,0)->(1,1), and (1,1)->(1,0):
// an all-zero string is frozen forever, and once a 1 exists it can never
// be the last one destroyed. "Contains a 1" is invariant in both
// directions, so comparing membership on the two sides decides everything.
func makeStringsEqual(s string, target string) bool {
	hasS := strings.IndexByte(s, '1') >= 0
	hasTarget := strings.IndexByte(target, '1') >= 0
	return hasS == hasTarget
}
