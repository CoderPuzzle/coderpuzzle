package main

type Allocator struct{}

func NewAllocatorTyped(n int) *Allocator {
	panic("TODO")
}

func (design *Allocator) allocate(size int, mID int) int {
	panic("TODO")
}

func (design *Allocator) freeMemory(mID int) int {
	panic("TODO")
}
