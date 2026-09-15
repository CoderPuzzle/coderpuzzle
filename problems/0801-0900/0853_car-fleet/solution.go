import "sort"

func carFleet(target int, position []int, speed []int) int {
	type car struct {
		pos, spd int
	}
	// Cars cannot pass each other, so sweep from the car nearest
	// the target backward.
	cars := make([]car, len(position))
	for i := range position {
		cars[i] = car{position[i], speed[i]}
	}
	sort.Slice(cars, func(a, b int) bool {
		if cars[a].pos != cars[b].pos {
			return cars[a].pos > cars[b].pos
		}
		return cars[a].spd > cars[b].spd
	})
	fleets := 0
	lastTime := 0.0
	for _, c := range cars {
		// A car's fate is its alone-time to the target.
		t := float64(target-c.pos) / float64(c.spd)
		// Strictly later never catches the fleet ahead: a new
		// fleet lead. Otherwise it merges (equality at the target
		// merges), and lastTime — the current fleet's arrival
		// time — stays put.
		if t > lastTime {
			fleets++
			lastTime = t
		}
	}
	return fleets
}
