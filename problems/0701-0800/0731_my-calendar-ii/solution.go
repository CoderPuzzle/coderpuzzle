package main

// Two interval lists. `singles` holds every accepted booking; `doubles`
// holds the regions where two accepted bookings already overlap. A new
// event is scanned against `doubles` first -- meeting any of them would
// park a third event on the same moment, so it is refused and nothing is
// recorded. Otherwise each accepted event it overlaps contributes the
// intersection to `doubles`, and the event itself joins `singles`.

type calendarSpan struct {
	lo int
	hi int
}

type MyCalendarTwo struct {
	singles []calendarSpan
	doubles []calendarSpan
}

func NewMyCalendarTwoTyped() *MyCalendarTwo {
	return &MyCalendarTwo{}
}

func (design *MyCalendarTwo) book(start int, end int) bool {
	for _, region := range design.doubles {
		if start < region.hi && region.lo < end {
			return false
		}
	}
	for _, event := range design.singles {
		if start < event.hi && event.lo < end {
			lo, hi := start, end
			if event.lo > lo {
				lo = event.lo
			}
			if event.hi < hi {
				hi = event.hi
			}
			design.doubles = append(design.doubles, calendarSpan{lo: lo, hi: hi})
		}
	}
	design.singles = append(design.singles, calendarSpan{lo: start, hi: end})
	return true
}
