func scoreValidator(events []string) []int {
	// Single left-to-right pass. Only "W" moves the counter, so it alone can
	// trigger the stop-at-10 rule; scoring events never stop anything.
	score := 0
	counter := 0
	for _, event := range events {
		if event == "W" {
			counter++
		} else if event == "WD" || event == "NB" {
			score++
		} else {
			score += int(event[0] - '0')
		}
		// Events after the counter reaches 10 are ignored entirely.
		if counter == 10 {
			break
		}
	}
	return []int{score, counter}
}
