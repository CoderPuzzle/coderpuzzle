package main

// One hash entry per (prefix, suffix) pair, built once at construction:
// for each word, every prefix of the word is joined to every suffix
// through a '#' -- no word or query can contain it, since both are
// lowercase letters only -- and the entry holds the word's index.
// Processing words left to right makes later words overwrite earlier
// ones, so every entry ends up holding the largest matching index, and
// f is a single lookup that answers -1 when the key is absent.
type WordFilter struct {
	weights map[string]int
}

func NewWordFilterTyped(words []string) *WordFilter {
	weights := make(map[string]int)
	for index, word := range words {
		for prefix := 0; prefix <= len(word); prefix++ {
			head := word[:prefix]
			for suffix := 0; suffix <= len(word); suffix++ {
				// The key is the concatenated string, so the slices that
				// build it share bytes with the word but never alias it.
				weights[head+"#"+word[suffix:]] = index
			}
		}
	}
	return &WordFilter{weights: weights}
}

func (design *WordFilter) f(pref string, suff string) int {
	found, ok := design.weights[pref+"#"+suff]
	if !ok {
		return -1
	}
	return found
}
