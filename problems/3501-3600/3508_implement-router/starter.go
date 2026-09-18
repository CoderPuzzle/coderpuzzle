package main

type Router struct{}

func NewRouterTyped(memoryLimit int) *Router {
	panic("TODO")
}

func (design *Router) addPacket(source int, destination int, timestamp int) bool {
	panic("TODO")
}

func (design *Router) forwardPacket() []int {
	panic("TODO")
}

func (design *Router) getCount(destination int, startTime int, endTime int) int {
	panic("TODO")
}
