import "strconv"

// One string per surviving side of the bracket, in round order. Each round
// folds the list against its own reverse: side i meets side m-1-i, the
// strong-vs-weak pairing, recorded as "(a,b)" with a bare comma and no space.
func findContestMatch(n int) string {
	sides := make([]string, 0, n)
	for team := 1; team <= n; team++ {
		sides = append(sides, strconv.Itoa(team))
	}
	for len(sides) > 1 {
		m := len(sides)
		next := make([]string, 0, m/2)
		for i := 0; i < m/2; i++ {
			next = append(next, "("+sides[i]+","+sides[m-1-i]+")")
		}
		sides = next
	}
	return sides[0]
}
