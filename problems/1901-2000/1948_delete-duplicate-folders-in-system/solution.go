import (
	"sort"
	"strconv"
	"strings"
)

func deleteDuplicateFolder(paths [][]string) [][]string {
	// trie nodes: children maps name -> node id; node 0 is the root
	children := []map[string]int{{}}
	nextId := 1
	for _, path := range paths {
		node := 0
		for _, name := range path {
			next, ok := children[node][name]
			if !ok {
				children = append(children, map[string]int{})
				next = nextId
				children[node][name] = next
				nextId++
			}
			node = next
		}
	}
	total := nextId

	// collect all nodes (parents always appear before their children)
	nodes := make([]int, 0, total)
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		nodes = append(nodes, u)
		for _, child := range children[u] {
			stack = append(stack, child)
		}
	}

	// assign subtree signature ids in post-order (children before parents)
	sigToId := make(map[string]int)
	sigCounts := make(map[int]int)
	nodeSig := make([]int, total)
	for ni := len(nodes) - 1; ni >= 0; ni-- {
		node := nodes[ni]
		type pairT struct {
			name string
			sid  int
		}
		entries := make([]pairT, 0, len(children[node]))
		for name, child := range children[node] {
			entries = append(entries, pairT{name, nodeSig[child]})
		}
		sort.Slice(entries, func(a, b int) bool { return entries[a].name < entries[b].name })
		var key strings.Builder
		for _, e := range entries {
			key.WriteString(e.name)
			key.WriteByte(1)
			key.WriteString(strconv.Itoa(e.sid))
			key.WriteByte(2)
		}
		keyStr := key.String()
		sid, ok := sigToId[keyStr]
		if !ok {
			sid = len(sigToId)
			sigToId[keyStr] = sid
		}
		nodeSig[node] = sid
		sigCounts[sid]++
	}

	marked := make([]bool, total)
	for _, node := range nodes {
		if len(children[node]) > 0 && sigCounts[nodeSig[node]] >= 2 {
			markStack := []int{node}
			for len(markStack) > 0 {
				cur := markStack[len(markStack)-1]
				markStack = markStack[:len(markStack)-1]
				marked[cur] = true
				for _, child := range children[cur] {
					markStack = append(markStack, child)
				}
			}
		}
	}

	result := make([][]string, 0)
	type frameT struct {
		node   int
		prefix []string
	}
	collectStack := []frameT{{node: 0}}
	for len(collectStack) > 0 {
		top := collectStack[len(collectStack)-1]
		collectStack = collectStack[:len(collectStack)-1]
		for name, child := range children[top.node] {
			if marked[child] {
				continue
			}
			newPath := make([]string, 0, len(top.prefix)+1)
			newPath = append(newPath, top.prefix...)
			newPath = append(newPath, name)
			result = append(result, newPath)
			collectStack = append(collectStack, frameT{node: child, prefix: newPath})
		}
	}
	sort.Slice(result, func(a, b int) bool {
		na, nb := result[a], result[b]
		minLen := len(na)
		if len(nb) < minLen {
			minLen = len(nb)
		}
		for i := 0; i < minLen; i++ {
			if na[i] != nb[i] {
				return na[i] < nb[i]
			}
		}
		return len(na) < len(nb)
	})
	return result
}
