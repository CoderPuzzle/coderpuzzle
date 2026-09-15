import (
	"bytes"
	"sort"
	"strconv"
)

func isDigitorialPermutation(n int) bool {
	// The factorial digit sum ignores digit order, so every
	// permutation of n shares one sum s. A digitorial permutation p
	// of n must equal its own factorial digit sum, which is also s,
	// so p = s and p reuses exactly n's digits. Conversely, when s
	// uses exactly n's digits, s itself is a leading-zero-free
	// arrangement of them (s >= 1) and equals its own factorial
	// digit sum. With n <= 10^9, s <= 10 * 9! = 3,628,800, so int
	// arithmetic never overflows.
	fact := [10]int{1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880}
	digits := strconv.Itoa(n)
	s := 0
	for _, c := range []byte(digits) {
		s += fact[c-'0']
	}
	a := []byte(digits)
	sort.Slice(a, func(i, j int) bool { return a[i] < a[j] })
	b := []byte(strconv.Itoa(s))
	sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
	return bytes.Equal(a, b)
}
