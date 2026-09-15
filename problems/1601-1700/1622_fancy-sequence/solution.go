package main

// A running (mult, add) pair represents the affine transform every
// already-appended value has picked up so far: current value = stored *
// mult + add (mod modVal). addAll/multAll only touch that pair — O(1) — and
// never walk the sequence. append folds the transform's inverse into the
// value being stored, so that re-applying the transform later reproduces
// exactly the value that was appended, no matter how many addAll/multAll
// calls land in between.
const modVal int64 = 1_000_000_007

type Fancy struct {
	mult   int64
	add    int64
	stored []int64
}

func NewFancyTyped() *Fancy {
	return &Fancy{mult: 1, add: 0, stored: nil}
}

func modPow(base, exp, mod int64) int64 {
	result := int64(1)
	base %= mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}

func (design *Fancy) append(val int) {
	// Undo the current transform up front: stored * mult + add == val, so
	// stored == (val - add) * inverse(mult) (mod modVal). mult is never 0
	// mod modVal (each multAll factor is 1..100, and modVal is prime), so
	// the modular inverse always exists.
	inv := modPow(design.mult, modVal-2, modVal)
	diff := ((int64(val)-design.add)%modVal + modVal) % modVal
	design.stored = append(design.stored, diff*inv%modVal)
}

func (design *Fancy) addAll(inc int) {
	design.add = (design.add + int64(inc)) % modVal
}

func (design *Fancy) multAll(m int) {
	design.mult = design.mult * int64(m) % modVal
	design.add = design.add * int64(m) % modVal
}

func (design *Fancy) getIndex(idx int) int {
	if idx < 0 || idx >= len(design.stored) {
		return -1
	}
	return int((design.stored[idx]*design.mult + design.add) % modVal)
}
