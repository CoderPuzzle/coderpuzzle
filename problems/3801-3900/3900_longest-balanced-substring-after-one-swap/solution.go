func longestWithDelta(s string, target int, cap int) int {
	prefix := make([]int, len(s)+1)
	positions := map[int][]int{0: {0}}
	heads := make(map[int]int)
	best := 0
	for right := 1; right <= len(s); right++ {
		prefix[right] = prefix[right-1] - 1
		if s[right-1] == '1' {
			prefix[right] += 2
		}
		expired := right - cap - 1
		if expired >= 0 {
			balance := prefix[expired]
			queue := positions[balance]
			if heads[balance] < len(queue) && queue[heads[balance]] == expired {
				heads[balance]++
			}
		}
		balance := prefix[right] - target
		queue := positions[balance]
		if heads[balance] < len(queue) && right-queue[heads[balance]] > best {
			best = right - queue[heads[balance]]
		}
		positions[prefix[right]] = append(positions[prefix[right]], right)
	}
	return best
}

func longestBalanced(s string) int {
	zeros := 0
	for i := 0; i < len(s); i++ {
		if s[i] == '0' {
			zeros++
		}
	}
	ones := len(s) - zeros
	best := longestWithDelta(s, 0, len(s))
	if candidate := longestWithDelta(s, 2, 2*zeros); candidate > best {
		best = candidate
	}
	if candidate := longestWithDelta(s, -2, 2*ones); candidate > best {
		best = candidate
	}
	return best
}
