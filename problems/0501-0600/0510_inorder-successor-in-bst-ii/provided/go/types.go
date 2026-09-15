package main

type NodeWithNext struct {
	Val    int
	Left   *NodeWithNext
	Right  *NodeWithNext
	Next   *NodeWithNext
	Parent *NodeWithNext
}
