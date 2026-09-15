func totalStrength(strength []int) int {
	const MOD = 1000000007
	n := len(strength)

	// prev[i]: index of nearest strictly-smaller element to the left, else -1.
	prev := make([]int, n)
	stack := make([]int, 0, n)
	for i := 0; i < n; i++ {
		for len(stack) > 0 && strength[stack[len(stack)-1]] >= strength[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			prev[i] = stack[len(stack)-1]
		} else {
			prev[i] = -1
		}
		stack = append(stack, i)
	}

	// nxt[i]: index of nearest element <= strength[i] to the right, else n.
	nxt := make([]int, n)
	stack = stack[:0]
	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && strength[stack[len(stack)-1]] > strength[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			nxt[i] = stack[len(stack)-1]
		} else {
			nxt[i] = n
		}
		stack = append(stack, i)
	}

	// All prefix sums are kept reduced mod MOD; only residues are needed below.
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = (prefix[i] + int64(strength[i])) % MOD
	}

	// prePrefix[k] = sum of prefix[0..k-1]
	prePrefix := make([]int64, n+2)
	for i := 0; i <= n; i++ {
		prePrefix[i+1] = (prePrefix[i] + prefix[i]) % MOD
	}

	var answer int64 = 0
	for i := 0; i < n; i++ {
		left := int64(i - prev[i])
		right := int64(nxt[i] - i)
		sumLeft := (prePrefix[i+1] - prePrefix[prev[i]+1] + MOD) % MOD
		sumRight := (prePrefix[nxt[i]+1] - prePrefix[i+1] + MOD) % MOD
		// Python's % is always non-negative; normalize explicitly.
		term := ((left*sumRight-right*sumLeft)%MOD + MOD) % MOD
		contribution := int64(strength[i]) * term % MOD
		answer = (answer + contribution) % MOD
	}
	return int(answer)
}
