package main

import "container/heap"

// One logged (price, timestamp) observation.
type priceEntry struct {
	price     int
	timestamp int
}

type minPriceHeap []priceEntry

func (h minPriceHeap) Len() int           { return len(h) }
func (h minPriceHeap) Less(i, j int) bool { return h[i].price < h[j].price }
func (h minPriceHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *minPriceHeap) Push(x any)        { *h = append(*h, x.(priceEntry)) }
func (h *minPriceHeap) Pop() any {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

type maxPriceHeap []priceEntry

func (h maxPriceHeap) Len() int           { return len(h) }
func (h maxPriceHeap) Less(i, j int) bool { return h[i].price > h[j].price }
func (h maxPriceHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *maxPriceHeap) Push(x any)        { *h = append(*h, x.(priceEntry)) }
func (h *maxPriceHeap) Pop() any {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

type StockPrice struct {
	// timestamp -> currently valid price; a correction is an overwrite.
	priceAt map[int]int
	// Twin lazy heaps: entries are pushed on record and never removed;
	// stale ones are discarded only at the top.
	maxHeap maxPriceHeap
	minHeap minPriceHeap
	// The greatest moment ever recorded.
	latestTimestamp int
}

func NewStockPriceTyped() *StockPrice {
	return &StockPrice{priceAt: make(map[int]int)}
}

func (design *StockPrice) update(timestamp int, price int) {
	design.priceAt[timestamp] = price
	if timestamp > design.latestTimestamp {
		design.latestTimestamp = timestamp
	}
	heap.Push(&design.maxHeap, priceEntry{price: price, timestamp: timestamp})
	heap.Push(&design.minHeap, priceEntry{price: price, timestamp: timestamp})
}

func (design *StockPrice) current() int {
	return design.priceAt[design.latestTimestamp]
}

func (design *StockPrice) maximum() int {
	// An entry is garbage exactly when its timestamp now maps to a
	// different price; pop those, then the top is the true highest.
	for {
		top := design.maxHeap[0]
		if design.priceAt[top.timestamp] == top.price {
			return top.price
		}
		heap.Pop(&design.maxHeap)
	}
}

func (design *StockPrice) minimum() int {
	// Same lazy cleanup on the min side.
	for {
		top := design.minHeap[0]
		if design.priceAt[top.timestamp] == top.price {
			return top.price
		}
		heap.Pop(&design.minHeap)
	}
}
