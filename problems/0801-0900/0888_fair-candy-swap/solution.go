// Swapping Alice's box a for Bob's box b leaves both totals equal exactly
// when sumA - a + b == sumB - b + a, which rearranges to b == a - delta
// with delta = (sumA - sumB) / 2. A hash set of Bob's boxes answers each
// candidate in O(1), and one scan that keeps the smallest matching pair
// (a first, then b) yields the statement's pinned answer.
func fairCandySwap(aliceSizes []int, bobSizes []int) []int {
	aliceTotal := 0
	for _, size := range aliceSizes {
		aliceTotal += size
	}
	bobTotal := 0
	for _, size := range bobSizes {
		bobTotal += size
	}
	delta := (aliceTotal - bobTotal) / 2
	bobBoxes := make(map[int]bool)
	for _, size := range bobSizes {
		bobBoxes[size] = true
	}
	bestAlice, bestBob := 0, 0
	found := false
	for _, size := range aliceSizes {
		b := size - delta
		if bobBoxes[b] && (!found || size < bestAlice || (size == bestAlice && b < bestBob)) {
			bestAlice, bestBob = size, b
			found = true
		}
	}
	if !found {
		return nil
	}
	return []int{bestAlice, bestBob}
}
