// Exactly one language may be taught, so a friendship that already shares
// some language is settled forever and never forces teaching; filter down
// to the needy pairs that share nothing. A chosen language L fixes exactly
// the needy pairs whose both sides know L afterwards, and a user lacking L
// is taught once however many needy pairs it appears in — so the answer is
// the minimum, over the n languages, of the users to teach.
func minimumTeachings(n int, languages [][]int, friendships [][]int) int {
	users := len(languages)
	known := make([][]bool, users+1)
	for user := 1; user <= users; user++ {
		known[user] = make([]bool, n+1)
		for _, language := range languages[user-1] {
			known[user][language] = true
		}
	}
	var needy [][2]int
	for _, pair := range friendships {
		shares := false
		for language := 1; language <= n && !shares; language++ {
			shares = known[pair[0]][language] && known[pair[1]][language]
		}
		if !shares {
			needy = append(needy, [2]int{pair[0], pair[1]})
		}
	}
	best := users
	for language := 1; language <= n; language++ {
		// taught[user] keeps each user lacking this language counted
		// once across every needy pair it takes part in.
		taught := make([]bool, users+1)
		count := 0
		for _, pair := range needy {
			for _, user := range pair {
				if !known[user][language] && !taught[user] {
					taught[user] = true
					count++
				}
			}
		}
		if count < best {
			best = count
		}
	}
	return best
}
