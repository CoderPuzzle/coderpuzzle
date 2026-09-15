package main

import "strconv"

// One abbreviation group per abbreviation, held as a set of words;
// isUnique applies the two-condition rule directly: the group for the
// query's abbreviation must be empty, or contain nothing but the query
// itself.
type ValidWordAbbr struct {
	groups map[string]map[string]bool
}

func abbrev(word string) string {
	// First letter + count of the letters between + last letter; a word
	// of one or two characters is an abbreviation of itself.
	if len(word) <= 2 {
		return word
	}
	return string(word[0]) + strconv.Itoa(len(word)-2) + string(word[len(word)-1])
}

func NewValidWordAbbrTyped(dictionary []string) *ValidWordAbbr {
	// A set per abbreviation: listing "deer" twice must leave the group
	// {"deer"} — a word never collides with its own duplicates.
	groups := make(map[string]map[string]bool)
	for _, word := range dictionary {
		key := abbrev(word)
		if groups[key] == nil {
			groups[key] = make(map[string]bool)
		}
		groups[key][word] = true
	}
	return &ValidWordAbbr{groups: groups}
}

func (design *ValidWordAbbr) isUnique(word string) bool {
	group, ok := design.groups[abbrev(word)]
	// No word with this abbreviation, or every such word is `word`.
	if !ok {
		return true
	}
	return len(group) == 1 && group[word]
}
