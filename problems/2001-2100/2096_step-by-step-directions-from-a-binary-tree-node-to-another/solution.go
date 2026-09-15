import "strings"

func getDirections(root *TreeNode, startValue int, destValue int) string {
	parent := map[int]int{root.Val: 0}
	incoming := make(map[int]byte)
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node.Left != nil {
			parent[node.Left.Val] = node.Val
			incoming[node.Left.Val] = 'L'
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			parent[node.Right.Val] = node.Val
			incoming[node.Right.Val] = 'R'
			stack = append(stack, node.Right)
		}
	}

	distance := make(map[int]int)
	node := startValue
	steps := 0
	for node != 0 {
		distance[node] = steps
		steps++
		node = parent[node]
	}

	downward := []byte{}
	node = destValue
	for {
		upward, found := distance[node]
		if found {
			for left, right := 0, len(downward)-1; left < right; left, right = left+1, right-1 {
				downward[left], downward[right] = downward[right], downward[left]
			}
			return strings.Repeat("U", upward) + string(downward)
		}
		downward = append(downward, incoming[node])
		node = parent[node]
	}
}
