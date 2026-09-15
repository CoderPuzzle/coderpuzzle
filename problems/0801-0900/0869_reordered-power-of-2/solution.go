// Reordering only permutes digits, so the answer is an inventory match:
// count how many of each digit 0..9 n holds, then walk the powers of two
// up to the bound n <= 10^9 admits — 2^0 through 2^29 = 536870912 — and
// compare inventories. A match is always reachable: the power itself is
// one of the legal reorderings.
func reorderedPowerOf2(n int) bool {
	counts := [10]int{}
	for m := n; m > 0; m /= 10 {
		counts[m%10]++
	}
	for p := 1; p <= 1000000000; p *= 2 {
		powerCounts := [10]int{}
		for m := p; m > 0; m /= 10 {
			powerCounts[m%10]++
		}
		if powerCounts == counts {
			return true
		}
	}
	return false
}
