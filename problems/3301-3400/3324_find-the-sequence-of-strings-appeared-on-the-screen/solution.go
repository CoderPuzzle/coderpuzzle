// Minimum presses are forced: each new position starts with key 1 (key 2
// on an empty screen is impossible), appending 'a', and key 2 then
// advances that last character (c - 'a') times to the wanted one. The
// screen states therefore stream out deterministically — for each
// position, emit the string after the append and again after every
// advance — which is exactly the sequence of all strings that ever
// appear.
func stringSequence(target string) []string {
	screen := make([]byte, 0, len(target))
	states := []string{}
	for _, c := range target {
		screen = append(screen, 'a')
		states = append(states, string(screen))
		for d := byte('b'); d <= byte(c); d++ {
			screen[len(screen)-1] = d
			states = append(states, string(screen))
		}
	}
	return states
}
