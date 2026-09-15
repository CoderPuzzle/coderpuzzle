import (
	"fmt"
	"sort"
)

type dupEntry struct {
	node      *TreeNode
	lastIndex int
	count     int
}

func findDuplicateSubtrees(root *TreeNode) []*TreeNode {
	info := make(map[string]*dupEntry) // serial -> first node, last index, count
	counter := 0

	var key func(node *TreeNode) string
	key = func(node *TreeNode) string {
		if node == nil {
			return "#"
		}
		index := counter
		counter++
		serial := fmt.Sprintf("%d,%s,%s", node.Val, key(node.Left), key(node.Right))
		if entry, ok := info[serial]; ok {
			entry.lastIndex = index
			entry.count++
		} else {
			info[serial] = &dupEntry{node: node, lastIndex: index, count: 1}
		}
		return serial
	}

	key(root)
	entries := make([]*dupEntry, 0, len(info))
	for _, entry := range info {
		entries = append(entries, entry)
	}
	sort.Slice(entries, func(i, j int) bool { return entries[i].lastIndex < entries[j].lastIndex })
	duplicates := make([]*TreeNode, 0)
	for _, entry := range entries {
		if entry.count >= 2 {
			duplicates = append(duplicates, entry.node)
		}
	}
	return duplicates
}
