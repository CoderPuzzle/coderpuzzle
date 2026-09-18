package main

type keyHistory struct {
	values []string
	stamps []int64
}

type TimeMap struct {
	histories map[string]*keyHistory
}

func NewTimeMapTyped() *TimeMap {
	return &TimeMap{histories: make(map[string]*keyHistory)}
}

func (design *TimeMap) ensure() {
	if design.histories == nil {
		design.histories = make(map[string]*keyHistory)
	}
}

func (design *TimeMap) set(key string, value string, timestamp int) {
	design.ensure()
	history := design.histories[key]
	if history == nil {
		history = &keyHistory{}
		design.histories[key] = history
	}
	history.values = append(history.values, value)
	history.stamps = append(history.stamps, int64(timestamp))
}

func (design *TimeMap) get(key string, timestamp int) string {
	history := design.histories[key]
	if history == nil {
		return ""
	}
	low, high := 0, len(history.stamps)
	for low < high {
		mid := low + (high-low)/2
		if history.stamps[mid] <= int64(timestamp) {
			low = mid + 1
		} else {
			high = mid
		}
	}
	index := low - 1
	if index < 0 {
		return ""
	}
	return history.values[index]
}
