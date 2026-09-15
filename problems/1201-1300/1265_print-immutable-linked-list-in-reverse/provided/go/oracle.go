package main

import "fmt"

// Problem-provided oracle (ImmutableListNode), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the serialized linked list as a
// generic value, then the query budget. The chain is wired at
// construction and the returned object IS the head handed to the
// solution.
type ImmutableListNode struct {
	value      int64
	next       *ImmutableListNode
	transcript *[]int64
	budget     int64
}

// NewImmutableListNode builds the oracle from the case's construction
// value (the comma-separated node values) and the query budget.
func NewImmutableListNode(construction []any, budget int64) *ImmutableListNode {
	raw, ok := construction[0].(string)
	if !ok {
		panic("ImmutableListNode head must be a string")
	}
	values := make([]int64, 0)
	for _, part := range splitCommas(raw) {
		v, err := strconvParseInt(part)
		if err != nil {
			panic("ImmutableListNode head must contain integers")
		}
		values = append(values, v)
	}
	printed := make([]int64, 0)
	head := &ImmutableListNode{transcript: &printed, budget: budget}
	// Wire the chain from the tail inward; head keeps zero value when the
	// list is empty and its next stays nil.
	tail := (*ImmutableListNode)(nil)
	for i := len(values) - 1; i >= 1; i-- {
		node := &ImmutableListNode{value: values[i], transcript: &printed,
			budget: int64(^uint64(0) >> 1)}
		node.next = tail
		tail = node
	}
	if len(values) > 0 {
		head.value = values[0]
		head.next = tail
	}
	return head
}

func splitCommas(s string) []string {
	parts := make([]string, 0)
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			parts = append(parts, s[start:i])
			start = i + 1
		}
	}
	if start < len(s) || len(parts) > 0 {
		parts = append(parts, s[start:])
	}
	return parts
}

func strconvParseInt(s string) (int64, error) {
	var v int64
	_, err := fmt.Sscanf(s, "%d", &v)
	return v, err
}

// PrintValue records the current node's value into the judged transcript.
func (node *ImmutableListNode) PrintValue() {
	if node.budget <= 0 {
		panic("ImmutableListNode query budget exhausted")
	}
	node.budget--
	*node.transcript = append(*node.transcript, node.value)
}

// GetNext returns the next node, or nil past the end of the list.
func (node *ImmutableListNode) GetNext() *ImmutableListNode {
	return node.next
}

// Verdict reports the observable effect: the exact sequence of printed
// values.
func (node *ImmutableListNode) Verdict() []any {
	out := make([]any, 0, len(*node.transcript))
	for _, v := range *node.transcript {
		out = append(out, v)
	}
	return out
}
