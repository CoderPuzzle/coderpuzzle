import "sort"

func gcdSort(nums []int) bool {
	const MX = 100001
	// Smallest-prime-factor sieve: spf[v] lets each value be split into
	// its distinct primes by repeated division.
	spf := make([]int, MX)
	for i := 0; i < MX; i++ {
		spf[i] = i
	}
	for i := 2; i*i < MX; i++ {
		if spf[i] == i {
			for j := i * i; j < MX; j += i {
				if spf[j] == j {
					spf[j] = i
				}
			}
		}
	}

	// Union-find over values and primes: a swap is legal when the two
	// values share a prime, and chains of swaps make any two values in
	// one component mutually reachable.
	parent := make([]int, MX)
	for i := 0; i < MX; i++ {
		parent[i] = i
	}

	var find func(a int) int
	find = func(a int) int {
		// Path halving keeps the forest shallow.
		for parent[a] != a {
			parent[a] = parent[parent[a]]
			a = parent[a]
		}
		return a
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[ra] = rb
		}
	}

	// Link each value to each of its distinct primes. Indexing by value
	// (not position) automatically merges equal values across positions.
	for _, x := range nums {
		v := x
		for v > 1 {
			p := spf[v]
			union(x, p)
			for v%p == 0 {
				v /= p
			}
		}
	}

	target := make([]int, len(nums))
	copy(target, nums)
	sort.Ints(target)
	// Sortable iff every element shares a component with its sorted
	// target; a position spanning two components is immovable.
	for i := range nums {
		if find(nums[i]) != find(target[i]) {
			return false
		}
	}
	return true
}
