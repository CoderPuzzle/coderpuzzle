package main

// Hash map from value -> sorted list of indices, plus a values array.
// Deterministic variant: remove deletes the leftmost occurrence and moves
// the last element into the vacated slot; draw returns values[0].
type RandomizedCollection struct {
	values  []int
	indices map[int][]int
}

func NewRandomizedCollectionTyped() *RandomizedCollection {
	return &RandomizedCollection{indices: make(map[int][]int)}
}

// bisect returns the leftmost insertion point for target in a sorted list.
func (design *RandomizedCollection) bisect(list []int, target int) int {
	low, high := 0, len(list)
	for low < high {
		mid := int(uint(low+high) >> 1)
		if list[mid] < target {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

func (design *RandomizedCollection) insertSorted(list []int, value int) []int {
	at := design.bisect(list, value)
	list = append(list, 0)
	copy(list[at+1:], list[at:])
	list[at] = value
	return list
}

func (design *RandomizedCollection) removeSorted(list []int, value int) []int {
	at := design.bisect(list, value)
	return append(list[:at], list[at+1:]...)
}

func (design *RandomizedCollection) insert(val int) bool {
	positions, present := design.indices[val]
	design.values = append(design.values, val)
	index := len(design.values) - 1 // new index is always the maximum
	design.indices[val] = design.insertSorted(positions, index)
	return !present
}

func (design *RandomizedCollection) remove(val int) bool {
	positions := design.indices[val]
	if len(positions) == 0 {
		return false
	}
	index := positions[0] // leftmost occurrence
	last := len(design.values) - 1
	if design.values[last] == val {
		// The moved element equals the removed one: a copy stays at
		// `index`, so only the last index leaves the set.
		design.indices[val] = design.removeSorted(positions, last)
	} else {
		moved := design.values[last]
		design.values[index] = moved
		design.indices[moved] = design.removeSorted(design.indices[moved], last)
		design.indices[moved] = design.insertSorted(design.indices[moved], index)
		design.indices[val] = design.removeSorted(positions, index)
	}
	design.values = design.values[:last]
	if len(design.indices[val]) == 0 {
		delete(design.indices, val)
	}
	return true
}

func (design *RandomizedCollection) getRandom() int {
	return design.values[0]
}
