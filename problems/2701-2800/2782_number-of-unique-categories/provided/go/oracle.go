package main

// Problem-provided oracle (CategoryHandler), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the category assignment as a generic
// slice plus the query budget; only HaveSameCategory reveals it.
type CategoryHandler struct {
	category []int
	budget   int64
}

// NewCategoryHandler builds the oracle from the case's construction
// values (one generic slice of category labels) and the harness-supplied
// budget.
func NewCategoryHandler(construction []any, budget int64) *CategoryHandler {
	items, ok := construction[0].([]any)
	if !ok {
		panic("CategoryHandler categories must be an array")
	}
	category := make([]int, 0, len(items))
	for _, item := range items {
		value, ok := item.(int64)
		if !ok {
			panic("CategoryHandler categories must be integers")
		}
		category = append(category, int(value))
	}
	return &CategoryHandler{category: category, budget: budget}
}

func (handler *CategoryHandler) spend() {
	if handler.budget <= 0 {
		panic("CategoryHandler query budget exhausted")
	}
	handler.budget--
}

// HaveSameCategory reports whether elements a and b share a category;
// out-of-range arguments answer false, per the statement.
func (handler *CategoryHandler) HaveSameCategory(a, b int) bool {
	handler.spend()
	if a < 0 || a >= len(handler.category) || b < 0 || b >= len(handler.category) {
		return false
	}
	return handler.category[a] == handler.category[b]
}
