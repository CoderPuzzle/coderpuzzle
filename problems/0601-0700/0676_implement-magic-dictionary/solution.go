package main

// Words grouped by length; each buildDict REPLACES the previous dictionary,
// so search only ever sees the latest call's words. A candidate matches when
// it differs from the search word in exactly one position.

type MagicDictionary struct {
	buckets map[int][]string
}

func NewMagicDictionaryTyped() *MagicDictionary {
	return &MagicDictionary{buckets: map[int][]string{}}
}

func (design *MagicDictionary) buildDict(dictionary []string) {
	buckets := map[int][]string{}
	for _, word := range dictionary {
		length := len(word)
		buckets[length] = append(buckets[length], word)
	}
	design.buckets = buckets
}

func (design *MagicDictionary) search(searchWord string) bool {
	for _, word := range design.buckets[len(searchWord)] {
		mismatches := 0
		for index := 0; index < len(word); index++ {
			if word[index] != searchWord[index] {
				mismatches++
				if mismatches > 1 {
					break
				}
			}
		}
		if mismatches == 1 {
			return true
		}
	}
	return false
}
