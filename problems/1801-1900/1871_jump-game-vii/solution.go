func canReach(s string, minJump int, maxJump int) bool {
	// Every reachable i contributes the interval [i+minJump, i+maxJump],
	// so "some source reaches j" is a range-count query; a rolling
	// prefix sum over reach[] answers it in O(1) per position.
	n := len(s)
	pre := make([]int, n+1)
	pre[1] = 1 // index 0 is reachable by definition
	for i := 1; i < n; i++ {
		ok := false
		if s[i] == '0' && i >= minJump {
			hi := i - minJump
			lo := i - maxJump
			if lo < 0 {
				lo = 0
			}
			ok = pre[hi+1]-pre[lo] > 0
		}
		if ok {
			pre[i+1] = pre[i] + 1
		} else {
			pre[i+1] = pre[i]
		}
	}
	return pre[n] > pre[n-1]
}
