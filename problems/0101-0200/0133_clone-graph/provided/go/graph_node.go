// Problem-provided graph node (LC 133 contract). Compiled as one
// package with the submission; the judge's decoder builds nodes with
// &GraphNode{Val: value} and wires adjacency through Neighbors.
package main

type GraphNode struct {
	Val       int
	Neighbors []*GraphNode
}
