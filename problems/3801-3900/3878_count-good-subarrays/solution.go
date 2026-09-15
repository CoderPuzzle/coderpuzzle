import "math/bits"

// A subarray is good iff its bitwise OR equals its maximum element, i.e.
// every element's bits are contained in the max's bits. Count each subarray
// at its rightmost maximum: index i owns subarrays inside (left[i], right[i])
// from two monotonic stacks, and the bit condition shrinks that window to the
// nearest element on each side carrying a bit absent from nums[i]. At n = 10^5
// the answer reaches n(n+1)/2 ~ 5*10^9, so the accumulator is an int64.
func countGoodSubarrays(nums []int) int64 {
	n := len(nums)
	left := make([]int, n)
	right := make([]int, n)
	stack := make([]int, n)
	size := 0
	for i := 0; i < n; i++ {
		for size > 0 && nums[stack[size-1]] <= nums[i] {
			size--
		}
		if size > 0 {
			left[i] = stack[size-1]
		} else {
			left[i] = -1
		}
		stack[size] = i
		size++
	}
	size = 0
	for i := n - 1; i >= 0; i-- {
		for size > 0 && nums[stack[size-1]] < nums[i] {
			size--
		}
		if size > 0 {
			right[i] = stack[size-1]
		} else {
			right[i] = n
		}
		stack[size] = i
		size++
	}
	const numBits = 31 // nums[i] < 2^30; bit 30 stays unused
	last := make([]int, numBits)
	nxt := make([]int, numBits)
	for b := range last {
		last[b] = -1
		nxt[b] = n
	}
	maxLeft := make([]int, n)
	minRight := make([]int, n)
	for i, x := range nums {
		m := -1
		for b := 0; b < numBits; b++ {
			if ((x>>b)&1) == 0 && last[b] > m {
				m = last[b]
			}
		}
		maxLeft[i] = m
		for y := x; y != 0; y &= y - 1 {
			low := y & -y
			last[bits.TrailingZeros(uint(low))] = i
		}
	}
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		m := n
		for b := 0; b < numBits; b++ {
			if ((x>>b)&1) == 0 && nxt[b] < m {
				m = nxt[b]
			}
		}
		minRight[i] = m
		for y := x; y != 0; y &= y - 1 {
			low := y & -y
			nxt[bits.TrailingZeros(uint(low))] = i
		}
	}
	var ans int64
	for i := 0; i < n; i++ {
		lo := left[i]
		if maxLeft[i] > lo {
			lo = maxLeft[i]
		}
		hi := right[i]
		if minRight[i] < hi {
			hi = minRight[i]
		}
		ans += int64(i-lo) * int64(hi-i)
	}
	return ans
}
