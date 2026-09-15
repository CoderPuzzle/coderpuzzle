package main

type SmallestInfiniteSet struct {
	// Everything below nextNew has been popped at least once; a removed
	// value is present again exactly when it sits in this set. Values
	// >= nextNew have never been touched.
	nextNew   int
	addedBack map[int]bool
}

func NewSmallestInfiniteSetTyped() *SmallestInfiniteSet {
	return &SmallestInfiniteSet{nextNew: 1, addedBack: make(map[int]bool)}
}

func (design *SmallestInfiniteSet) popSmallest() int {
	if len(design.addedBack) > 0 {
		value := 1 << 30
		for candidate := range design.addedBack {
			if candidate < value {
				value = candidate
			}
		}
		delete(design.addedBack, value)
		return value
	}
	value := design.nextNew
	design.nextNew++
	return value
}

func (design *SmallestInfiniteSet) addBack(num int) {
	// Only values already popped can be added back.
	if num < design.nextNew {
		design.addedBack[num] = true
	}
}
