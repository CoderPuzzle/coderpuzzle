package main

type NodeWithNext struct {
	Val    int
	Left   *NodeWithNext
	Right  *NodeWithNext
	Next   *NodeWithNext
	Parent *NodeWithNext
}
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}
