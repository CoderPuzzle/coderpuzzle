// Problem-provided tree node with a random pointer (LC 1485 contract).
// The judge's decoder wires left/right in level order and then sets
// Random by present-node index.
package main

type RandomTreeNode struct {
	Val    int
	Left   *RandomTreeNode
	Right  *RandomTreeNode
	Random *RandomTreeNode
}
