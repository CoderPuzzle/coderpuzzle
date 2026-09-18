package main

type ProductOfNumbers struct {
	prefix []int64
}

func NewProductOfNumbersTyped() *ProductOfNumbers {
	return &ProductOfNumbers{prefix: []int64{1}}
}

func (design *ProductOfNumbers) ensure() {
	if design.prefix == nil {
		design.prefix = []int64{1}
	}
}

func (design *ProductOfNumbers) add(num int) {
	design.ensure()
	if num == 0 {
		design.prefix = design.prefix[:1]
		return
	}
	last := design.prefix[len(design.prefix)-1]
	design.prefix = append(design.prefix, last*int64(num))
}

func (design *ProductOfNumbers) getProduct(k int) int {
	design.ensure()
	if k >= len(design.prefix) {
		return 0
	}
	return int(design.prefix[len(design.prefix)-1] / design.prefix[len(design.prefix)-1-k])
}
