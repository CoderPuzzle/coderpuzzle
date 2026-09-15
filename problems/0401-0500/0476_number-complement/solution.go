// The mask climbs to 2^31 - 1 at the top of the range — the exact ceiling
// of a signed 32-bit int — so it is built in int64 to keep the doubling
// away from that boundary.
func findComplement(num int) int {
	// Doubling a run of ones and adding one extends it by one bit —
	// 1 -> 11 -> 111 — so mask is always 2^k - 1 covering num's window.
	mask := int64(1)
	for mask < int64(num) {
		mask = mask*2 + 1
	}
	// XOR with the all-ones window flips every bit num occupies and
	// nothing above it.
	return int(mask ^ int64(num))
}
