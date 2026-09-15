// Problem-provided doubly linked node (LC 3294 contract). Compiled as
// one package with the submission; the judge's decoder builds nodes
// with &DoublyListNode{Val: value} and wires Prev/Next itself.
package main

type DoublyListNode struct {
	Val  int
	Prev *DoublyListNode
	Next *DoublyListNode
}
