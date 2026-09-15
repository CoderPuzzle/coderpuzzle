package main

import "strings"

// A plain key -> value hash map: no nodes, no per-insert maintenance. insert()
// stores the pair and stops -- the map carries no structure beyond the
// pairs themselves -- and sum() pays for that at query time,
// scanning every stored key and summing the values of those that start
// with the prefix.
type MapSum struct {
	values map[string]int
}

func NewMapSumTyped() *MapSum {
	return &MapSum{values: map[string]int{}}
}

func (design *MapSum) insert(key string, val int) {
	design.values[key] = val
}

func (design *MapSum) sum(prefix string) int {
	total := int64(0)
	for key, val := range design.values {
		if strings.HasPrefix(key, prefix) {
			total += int64(val)
		}
	}
	return int(total)
}
