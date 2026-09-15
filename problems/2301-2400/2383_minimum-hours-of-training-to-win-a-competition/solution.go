func minNumberOfHours(initialEnergy int, initialExperience int, energy []int, experience []int) int {
	// Energy only ever drains, so one shortfall computation covers
	// every fight; experience grows after each win, so top up just
	// enough whenever the next opponent is not strictly weaker.
	hours := 0
	e, x := initialEnergy, initialExperience
	for i := range energy {
		if x <= experience[i] {
			hours += experience[i] + 1 - x
			x = experience[i] + 1
		}
		x += experience[i]
		e -= energy[i]
	}
	if e <= 0 {
		hours += 1 - e
	}
	return hours
}
