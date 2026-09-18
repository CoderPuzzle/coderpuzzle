package main

type TreeAncestor struct {
	levels int
	up     [][]int
}

func NewTreeAncestorTyped(n int, parent []int) *TreeAncestor {
	levels := 1
	for 1<<levels <= n {
		levels++
	}
	up := make([][]int, levels)
	up[0] = append([]int(nil), parent...)
	for j := 1; j < levels; j++ {
		previous := up[j-1]
		current := make([]int, n)
		for v, middle := range previous {
			if middle < 0 {
				current[v] = -1
			} else {
				current[v] = previous[middle]
			}
		}
		up[j] = current
	}
	return &TreeAncestor{levels: levels, up: up}
}

func (design *TreeAncestor) getKthAncestor(node int, k int) int {
	if k >= 1<<design.levels {
		return -1
	}
	level := 0
	for k != 0 && node >= 0 {
		if k&1 == 1 {
			node = design.up[level][node]
		}
		k >>= 1
		level++
	}
	return node
}
