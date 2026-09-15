import (
	"strconv"
	"strings"
)

func palindromePath(n int, edges [][]int, s string, queries []string) []bool {
	// Adjacency as flat per-node slices: two passes over the edge list.
	adjacency := make([][]int, n)
	degree := make([]int, n)
	for _, edge := range edges {
		degree[edge[0]]++
		degree[edge[1]]++
	}
	for node := 0; node < n; node++ {
		adjacency[node] = make([]int, 0, degree[node])
	}
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], edge[1])
		adjacency[edge[1]] = append(adjacency[edge[1]], edge[0])
	}

	// One iterative depth-first search from node 0 fills every static
	// structure: depth, entry/exit stamps tin/tout over 2n tick positions,
	// and the Euler walk (node on entry and after every child) that the
	// sparse table compresses. The explicit stack keeps a 10^4-deep path
	// off the call stack.
	depth := make([]int, n)
	tin := make([]int, n)
	tout := make([]int, n)
	first := make([]int, n)
	walk := make([]int, 2*n-1)
	cursor := make([]int, n)
	seen := make([]bool, n)
	clock := 0
	walkLength := 0
	stack := make([]int, 0, n)
	seen[0] = true
	tin[0] = clock
	clock++
	first[0] = walkLength
	walk[walkLength] = 0
	walkLength++
	stack = append(stack, 0)
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		if cursor[node] < len(adjacency[node]) {
			child := adjacency[node][cursor[node]]
			cursor[node]++
			if !seen[child] {
				seen[child] = true
				depth[child] = depth[node] + 1
				tin[child] = clock
				clock++
				first[child] = walkLength
				walk[walkLength] = child
				walkLength++
				stack = append(stack, child)
			}
		} else {
			stack = stack[:len(stack)-1]
			tout[node] = clock
			clock++
			if len(stack) > 0 {
				walk[walkLength] = stack[len(stack)-1]
				walkLength++
			}
		}
	}

	// Only letter parities matter, so each node carries a 26-bit mask and
	// path masks combine by XOR. The path mask of u..v is
	// rootMask(u) ^ rootMask(v) ^ letter(lca): the common ancestors cancel
	// between the two root paths, so the LCA's letter returns. rootMask(x)
	// is the XOR of every delta whose node is an ancestor-or-equal of x; on
	// tick positions those are exactly the intervals [tin, tout] containing
	// tin[x], so flipping each delta at tin and tout + 2 makes rootMask(x)
	// a prefix XOR read at tin[x] + 1 — non-ancestor subtrees contribute
	// both flips and cancel. A Fenwick tree over the 2n positions serves
	// reads/flips.
	size := 2 * n
	letters := []byte(s)
	deltaAt := make([]int, size+1)
	for node := 0; node < n; node++ {
		bit := 1 << (letters[node] - 'a')
		deltaAt[tin[node]+1] ^= bit
		closing := tout[node] + 2
		if closing <= size {
			deltaAt[closing] ^= bit
		}
	}
	tree := make([]int, size+1)
	prefix := make([]int, size+1)
	running := 0
	for position := 1; position <= size; position++ {
		running ^= deltaAt[position]
		prefix[position] = running
	}
	for position := 1; position <= size; position++ {
		low := position & -position
		tree[position] = prefix[position] ^ prefix[position-low]
	}

	// Sparse table over the Euler walk: packing (depth << 17) | node makes
	// a plain int64 minimum return the shallowest node of any walk range,
	// which is the LCA. depth and node stay under 2^17, but the packed key
	// passes 2^32, hence the 64-bit widening.
	levels := 1
	for (1 << levels) <= walkLength {
		levels++
	}
	table := make([][]int64, levels)
	table[0] = make([]int64, walkLength)
	for index := 0; index < walkLength; index++ {
		table[0][index] = int64(depth[walk[index]])<<17 | int64(walk[index])
	}
	for level := 1; level < levels; level++ {
		half := 1 << (level - 1)
		previous := table[level-1]
		length := walkLength - (1 << level) + 1
		current := make([]int64, length)
		for index := 0; index < length; index++ {
			if previous[index] <= previous[index+half] {
				current[index] = previous[index]
			} else {
				current[index] = previous[index+half]
			}
		}
		table[level] = current
	}
	log2 := make([]int, walkLength+1)
	for index := 2; index <= walkLength; index++ {
		log2[index] = log2[index>>1] + 1
	}

	answer := make([]bool, 0, len(queries))
	for _, query := range queries {
		space1 := strings.IndexByte(query, ' ')
		space2 := strings.IndexByte(query[space1+1:], ' ') + space1 + 1
		if query[0] == 'u' {
			node, _ := strconv.Atoi(query[space1+1 : space2])
			letter := query[space2+1]
			delta := (1 << (letters[node] - 'a')) ^ (1 << (letter - 'a'))
			if delta != 0 {
				letters[node] = letter
				for position := tin[node] + 1; position <= size; position += position & -position {
					tree[position] ^= delta
				}
				closing := tout[node] + 2
				if closing <= size {
					for position := closing; position <= size; position += position & -position {
						tree[position] ^= delta
					}
				}
			}
		} else {
			u, _ := strconv.Atoi(query[space1+1 : space2])
			v, _ := strconv.Atoi(query[space2+1:])
			left, right := first[u], first[v]
			if left > right {
				left, right = right, left
			}
			power := log2[right-left+1]
			row := table[power]
			best := row[left]
			if other := row[right-(1<<power)+1]; other < best {
				best = other
			}
			top := int(best & 131071)
			mask := 0
			for position := tin[u] + 1; position > 0; position -= position & -position {
				mask ^= tree[position]
			}
			for position := tin[v] + 1; position > 0; position -= position & -position {
				mask ^= tree[position]
			}
			mask ^= 1 << (letters[top] - 'a')
			// At most one set bit <=> the mask is 0 or a power of two.
			answer = append(answer, mask == 0 || mask&(mask-1) == 0)
		}
	}
	return answer
}
