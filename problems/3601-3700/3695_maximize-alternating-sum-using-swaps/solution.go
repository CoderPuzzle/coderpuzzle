import "sort"

func maxAlternatingSum(nums []int, swaps [][]int) int64 {
	// A pair lets its two indices trade values any number of times, so
	// each connected component of the swap graph rearranges freely:
	// merge the pair's endpoints with a union-find.
	n := len(nums)
	parent := make([]int, n)
	sz := make([]int, n)
	for i := range parent {
		parent[i] = i
		sz[i] = 1
	}
	// Two-pass path compression keeps every later find near O(1).
	var find func(int) int
	find = func(x int) int {
		root := x
		for parent[root] != root {
			root = parent[root]
		}
		for parent[x] != root {
			parent[x], x = root, parent[x]
		}
		return root
	}
	for _, pair := range swaps {
		rp, rq := find(pair[0]), find(pair[1])
		if rp == rq {
			continue
		}
		if sz[rp] < sz[rq] {
			rp, rq = rq, rp
		}
		parent[rq] = rp
		sz[rp] += sz[rq]
	}

	type comp struct {
		vals  []int64
		evens int
	}

	// Collect each component's values and count its even-index slots.
	groups := make(map[int]*comp)
	for i, v := range nums {
		r := find(i)
		c := groups[r]
		if c == nil {
			c = &comp{}
			groups[r] = c
		}
		c.vals = append(c.vals, int64(v))
		if i%2 == 0 {
			c.evens++
		}
	}

	// With E even slots in a component, placing its E largest values on
	// them contributes 2*sumTopE - sumAll; totals reach ~1e14, hence int64.
	var ans int64
	for _, c := range groups {
		sort.Slice(c.vals, func(a, b int) bool { return c.vals[a] > c.vals[b] })
		var topE, all int64
		for j, v := range c.vals {
			all += v
			if j < c.evens {
				topE += v
			}
		}
		ans += 2*topE - all
	}
	return ans
}
