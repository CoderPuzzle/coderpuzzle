// Removing meeting i frees the span between its neighbours, which is
// g[i] + d + g[i+1] long with g the gaps around it. If i fits into a gap
// OTHER than its two flanking ones, that whole span becomes free time;
// otherwise i can only slide inside it, leaving g[i] + g[i+1] free.
// Prefix/suffix maxima over the gap array make "largest non-flanking gap"
// an O(1) lookup, so the scan stays linear.
func maxFreeTime(eventTime int, startTime []int, endTime []int) int {
	n := len(startTime)
	gaps := make([]int, n+1)
	gaps[0] = startTime[0]
	for i := 1; i < n; i++ {
		gaps[i] = startTime[i] - endTime[i-1]
	}
	gaps[n] = eventTime - endTime[n-1]
	prefix := make([]int, n+2)
	for i := 0; i <= n; i++ {
		prefix[i+1] = max(prefix[i], gaps[i])
	}
	suffix := make([]int, n+2)
	for i := n; i >= 0; i-- {
		suffix[i] = max(suffix[i+1], gaps[i])
	}
	answer := 0
	for _, gap := range gaps {
		answer = max(answer, gap)
	}
	for i := 0; i < n; i++ {
		duration := endTime[i] - startTime[i]
		// Largest gap outside i's two flanking gaps decides move vs slide.
		host := max(prefix[i], suffix[i+2])
		merged := gaps[i] + gaps[i+1]
		if host >= duration {
			merged += duration
		}
		answer = max(answer, merged)
	}
	return answer
}
