import "sort"

func asteroidsDestroyed(mass int, asteroids []int) bool {
	sort.Ints(asteroids)
	currentMass := int64(mass)
	for _, asteroid := range asteroids {
		if currentMass < int64(asteroid) {
			return false
		}
		currentMass += int64(asteroid)
	}
	return true
}
