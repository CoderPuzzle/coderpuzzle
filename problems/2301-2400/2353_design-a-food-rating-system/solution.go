package main

type playerRecord struct {
	team   string
	rating int
}

type ratingEntry struct {
	negRating int
	player    string
}

// entryLess orders entries by (-rating, player), so the minimum entry is
// the highest-rated player, ties to the smaller name.
func entryLess(a, b ratingEntry) bool {
	if a.negRating != b.negRating {
		return a.negRating < b.negRating
	}
	return a.player < b.player
}

// entryHeap is the classic array-backed binary min-heap over ratingEntry.
type entryHeap []ratingEntry

func (heap *entryHeap) push(item ratingEntry) {
	*heap = append(*heap, item)
	for child := len(*heap) - 1; child > 0; {
		parent := (child - 1) / 2
		if !entryLess((*heap)[child], (*heap)[parent]) {
			break
		}
		(*heap)[parent], (*heap)[child] = (*heap)[child], (*heap)[parent]
		child = parent
	}
}

func (heap *entryHeap) pop() ratingEntry {
	top := (*heap)[0]
	size := len(*heap) - 1
	(*heap)[0] = (*heap)[size]
	*heap = (*heap)[:size]
	for parent := 0; ; {
		left := 2*parent + 1
		if left >= size {
			break
		}
		smallest := left
		if right := left + 1; right < size && entryLess((*heap)[right], (*heap)[left]) {
			smallest = right
		}
		if !entryLess((*heap)[smallest], (*heap)[parent]) {
			break
		}
		(*heap)[parent], (*heap)[smallest] = (*heap)[smallest], (*heap)[parent]
		parent = smallest
	}
	return top
}

type FoodRatings struct {
	info   map[string]playerRecord
	byTeam map[string]*entryHeap
}

func NewFoodRatingsTyped(players []string, teams []string, scores []int) *FoodRatings {
	ratings := &FoodRatings{
		info:   make(map[string]playerRecord),
		byTeam: make(map[string]*entryHeap),
	}
	for index, player := range players {
		team, rating := teams[index], scores[index]
		ratings.info[player] = playerRecord{team, rating}
		heap, exists := ratings.byTeam[team]
		if !exists {
			heap = &entryHeap{}
			ratings.byTeam[team] = heap
		}
		// The min of (-rating, name) is exactly the required winner:
		// highest rating first, ties to the smaller name.
		heap.push(ratingEntry{-rating, player})
	}
	return ratings
}

func (design *FoodRatings) changeRating(player string, score int) {
	// Lazy deletion: push a fresh entry and leave the outdated one in the
	// heap as garbage; only the info map holds the current rating.
	record := design.info[player]
	design.info[player] = playerRecord{record.team, score}
	design.byTeam[record.team].push(ratingEntry{-score, player})
}

func (design *FoodRatings) highestRated(team string) string {
	heap := design.byTeam[team]
	for len(*heap) > 0 {
		top := (*heap)[0]
		// An entry is stale when its rating disagrees with the player's
		// current rating; a valid top is peeked, never consumed.
		if design.info[top.player].rating == -top.negRating {
			return top.player
		}
		heap.pop()
	}
	return ""
}
