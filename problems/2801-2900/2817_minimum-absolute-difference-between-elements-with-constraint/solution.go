import "sort"

func minAbsoluteDifference(nums []int, x int) int {
	// A pair consists of two distinct indices, so x == 0 still demands a
	// separation of at least one index step.
	separation := x
	if separation < 1 {
		separation = 1
	}
	vals := append([]int(nil), nums...)
	sort.Ints(vals)
	compacted := vals[:0]
	for _, v := range vals {
		if len(compacted) == 0 || compacted[len(compacted)-1] != v {
			compacted = append(compacted, v)
		}
	}
	vals = compacted
	m := len(vals)
	rank := make(map[int]int, m)
	for i, v := range vals {
		rank[v] = i + 1
	}
	tree := make([]int, m+1)
	top := 1
	for top*2 <= m {
		top *= 2
	}
	answer := -1
	for j := range nums {
		if j >= separation {
			// Partner nums[j - separation] enters the eligible prefix
			// before nums[j] queries it.
			for i := rank[nums[j-separation]]; i <= m; i += i & (-i) {
				tree[i] += 1
			}
			value := nums[j]
			count := 0
			for i := rank[value]; i > 0; i -= i & (-i) {
				count += tree[i]
			}
			have := j - separation + 1
			if count > 0 {
				pos := 0
				rem := count
				for step := top; step > 0; step >>= 1 {
					nxt := pos + step
					if nxt <= m && tree[nxt] < rem {
						pos = nxt
						rem -= tree[nxt]
					}
				}
				difference := value - vals[pos]
				if answer < 0 || difference < answer {
					answer = difference
				}
			}
			if have > count {
				pos := 0
				rem := count + 1
				for step := top; step > 0; step >>= 1 {
					nxt := pos + step
					if nxt <= m && tree[nxt] < rem {
						pos = nxt
						rem -= tree[nxt]
					}
				}
				difference := vals[pos] - value
				if answer < 0 || difference < answer {
					answer = difference
				}
			}
		}
	}
	return answer
}
