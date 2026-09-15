// One O(1) set lookup per doubling step replaces a fresh scan of nums
// each time; values stay <= 2048 (double the 1000 cap), so no type ever
// comes close to overflowing.
func findFinalValue(nums []int, original int) int {
	seen := make(map[int]struct{}, len(nums))
	for _, value := range nums {
		seen[value] = struct{}{}
	}
	for {
		if _, ok := seen[original]; !ok {
			return original
		}
		original *= 2
	}
}
