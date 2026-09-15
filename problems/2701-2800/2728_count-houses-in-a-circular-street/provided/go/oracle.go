package main

// Problem-provided oracle (Street), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the door states as a generic slice plus the
// query budget; the agent starts at the first house.
type Street struct {
	doors    []int
	budget   int64
	position int
}

// NewStreet builds the oracle from the case's construction values (one
// generic slice of door states) and the harness-supplied budget.
func NewStreet(construction []any, budget int64) *Street {
	items, ok := construction[0].([]any)
	if !ok {
		panic("Street doors must be an array")
	}
	doors := make([]int, 0, len(items))
	for _, item := range items {
		value, ok := item.(int64)
		if !ok {
			panic("Street doors must be integers")
		}
		doors = append(doors, int(value))
	}
	return &Street{doors: doors, budget: budget}
}

func (street *Street) spend() {
	if street.budget <= 0 {
		panic("Street query budget exhausted")
	}
	street.budget--
}

// OpenDoor opens the door of the house the agent is in front of.
func (street *Street) OpenDoor() {
	street.spend()
	street.doors[street.position] = 1
}

// CloseDoor closes the door of the house the agent is in front of.
func (street *Street) CloseDoor() {
	street.spend()
	street.doors[street.position] = 0
}

// IsDoorOpen reports whether the door of the current house is open.
func (street *Street) IsDoorOpen() bool {
	street.spend()
	return street.doors[street.position] == 1
}

// MoveRight moves the agent to the right house.
func (street *Street) MoveRight() {
	street.spend()
	street.position = (street.position + 1) % len(street.doors)
}

// MoveLeft moves the agent to the left house.
func (street *Street) MoveLeft() {
	street.spend()
	street.position = (street.position + len(street.doors) - 1) % len(street.doors)
}
