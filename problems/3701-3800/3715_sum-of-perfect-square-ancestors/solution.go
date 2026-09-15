func sumOfAncestors(parent []int, nums []int) int64 {
	n := len(parent)
	maxValue := 0
	for _, v := range nums {
		if v > maxValue {
			maxValue = v
		}
	}

	// Smallest-prime-factor sieve up to the largest value present.
	spf := make([]int, maxValue+1)
	for i := 2; i <= maxValue; i++ {
		if spf[i] == 0 {
			for j := i; j <= maxValue; j += i {
				if spf[j] == 0 {
					spf[j] = i
				}
			}
		}
	}

	// Square-free kernel: the product of primes dividing the value an
	// odd number of times. Two positive integers multiply to a perfect
	// square exactly when their kernels are equal.
	kernel := make([]int, n)
	for i := 0; i < n; i++ {
		kernel[i] = 1
		v := nums[i]
		for v > 1 {
			p := spf[v]
			odd := false
			for v%p == 0 {
				v /= p
				odd = !odd
			}
			if odd {
				kernel[i] *= p
			}
		}
	}

	children := make([][]int, n)
	for i := 1; i < n; i++ {
		children[parent[i]] = append(children[parent[i]], i)
	}

	// Iterative depth-first walk; freq[k] counts ancestors on the current
	// root path whose kernel is k. Entering a node first adds its matches,
	// then records its own kernel; the node + n marker undoes the record
	// once the whole subtree is done.
	freq := make([]int64, maxValue+1)
	var total int64
	stack := make([]int, 0, 2*n+1)
	stack = append(stack, 0)
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node < n {
			total += freq[kernel[node]]
			freq[kernel[node]]++
			stack = append(stack, node+n)
			stack = append(stack, children[node]...)
		} else {
			freq[kernel[node-n]]--
		}
	}
	return total
}
