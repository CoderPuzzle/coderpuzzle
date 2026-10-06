/*
 * This is the interface that allows for creating nested lists.
 * NestedInteger holds an integer or a list of NestedInteger (never both);
 * the API mirrors LeetCode's Go template.
 * type NestedInteger struct { ... }
 * func (n NestedInteger) IsInteger() bool
 * func (n NestedInteger) GetInteger() int
 * func (n NestedInteger) GetList() []*NestedInteger
 * func (n *NestedInteger) SetInteger(value int)
 * func (n *NestedInteger) Add(elem NestedInteger)
 */
package main

type NestedSequenceIterator struct{}

func NewNestedSequenceIteratorTyped(nestedList NestedInteger) *NestedSequenceIterator {
	panic("TODO")
}

func (design *NestedSequenceIterator) nextValue() int {
	panic("TODO")
}

func (design *NestedSequenceIterator) hasMore() bool {
	panic("TODO")
}
