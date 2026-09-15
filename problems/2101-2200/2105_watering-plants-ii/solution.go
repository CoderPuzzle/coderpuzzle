func minimumRefill(plants []int, capacityA int, capacityB int) int {
	left, right := 0, len(plants)-1
	remainingA, remainingB := capacityA, capacityB
	refills := 0
	for left < right {
		if remainingA < plants[left] {
			remainingA = capacityA
			refills++
		}
		remainingA -= plants[left]

		if remainingB < plants[right] {
			remainingB = capacityB
			refills++
		}
		remainingB -= plants[right]
		left++
		right--
	}
	if left == right && remainingA < plants[left] && remainingB < plants[left] {
		refills++
	}
	return refills
}
