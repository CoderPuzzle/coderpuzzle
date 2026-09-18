package main

import "container/heap"

// copyKey names one physical copy: the movie at a shop.
type copyKey struct {
	shop  int
	movie int
}

// One unrented copy on a movie's shelf.
type shelfEntry struct {
	price int
	shop  int
	token int64
}

type shelfHeap []shelfEntry

func (h shelfHeap) Len() int { return len(h) }
func (h shelfHeap) Less(i, j int) bool {
	return h[i].price < h[j].price || (h[i].price == h[j].price && h[i].shop < h[j].shop)
}
func (h shelfHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *shelfHeap) Push(x any)   { *h = append(*h, x.(shelfEntry)) }
func (h *shelfHeap) Pop() any {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

// One rented copy, competing globally by price then shop then movie.
type rentedEntry struct {
	price int
	shop  int
	movie int
	token int64
}

type rentedHeap []rentedEntry

func (h rentedHeap) Len() int { return len(h) }
func (h rentedHeap) Less(i, j int) bool {
	if h[i].price != h[j].price {
		return h[i].price < h[j].price
	}
	if h[i].shop != h[j].shop {
		return h[i].shop < h[j].shop
	}
	return h[i].movie < h[j].movie
}
func (h rentedHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *rentedHeap) Push(x any)   { *h = append(*h, x.(rentedEntry)) }
func (h *rentedHeap) Pop() any {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

type MovieRentingSystem struct {
	price         map[copyKey]int
	unrented      map[int]*shelfHeap // movie -> (price, shop, token)
	unrentedToken map[copyKey]int64  // copy -> live shelf token
	rented        rentedHeap         // (price, shop, movie, token)
	rentedToken   map[copyKey]int64  // copy -> live rented token
	serial        int64
}

func NewMovieRentingSystemTyped(n int, entries [][]int) *MovieRentingSystem {
	desk := &MovieRentingSystem{
		price:         make(map[copyKey]int),
		unrented:      make(map[int]*shelfHeap),
		unrentedToken: make(map[copyKey]int64),
		rentedToken:   make(map[copyKey]int64),
	}
	for _, entry := range entries {
		shop, movie, price := entry[0], entry[1], entry[2]
		desk.price[copyKey{shop, movie}] = price
		desk.serial++
		desk.unrentedToken[copyKey{shop, movie}] = desk.serial
		shelf := desk.unrented[movie]
		if shelf == nil {
			shelf = &shelfHeap{}
			desk.unrented[movie] = shelf
		}
		*shelf = append(*shelf, shelfEntry{price: price, shop: shop, token: desk.serial})
	}
	for _, shelf := range desk.unrented {
		heap.Init(shelf)
	}
	return desk
}

func (design *MovieRentingSystem) search(movie int) []int {
	result := []int{}
	kept := []shelfEntry{}
	shelf := design.unrented[movie]
	if shelf != nil {
		for shelf.Len() > 0 && len(result) < 5 {
			entry := heap.Pop(shelf).(shelfEntry)
			if design.unrentedToken[copyKey{entry.shop, movie}] != entry.token {
				continue // stale entry from a rent/handBack cycle
			}
			result = append(result, entry.shop)
			kept = append(kept, entry)
		}
		for _, entry := range kept {
			heap.Push(shelf, entry)
		}
	}
	return result
}

func (design *MovieRentingSystem) rent(shop int, movie int) {
	delete(design.unrentedToken, copyKey{shop, movie})
	design.serial++
	design.rentedToken[copyKey{shop, movie}] = design.serial
	heap.Push(&design.rented, rentedEntry{price: design.price[copyKey{shop, movie}], shop: shop, movie: movie, token: design.serial})
}

func (design *MovieRentingSystem) drop(shop int, movie int) {
	delete(design.rentedToken, copyKey{shop, movie})
	design.serial++
	design.unrentedToken[copyKey{shop, movie}] = design.serial
	shelf := design.unrented[movie]
	if shelf == nil {
		shelf = &shelfHeap{}
		design.unrented[movie] = shelf
	}
	heap.Push(shelf, shelfEntry{price: design.price[copyKey{shop, movie}], shop: shop, token: design.serial})
}

func (design *MovieRentingSystem) report() [][]int {
	result := [][]int{}
	kept := []rentedEntry{}
	for design.rented.Len() > 0 && len(result) < 5 {
		entry := heap.Pop(&design.rented).(rentedEntry)
		if design.rentedToken[copyKey{entry.shop, entry.movie}] != entry.token {
			continue
		}
		result = append(result, []int{entry.shop, entry.movie})
		kept = append(kept, entry)
	}
	for _, entry := range kept {
		heap.Push(&design.rented, entry)
	}
	return result
}
