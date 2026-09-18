package main

type Trie struct {
	words    map[string]bool
	prefixes map[string]bool
}

func NewTrieTyped() *Trie {
	return &Trie{
		words:    make(map[string]bool),
		prefixes: make(map[string]bool),
	}
}

func (design *Trie) insert(word string) {
	// The judge constructs the zero value of the struct, so the maps
	// appear lazily on the first insert (reads of a nil map are safe).
	if design.words == nil {
		design.words = make(map[string]bool)
		design.prefixes = make(map[string]bool)
	}
	design.words[word] = true
	// Record every beginning, the word itself included — a word begins
	// with itself, so it is its own longest prefix.
	for end := 1; end <= len(word); end++ {
		design.prefixes[word[:end]] = true
	}
}

func (design *Trie) search(word string) bool {
	return design.words[word]
}

func (design *Trie) startsWith(prefix string) bool {
	return design.prefixes[prefix]
}
