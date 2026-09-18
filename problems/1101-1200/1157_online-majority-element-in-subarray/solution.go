package main

import "sort"

type majorityNode struct {
	candidate int
	surplus   int
}

func mergeMajority(left majorityNode, right majorityNode) majorityNode {
	if left.candidate == right.candidate {
		return majorityNode{candidate: left.candidate, surplus: left.surplus + right.surplus}
	}
	if left.surplus > right.surplus {
		return majorityNode{candidate: left.candidate, surplus: left.surplus - right.surplus}
	}
	if right.surplus > left.surplus {
		return majorityNode{candidate: right.candidate, surplus: right.surplus - left.surplus}
	}
	return majorityNode{}
}

type MajorityChecker struct {
	n         int
	tree      []majorityNode
	positions map[int][]int
}

func NewMajorityCheckerTyped(arr []int) *MajorityChecker {
	n := len(arr)
	design := &MajorityChecker{
		n:         n,
		tree:      make([]majorityNode, 4*n),
		positions: make(map[int][]int),
	}
	design.build(1, 0, n-1, arr)
	for index, value := range arr {
		design.positions[value] = append(design.positions[value], index)
	}
	return design
}

func (design *MajorityChecker) build(node int, lo int, hi int, arr []int) {
	if lo == hi {
		design.tree[node] = majorityNode{candidate: arr[lo], surplus: 1}
		return
	}
	mid := lo + (hi-lo)/2
	design.build(2*node, lo, mid, arr)
	design.build(2*node+1, mid+1, hi, arr)
	design.tree[node] = mergeMajority(design.tree[2*node], design.tree[2*node+1])
}

func (design *MajorityChecker) query(left int, right int, threshold int) int {
	candidate := design.fold(1, 0, design.n-1, left, right).candidate
	occurrences := design.positions[candidate]
	count := sort.SearchInts(occurrences, right+1) - sort.SearchInts(occurrences, left)
	if count >= threshold {
		return candidate
	}
	return -1
}

func (design *MajorityChecker) fold(node int, lo int, hi int, left int, right int) majorityNode {
	if left <= lo && hi <= right {
		return design.tree[node]
	}
	mid := lo + (hi-lo)/2
	if right <= mid {
		return design.fold(2*node, lo, mid, left, right)
	}
	if left > mid {
		return design.fold(2*node+1, mid+1, hi, left, right)
	}
	return mergeMajority(design.fold(2*node, lo, mid, left, right), design.fold(2*node+1, mid+1, hi, left, right))
}
