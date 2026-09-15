package main

import (
	"math"
	"math/rand"
)

type Solution struct {
	radius  float64
	xCenter float64
	yCenter float64
	random  *rand.Rand
}

func NewSolutionTyped(radius float64, x_center float64, y_center float64) *Solution {
	return &Solution{radius: radius, xCenter: x_center, yCenter: y_center, random: rand.New(rand.NewSource(478))}
}

func clampCell(index int) int {
	if index < 0 {
		return 0
	}
	if index > 3 {
		return 3
	}
	return index
}

func (design *Solution) randPoint() []float64 {
	var dx, dy float64
	for {
		dx = (2.0*design.random.Float64() - 1.0) * design.radius
		dy = (2.0*design.random.Float64() - 1.0) * design.radius
		if dx*dx+dy*dy <= design.radius*design.radius {
			break
		}
	}
	half := design.radius * 0.5
	i := clampCell(int(math.Floor(dx/half)) + 2)
	j := clampCell(int(math.Floor(dy/half)) + 2)
	return []float64{design.xCenter + (float64(i)-1.5)*half, design.yCenter + (float64(j)-1.5)*half}
}
