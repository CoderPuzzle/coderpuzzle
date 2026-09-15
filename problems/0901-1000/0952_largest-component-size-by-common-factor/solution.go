// Two values land in one component exactly when a chain of shared prime
// factors links them: sharing a factor greater than 1 means sharing a
// prime, and every path in the graph alternates values with the primes
// they share. A smallest-prime-factor sieve up to the largest value
// factorizes each number in a handful of divisions, a union-find keyed by
// factor unions every value with each of its primes, and the largest class
// counted over the values is the answer — the value 1, having no prime
// factor, stays a singleton.
func largestComponentSize(nums []int) int {
	m := 0
	for _, v := range nums {
		if v > m {
			m = v
		}
	}

	spf := make([]int, m+1)
	for i := range spf {
		spf[i] = i
	}
	for i := 2; i*i <= m; i++ {
		if spf[i] == i {
			for j := i * i; j <= m; j += i {
				if spf[j] == j {
					spf[j] = i
				}
			}
		}
	}

	parent := make([]int, m+1)
	for i := range parent {
		parent[i] = i
	}
	size := make([]int, m+1)
	for i := range size {
		size[i] = 1
	}

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		if size[ra] < size[rb] {
			ra, rb = rb, ra
		}
		parent[rb] = ra
		size[ra] += size[rb]
	}

	for _, v := range nums {
		x := v
		for x > 1 {
			p := spf[x]
			union(v, p)
			for x%p == 0 {
				x /= p
			}
		}
	}

	counts := make(map[int]int)
	best := 0
	for _, v := range nums {
		r := find(v)
		counts[r]++
		if counts[r] > best {
			best = counts[r]
		}
	}
	return best
}
