func onceTwice(nums []int) []int {
	// Bits of the thrice-repeated values cancel out of any per-bit count
	// taken modulo 3, so two masks tracking each bit column's count mod 3 —
	// one for bits seen once, one for bits seen twice — hold the two
	// specials' unshared bits after a single sweep.
	var ones, twos uint32
	for _, x := range nums {
		u := uint32(x)
		ones = (ones ^ u) &^ twos
		twos = (twos ^ u) &^ ones
	}
	// A bit set in both specials is counted 1 + 2 = 3 times and appears
	// in neither mask, so the masks alone cannot finish the job: a bit
	// where the two values differ must split them apart.
	differ := ones | twos
	bit := differ & (-differ)
	// Triples never straddle that bit; one side holds the single, the
	// other the pair, each beside whole triples — the same automaton run
	// per side recovers each value in full, shared bits included.
	var onOnes, onTwos, offOnes, offTwos uint32
	for _, x := range nums {
		u := uint32(x)
		if u&bit != 0 {
			onOnes = (onOnes ^ u) &^ onTwos
			onTwos = (onTwos ^ u) &^ onOnes
		} else {
			offOnes = (offOnes ^ u) &^ offTwos
			offTwos = (offTwos ^ u) &^ offOnes
		}
	}
	// The side owning the differing bit holds the single exactly when
	// the ones mask owns it; reinterpret the finished 32-bit patterns.
	if ones&bit != 0 {
		return []int{int(int32(onOnes)), int(int32(offTwos))}
	}
	return []int{int(int32(offOnes)), int(int32(onTwos))}
}
