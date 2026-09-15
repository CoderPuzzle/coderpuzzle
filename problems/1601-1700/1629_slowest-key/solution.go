// A single left-to-right scan computes each duration once and keeps the
// best (longest duration, then lexicographically largest key).
func slowestKey(releaseTimes []int, keysPressed string) string {
	bestDuration := releaseTimes[0]
	bestChar := keysPressed[0]
	for i := 1; i < len(releaseTimes); i++ {
		duration := releaseTimes[i] - releaseTimes[i-1]
		c := keysPressed[i]
		if duration > bestDuration || (duration == bestDuration && c > bestChar) {
			bestDuration = duration
			bestChar = c
		}
	}
	return string(bestChar)
}
