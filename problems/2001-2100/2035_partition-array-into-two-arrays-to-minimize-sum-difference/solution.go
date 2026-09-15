import (
	"math/bits"
	"sort"
)

func minimumDifference(nums []int) int {
	half := len(nums) / 2

	// Bucket each half's subset sums by how many elements produced them;
	// a half of length <= 15 keeps this at most 2^15 entries.
	subsetSumsByCount := func(from, to int) [][]int64 {
		m := to - from
		res := make([][]int64, m+1)
		for mask := 0; mask < (1 << m); mask++ {
			cnt := bits.OnesCount(uint(mask))
			total := int64(0)
			for i := 0; i < m; i++ {
				if mask>>i&1 != 0 {
					total += int64(nums[from+i])
				}
			}
			res[cnt] = append(res[cnt], total)
		}
		return res
	}

	A := subsetSumsByCount(0, half)
	B := subsetSumsByCount(half, len(nums))

	total := int64(0)
	for _, v := range nums {
		total += int64(v)
	}

	// If the first half contributes c elements with sum a, the second half
	// must contribute exactly half-c elements with sum b — both sides then
	// have `half` elements and difference |total - 2(a+b)|.
	ans := int64(1) << 62
	for c := 0; c <= half; c++ {
		Bc := append([]int64(nil), B[half-c]...)
		sort.Slice(Bc, func(i, j int) bool { return Bc[i] < Bc[j] })
		for _, a := range A[c] {
			// b >= total/2 - a  <=>  2*b >= total - 2*a (exact integers)
			want := total - 2*a
			lo, hi := 0, len(Bc)
			for lo < hi {
				mid := (lo + hi) / 2
				if 2*Bc[mid] < want {
					lo = mid + 1
				} else {
					hi = mid
				}
			}
			// The closest b sits on one side of the insertion point — try both.
			idx := lo
			if idx < len(Bc) {
				d := total - 2*(a+Bc[idx])
				if d < 0 {
					d = -d
				}
				if d < ans {
					ans = d
				}
			}
			if idx > 0 {
				d := total - 2*(a+Bc[idx-1])
				if d < 0 {
					d = -d
				}
				if d < ans {
					ans = d
				}
			}
		}
	}
	return int(ans)
}
