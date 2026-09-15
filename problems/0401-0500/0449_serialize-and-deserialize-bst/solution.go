package main

import (
	"strconv"
	"strings"
)

// Preorder with null markers: the root's value, then its left subtree, then
// its right, `x` for every absent child, joined by commas.
type Codec struct{}

func NewCodecTyped() *Codec {
	return &Codec{}
}

func (design *Codec) serialize(root *TreeNode) string {
	var out strings.Builder
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if out.Len() > 0 {
			out.WriteByte(',')
		}
		if node == nil {
			out.WriteString("x")
			continue
		}
		out.WriteString(strconv.Itoa(node.Val))
		stack = append(stack, node.Right, node.Left)
	}
	return out.String()
}

// The mirror build: each stack entry is a node with one open child slot
// (left before right); a value fills the slot and opens two more, an `x`
// just closes it.
func (design *Codec) deserialize(data string) *TreeNode {
	type open struct {
		node      *TreeNode
		wantsLeft bool
	}
	tokens := strings.Split(data, ",")
	if tokens[0] == "x" {
		return nil
	}
	value, _ := strconv.Atoi(tokens[0])
	root := &TreeNode{Val: value}
	stack := []open{{root, true}}
	for _, token := range tokens[1:] {
		slot := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		var child *TreeNode
		if token != "x" {
			value, _ := strconv.Atoi(token)
			child = &TreeNode{Val: value}
		}
		if slot.wantsLeft {
			slot.node.Left = child
			stack = append(stack, open{slot.node, false})
		} else {
			slot.node.Right = child
		}
		if child != nil {
			stack = append(stack, open{child, true})
		}
	}
	return root
}
