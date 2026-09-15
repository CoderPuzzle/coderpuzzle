package main

type ParkingSystem struct {
	slots [4]int
}

func NewParkingSystemTyped(big int, medium int, small int) *ParkingSystem {
	return &ParkingSystem{slots: [4]int{0, big, medium, small}}
}

func (design *ParkingSystem) addCar(carType int) bool {
	if design.slots[carType] > 0 {
		design.slots[carType]--
		return true
	}
	return false
}
