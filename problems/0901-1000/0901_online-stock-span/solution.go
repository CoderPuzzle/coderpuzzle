package main

type spanEntry struct {
	price int
	span  int
}

type StockSpanner struct {
	stack []spanEntry
}

func NewStockSpannerTyped() *StockSpanner {
	return &StockSpanner{}
}

func (design *StockSpanner) next(price int) int {
	span := 1
	for count := len(design.stack); count > 0; count = len(design.stack) {
		top := design.stack[count-1]
		if top.price > price {
			break
		}
		span += top.span
		design.stack = design.stack[:count-1]
	}
	design.stack = append(design.stack, spanEntry{price: price, span: span})
	return span
}
