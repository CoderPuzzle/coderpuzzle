// Problem-provided doubly linked node (LC 3263 contract).
// The judge's decoder chains Next and then wires Prev backwards.
package main

type DoublyListNode struct {
	Val  int
	Next *DoublyListNode
	Prev *DoublyListNode
}
