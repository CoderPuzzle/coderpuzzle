package main

// Running length of the current suffix of matched values: a match
// grows it, any other number resets it to zero, and consec is just
// "has the streak reached k". The window of the last k integers is
// summarized in one integer — nothing is buffered.
type DataStream struct {
	value  int
	k      int
	streak int
}

func NewDataStreamTyped(value int, k int) *DataStream {
	return &DataStream{value: value, k: k}
}

func (design *DataStream) consec(num int) bool {
	if num == design.value {
		design.streak++
	} else {
		design.streak = 0
	}
	return design.streak >= design.k
}
