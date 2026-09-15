func waysToBuildRooms(prevRoom []int) int {
	const MOD = 1000000007
	n := len(prevRoom)
	children := make([][]int, n)
	for i := 1; i < n; i++ {
		children[prevRoom[i]] = append(children[prevRoom[i]], i)
	}

	fact := make([]int64, n+1)
	invfact := make([]int64, n+1)
	fact[0] = 1
	for i := 1; i <= n; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}
	// Division becomes multiplication: one Fermat exponentiation inverts
	// fact[n], then invfact[i-1] = invfact[i]*i fills the table backwards —
	// avoiding one modpow per node.
	invfact[n] = modpow(fact[n], MOD-2, MOD)
	for i := n; i >= 1; i-- {
		invfact[i-1] = invfact[i] * int64(i) % MOD
	}

	// Recursion is off the table (n up to 1e5): stack-driven preorder puts
	// parents before descendants, so the reverse walk is a post-order.
	order := make([]int, 0, n)
	stack := make([]int, 0, n)
	stack = append(stack, 0)
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		stack = append(stack, children[u]...)
	}

	size := make([]int, n)
	ways := make([]int64, n)
	for i := range size {
		size[i] = 1
		ways[i] = 1
	}
	// Bottom-up: ways[u] = (size(u)-1)! * prod(ways[v] / size[v]!) — build u
	// first, then multinomial-interleave the children's already-valid orders.
	for oi := len(order) - 1; oi >= 0; oi-- {
		u := order[oi]
		total := 0
		var w int64 = 1
		for _, v := range children[u] {
			total += size[v]
			w = w * invfact[size[v]] % MOD
			w = w * ways[v] % MOD
		}
		size[u] = total + 1
		ways[u] = fact[total] * w % MOD
	}
	return int(ways[0])
}

func modpow(base, exp, mod int64) int64 {
	result := int64(1)
	base %= mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}
