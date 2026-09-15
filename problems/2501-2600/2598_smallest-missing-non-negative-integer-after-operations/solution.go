func findSmallestInteger(nums []int, value int) int {
	// Adding or subtracting value never changes an element's residue
	// mod value, so element x can be retargeted anywhere in its own
	// residue class. Count how many elements land in each residue
	// (normalised, since % keeps the dividend's sign), then consume
	// targets 0, 1, 2, ... in order — target t draws one element from
	// class t % value. The first target whose class is exhausted is
	// the largest achievable MEX.
	count := make([]int, value)
	for _, x := range nums {
		r := x % value
		if r < 0 {
			r += value
		}
		count[r]++
	}
	mex := 0
	for count[mex%value] > 0 {
		count[mex%value]--
		mex++
	}
	return mex
}
