func minMaxSubarraySum(nums []int, k int) int64 {
	n := len(nums)
	K := int64(k - 1)

	// Number of (a, b) with 0<=a<=A, 0<=b<=B, a+b<=K.
	countPairs := func(A, B, K int64) int64 {
		if K < 0 || A < 0 || B < 0 {
			return 0
		}
		if A > K {
			A = K
		}
		if B > K {
			B = K
		}
		if A+B <= K {
			return (A + 1) * (B + 1)
		}
		t := K - B
		var total int64
		if t >= 0 {
			m := A
			if t < m {
				m = t
			}
			total += (m + 1) * (B + 1)
		}
		lo := t + 1
		if lo < 0 {
			lo = 0
		}
		if lo <= A {
			m := A - lo + 1
			total += m*(K+1) - (lo+A)*m/2
		}
		return total
	}

	Lmax := make([]int64, n)
	Rmax := make([]int64, n)
	stack := make([]int, n)
	sp := 0
	for i := 0; i < n; i++ {
		for sp > 0 && nums[stack[sp-1]] <= nums[i] {
			sp--
		}
		if sp > 0 {
			Lmax[i] = int64(i - stack[sp-1] - 1)
		} else {
			Lmax[i] = int64(i)
		}
		stack[sp] = i
		sp++
	}
	sp = 0
	for i := n - 1; i >= 0; i-- {
		for sp > 0 && nums[stack[sp-1]] < nums[i] {
			sp--
		}
		if sp > 0 {
			Rmax[i] = int64(stack[sp-1] - i - 1)
		} else {
			Rmax[i] = int64(n - 1 - i)
		}
		stack[sp] = i
		sp++
	}

	Lmin := make([]int64, n)
	Rmin := make([]int64, n)
	sp = 0
	for i := 0; i < n; i++ {
		for sp > 0 && nums[stack[sp-1]] >= nums[i] {
			sp--
		}
		if sp > 0 {
			Lmin[i] = int64(i - stack[sp-1] - 1)
		} else {
			Lmin[i] = int64(i)
		}
		stack[sp] = i
		sp++
	}
	sp = 0
	for i := n - 1; i >= 0; i-- {
		for sp > 0 && nums[stack[sp-1]] > nums[i] {
			sp--
		}
		if sp > 0 {
			Rmin[i] = int64(stack[sp-1] - i - 1)
		} else {
			Rmin[i] = int64(n - 1 - i)
		}
		stack[sp] = i
		sp++
	}

	var answer int64
	for i := 0; i < n; i++ {
		cnt := countPairs(Lmax[i], Rmax[i], K) + countPairs(Lmin[i], Rmin[i], K)
		answer += int64(nums[i]) * cnt
	}
	return answer
}
