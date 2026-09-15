import (
	"strconv"
	"strings"
)

func serialize(root *Node) string {
	if root == nil {
		return "[]"
	}
	tokens := []string{strconv.Itoa(root.Val), "null"}
	queue := []*Node{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		for _, child := range node.Children {
			tokens = append(tokens, strconv.Itoa(child.Val))
			queue = append(queue, child)
		}
		tokens = append(tokens, "null")
	}
	for len(tokens) > 0 && tokens[len(tokens)-1] == "null" {
		tokens = tokens[:len(tokens)-1]
	}
	return "[" + strings.Join(tokens, ",") + "]"
}
