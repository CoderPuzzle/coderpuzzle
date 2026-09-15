// Cost of putting the a/b boundary right before index 0: delete every
// 'a' (the whole string would sit in the b-region). Then slide the
// boundary one character right at a time: passing an 'a' removes it
// from the future deletion cost, passing a 'b' adds it, since it now
// sits left of the boundary.
func minimumDeletions(s string) int {
	cost := 0
	for _, c := range s {
		if c == 'a' {
			cost++
		}
	}
	best := cost
	for _, c := range s {
		if c == 'a' {
			cost--
		} else {
			cost++
		}
		if cost < best {
			best = cost
		}
	}
	return best
}
