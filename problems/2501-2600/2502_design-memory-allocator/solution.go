package main

// Flat cell array holding each unit's mID (0 = free). allocate
// linear-scans runs of free cells for the leftmost fit; freeMemory
// sweeps the same array once, zeroing every match.
type Allocator struct {
	units []int
}

func NewAllocatorTyped(n int) *Allocator {
	return &Allocator{units: make([]int, n)}
}

func (design *Allocator) allocate(size int, mID int) int {
	for i := 0; i < len(design.units); i++ {
		if design.units[i] != 0 {
			continue
		}
		j := i
		for j < len(design.units) && design.units[j] == 0 {
			j++
		}
		if j-i >= size {
			for k := i; k < i+size; k++ {
				design.units[k] = mID
			}
			return i
		}
		i = j
	}
	return -1
}

func (design *Allocator) freeMemory(mID int) int {
	freed := 0
	for k := range design.units {
		if design.units[k] == mID {
			design.units[k] = 0
			freed++
		}
	}
	return freed
}
