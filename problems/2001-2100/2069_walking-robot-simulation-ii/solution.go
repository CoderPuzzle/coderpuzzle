package main

type Robot struct {
	width     int
	height    int
	perimeter int
	index     int
	moved     bool
}

func NewRobotTyped(width int, height int) *Robot {
	return &Robot{width: width, height: height, perimeter: 2*(width+height) - 4}
}

func (design *Robot) step(num int) {
	design.index = (design.index + num) % design.perimeter
	design.moved = true
}

func (design *Robot) getPos() []int {
	if design.index <= design.width-1 {
		return []int{design.index, 0}
	}
	rightEnd := design.width + design.height - 2
	if design.index <= rightEnd {
		return []int{design.width - 1, design.index - (design.width - 1)}
	}
	topEnd := 2*design.width + design.height - 3
	if design.index <= topEnd {
		return []int{topEnd - design.index, design.height - 1}
	}
	return []int{0, design.perimeter - design.index}
}

func (design *Robot) getDir() string {
	if !design.moved {
		return "East"
	}
	if design.index == 0 {
		return "South"
	}
	if design.index <= design.width-1 {
		return "East"
	}
	if design.index <= design.width+design.height-2 {
		return "North"
	}
	if design.index <= 2*design.width+design.height-3 {
		return "West"
	}
	return "South"
}
