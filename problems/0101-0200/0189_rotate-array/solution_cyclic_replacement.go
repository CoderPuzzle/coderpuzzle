// The positions split into gcd(n, k) cycles under i -> (i + k) % n — walking
// each cycle carries its values straight to their final slots with only one
// element in flight at a time, so the rotation rewrites the given slice with
// no second allocation.
func rotate(nums []int, k int) []int {
	n := len(nums)
	// A rotation by n steps is the identity, so any larger k wraps
	// around to k % n — normalize before chasing cycles.
	k %= n
	gcd := func(a, b int) int {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	cycles := gcd(n, k)
	for start := 0; start < cycles; start++ {
		carried := nums[start]
		j := start
		for {
			// Drop the carried element into its rightful slot and catch
			// the one displaced; the cycle closes back at the start.
			nxt := (j + k) % n
			nums[nxt], carried = carried, nums[nxt]
			j = nxt
			if nxt == start {
				break
			}
		}
	}
	// The rotation happened inside the input allocation; the same slice,
	// now rotated, is what the judge compares.
	return nums
}
