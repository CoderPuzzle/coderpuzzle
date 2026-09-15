package main

// Two FIFO slices plus a waiting set: riders and drivers queue in arrival
// order, matchDriverWithRider pairs the two fronts, and cancelRider only
// unmarks the rider — a later match lazily skips any front rider that is
// no longer waiting, so cancellation never shifts the queue. Head indices
// instead of re-slicing keep every pop O(1).
type RideSharingSystem struct {
	riders     []int
	riderHead  int
	drivers    []int
	driverHead int
	waiting    map[int]struct{}
}

func NewRideSharingSystemTyped() *RideSharingSystem {
	return &RideSharingSystem{waiting: make(map[int]struct{})}
}

func (design *RideSharingSystem) addRider(riderId int) {
	design.riders = append(design.riders, riderId)
	design.waiting[riderId] = struct{}{}
}

func (design *RideSharingSystem) addDriver(driverId int) {
	design.drivers = append(design.drivers, driverId)
}

func (design *RideSharingSystem) matchDriverWithRider() []int {
	for design.riderHead < len(design.riders) {
		if _, ok := design.waiting[design.riders[design.riderHead]]; ok {
			break
		}
		design.riderHead++
	}
	if design.riderHead == len(design.riders) || design.driverHead == len(design.drivers) {
		return []int{-1, -1}
	}
	riderId := design.riders[design.riderHead]
	design.riderHead++
	delete(design.waiting, riderId)
	driverId := design.drivers[design.driverHead]
	design.driverHead++
	return []int{driverId, riderId}
}

func (design *RideSharingSystem) cancelRider(riderId int) {
	delete(design.waiting, riderId)
}
