import "sort"

func maximumScore(nums []int, k int) int {
	const MOD = 1000000007
	n := len(nums)
	maxv := 0
	for _, x := range nums {
		if x > maxv {
			maxv = x
		}
	}

	// Smallest-prime-factor sieve: lets each value's distinct prime
	// count be read off by repeated division, no trial division.
	spf := make([]int, maxv+1)
	for i := range spf {
		spf[i] = i
	}
	for i := 2; i*i <= maxv; i++ {
		if spf[i] == i {
			for j := i * i; j <= maxv; j += i {
				if spf[j] == j {
					spf[j] = i
				}
			}
		}
	}

	// Prime score = number of distinct prime factors; dividing out
	// each prime fully counts it exactly once.
	scores := make([]int, n)
	for i, x := range nums {
		v := x
		cnt := 0
		lastp := -1
		for v > 1 {
			p := spf[v]
			if p != lastp {
				cnt++
				lastp = p
			}
			for v%p == 0 {
				v /= p
			}
		}
		scores[i] = cnt
	}

	// left[i]: nearest index left of i with prime score >= score[i];
	// right[i]: nearest index right of i with score strictly greater.
	// The >= / > asymmetry gives tied subarrays to the smallest index,
	// so every subarray is attributed to exactly one element.
	left := make([]int, n)
	right := make([]int, n)
	stack := make([]int, 0, n)
	for i := 0; i < n; i++ {
		for len(stack) > 0 && scores[stack[len(stack)-1]] < scores[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			left[i] = stack[len(stack)-1]
		} else {
			left[i] = -1
		}
		stack = append(stack, i)
	}
	stack = stack[:0]
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && scores[stack[len(stack)-1]] <= scores[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			right[i] = stack[len(stack)-1]
		} else {
			right[i] = n
		}
		stack = append(stack, i)
	}

	// Greedy: take the largest value first; element i wins exactly
	// (i-left[i]) * (right[i]-i) subarrays, bounding its picks.
	idx := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	sort.SliceStable(idx, func(a, b int) bool {
		return nums[idx[a]] > nums[idx[b]]
	})

	score := int64(1)
	rem := int64(k)
	for _, i := range idx {
		// Cap picks at the winning-subarray count and the remaining
		// budget; one fast exponentiation covers any multiplicity.
		cnt := int64(i-left[i]) * int64(right[i]-i)
		use := cnt
		if rem < use {
			use = rem
		}
		if use > 0 {
			score = score * modpow(int64(nums[i]), use, MOD) % MOD
			rem -= use
		}
		if rem == 0 {
			break
		}
	}
	return int(score)
}

func modpow(base, e, mod int64) int64 {
	r := int64(1 % mod)
	b := base % mod
	for e > 0 {
		if e&1 == 1 {
			r = r * b % mod
		}
		b = b * b % mod
		e >>= 1
	}
	return r
}
