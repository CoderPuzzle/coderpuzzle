import (
	"container/list"
	"sort"
)

func deckRevealedIncreasing(deck []int) []int {
	// Build the answer by playing the reveal backwards: place the cards
	// from the largest down to the smallest; before each placement the
	// bottom card of the ordering built so far moves to the top, undoing
	// one "put the next top card at the bottom". container/list is Go's
	// doubly-linked deque: PushFront/PushBack/Remove(Back()).
	sorted := append([]int(nil), deck...)
	sort.Ints(sorted)
	cards := list.New()
	for i := len(sorted) - 1; i >= 0; i-- {
		if cards.Len() > 0 {
			cards.PushFront(cards.Remove(cards.Back()))
		}
		cards.PushFront(sorted[i])
	}
	result := make([]int, 0, len(deck))
	for card := cards.Front(); card != nil; card = card.Next() {
		result = append(result, card.Value.(int))
	}
	return result
}
