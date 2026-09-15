// If the total isn't a multiple of 3, no equal three-way split can exist.
// Otherwise each part must sum to target = total / 3. Scan for two
// target-sum boundaries, stopping before the last index so at least one
// element is always left for the third part; once total == 3 * target,
// whatever remains after two hits is guaranteed to sum to target too.
func canThreePartsEqualSum(arr []int) bool {
	total := 0
	for _, value := range arr {
		total += value
	}
	if total%3 != 0 {
		return false
	}
	target := total / 3
	count := 0
	running := 0
	for i := 0; i < len(arr)-1; i++ {
		running += arr[i]
		if running == target {
			count++
			running = 0
			if count == 2 {
				return true
			}
		}
	}
	return false
}
