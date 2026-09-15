import "strings"

// A shift moves the leftmost character of s to the rightmost position; k
// shifts move the first k characters, still in order, onto the end, so every
// rotation of s is s[k:] + s[:k]. Doubling s spells all n of them out at
// once: the length-n windows of s+s are exactly the rotations, so goal
// matches one exactly when it occurs inside s+s. The length check must come
// first: a shorter goal can occur inside s+s without being a rotation.
func rotateString(s string, goal string) bool {
	return len(s) == len(goal) && strings.Contains(s+s, goal)
}
