func maxArea(height []int) int64 {
	// Start with the widest possible container, one pointer at each end.
	left, right := 0, len(height)-1
	best := int64(0)
	for left < right {
		// Area = width x the shorter wall: water above it would spill.
		h := height[left]
		if height[right] < h {
			h = height[right]
		}
		area := int64(right-left) * int64(h)
		if area > best {
			best = area
		}
		// Moving the taller wall inward can never help -- the area stays
		// capped by the shorter wall while the width falls -- so the
		// shorter wall's current pair is the best it can ever be part of
		// and it is safe to discard. Ties move right, equally correct.
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return best
}
