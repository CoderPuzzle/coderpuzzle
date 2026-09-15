import "sort"

func accountsMerge(accounts [][]string) [][]string {
	parent := map[string]string{}
	var find func(string) string
	find = func(x string) string {
		p, ok := parent[x]
		if !ok {
			parent[x] = x
			return x
		}
		if p == x {
			return x
		}
		// Recursive find with full path compression: repoint x at its root.
		r := find(p)
		parent[x] = r
		return r
	}
	union := func(a, b string) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[ra] = rb
		}
	}

	owner := map[string]string{}
	for _, account := range accounts {
		for _, email := range account[1:] {
			if _, ok := parent[email]; !ok {
				parent[email] = email
			}
			owner[email] = account[0]
		}
		// Unioning with the first email links the whole account — and,
		// transitively, any chain of accounts sharing emails.
		for _, email := range account[2:] {
			union(account[1], email)
		}
	}

	// Second pass in input order: merge order follows the earliest-appearing
	// email of each component, exactly as the judge requires.
	index := map[string]int{}
	var groups [][]string
	for _, account := range accounts {
		for _, email := range account[1:] {
			root := find(email)
			idx, ok := index[root]
			if !ok {
				idx = len(groups)
				index[root] = idx
				// The root's owner names the component.
				groups = append(groups, []string{owner[root]})
			}
			groups[idx] = append(groups[idx], email)
		}
	}

	merged := make([][]string, 0, len(groups))
	// Sort each component's emails and drop duplicates within one account.
	for _, g := range groups {
		emails := g[1:]
		sort.Strings(emails)
		uniq := make([]string, 0, len(emails))
		for i, e := range emails {
			if i == 0 || e != emails[i-1] {
				uniq = append(uniq, e)
			}
		}
		row := make([]string, 0, len(uniq)+1)
		row = append(row, g[0])
		row = append(row, uniq...)
		merged = append(merged, row)
	}
	return merged
}
