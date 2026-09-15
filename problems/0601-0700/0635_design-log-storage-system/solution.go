package main

// Logs kept as parallel id/timestamp slices in put order; retrieve truncates
// every string to the granularity's fixed-width prefix and keeps the logs
// whose truncated timestamp compares between the truncated bounds —
// zero-padded fields make that exact.

// Prefix length per granularity: "2017" for Year, one more ":XX" field per
// step down to the full 19 characters.
var granularityWidth = map[string]int{
	"Year":   4,
	"Month":  7,
	"Day":    10,
	"Hour":   13,
	"Minute": 16,
	"Second": 19,
}

type LogSystem struct {
	ids        []int
	timestamps []string
}

func NewLogSystemTyped() *LogSystem {
	return &LogSystem{}
}

func (design *LogSystem) put(id int, timestamp string) {
	design.ids = append(design.ids, id)
	design.timestamps = append(design.timestamps, timestamp)
}

func (design *LogSystem) retrieve(start string, end string, granularity string) []int {
	width := granularityWidth[granularity]
	low, high := start[:width], end[:width]
	// The scan walks the store oldest-first, so the ids come back in the
	// order their logs were stored.
	found := []int{}
	for index, timestamp := range design.timestamps {
		// Same-width truncations compare exactly like their fields.
		if truncated := timestamp[:width]; low <= truncated && truncated <= high {
			found = append(found, design.ids[index])
		}
	}
	return found
}
