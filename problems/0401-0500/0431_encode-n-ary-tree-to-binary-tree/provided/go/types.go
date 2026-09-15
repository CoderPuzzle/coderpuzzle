package main

type Node struct {
	Val      int
	Children []*Node
}
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}
