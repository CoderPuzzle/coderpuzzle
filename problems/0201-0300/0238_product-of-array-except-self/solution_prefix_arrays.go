// The judge's expected values are exact big integers, so the products are
// computed with math/big-style arithmetic (implemented directly on digit
// slices). coderpuzzleRawInt serializes as a bare JSON number token via its
// MarshalJSON method; the harness marshals the return value with encoding/json.
type coderpuzzleRawInt string

func (v coderpuzzleRawInt) MarshalJSON() ([]byte, error) { return []byte(v), nil }

// coderpuzzleBig is a signed big integer stored base 1e9, little-endian.
// An empty digit slice represents zero.
type coderpuzzleBig struct {
	neg bool
	d   []uint32
}

func coderpuzzleBigMulSmall(a coderpuzzleBig, v int64) coderpuzzleBig {
	if v == 0 || len(a.d) == 0 {
		return coderpuzzleBig{}
	}
	neg := a.neg != (v < 0)
	x := uint64(v)
	if v < 0 {
		x = uint64(-v)
	}
	d := make([]uint32, 0, len(a.d)+2)
	var carry uint64
	for _, digit := range a.d {
		cur := uint64(digit)*x + carry
		d = append(d, uint32(cur%1000000000))
		carry = cur / 1000000000
	}
	for carry > 0 {
		d = append(d, uint32(carry%1000000000))
		carry /= 1000000000
	}
	return coderpuzzleBig{neg: neg, d: d}
}

func coderpuzzleBigMulBig(a, b coderpuzzleBig) coderpuzzleBig {
	if len(a.d) == 0 || len(b.d) == 0 {
		return coderpuzzleBig{}
	}
	d := make([]uint32, len(a.d)+len(b.d)+1)
	for i := 0; i < len(a.d); i++ {
		var carry uint64
		j := 0
		for j < len(b.d) || carry > 0 {
			cur := uint64(d[i+j]) + carry
			if j < len(b.d) {
				cur += uint64(a.d[i]) * uint64(b.d[j])
			}
			d[i+j] = uint32(cur % 1000000000)
			carry = cur / 1000000000
			j++
		}
	}
	for len(d) > 0 && d[len(d)-1] == 0 {
		d = d[:len(d)-1]
	}
	return coderpuzzleBig{neg: a.neg != b.neg, d: d}
}

func (b coderpuzzleBig) String() string {
	if len(b.d) == 0 {
		return "0"
	}
	s := ""
	if b.neg {
		s = "-"
	}
	s += fmt.Sprintf("%d", b.d[len(b.d)-1])
	for i := len(b.d) - 2; i >= 0; i-- {
		s += fmt.Sprintf("%09d", b.d[i])
	}
	return s
}

func productExceptSelf(nums []int) []any {
	// The product except nums[i] factors as (product of everything
	// before i) x (product of everything after i), both computable as
	// running products — no division, which zeros would break anyway.
	n := len(nums)
	pre := make([]coderpuzzleBig, n+1)
	// pre[i] = product of the i elements preceding index i.
	pre[0] = coderpuzzleBig{d: []uint32{1}}
	for i := 0; i < n; i++ {
		pre[i+1] = coderpuzzleBigMulSmall(pre[i], int64(nums[i]))
	}
	suf := make([]coderpuzzleBig, n+1)
	// suf[i] = product of everything from index i onward.
	suf[n] = coderpuzzleBig{d: []uint32{1}}
	for i := n - 1; i >= 0; i-- {
		suf[i] = coderpuzzleBigMulSmall(suf[i+1], int64(nums[i]))
	}
	answer := make([]any, n)
	// pre[i] x suf[i+1] spans everything except nums[i] itself; a lone
	// zero zeroes every cell but its own, automatically.
	for i := 0; i < n; i++ {
		answer[i] = coderpuzzleRawInt(coderpuzzleBigMulBig(pre[i], suf[i+1]).String())
	}
	return answer
}
