// Problem-provided list node with a random pointer (LC 138 contract).
// The judge's decoder chains Next and then sets Random by row index.
package main

type RandomListNode struct {
	Val    int
	Next   *RandomListNode
	Random *RandomListNode
}
