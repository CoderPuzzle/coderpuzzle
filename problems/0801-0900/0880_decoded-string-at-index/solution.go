func decodeAtIndex(s string, k int) string {
	// Forward pass computes the decoded length of each prefix, saturated at a
	// huge cap (far above k) since the true length can exceed 64 bits.
	// Backward pass reduces k through each repetition/letter.
	n := len(s)
	const capLen = int64(1) << 62
	lengths := make([]int64, n)
	cur := int64(0)
	for i := 0; i < n; i++ {
		ch := s[i]
		if ch >= '2' && ch <= '9' {
			d := int64(ch - '0')
			if cur > capLen/d {
				cur = capLen
			} else {
				cur *= d
			}
		} else {
			if cur < capLen {
				cur++
			}
		}
		lengths[i] = cur
	}
	kk := int64(k)
	for i := n - 1; i >= 0; i-- {
		ch := s[i]
		if ch >= '2' && ch <= '9' {
			prev := lengths[i-1]
			kk = (kk-1)%prev + 1
		} else {
			if kk == lengths[i] {
				return string(ch)
			}
		}
	}
	return string(s[0])
}
