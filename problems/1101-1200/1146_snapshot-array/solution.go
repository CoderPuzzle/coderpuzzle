package main

type versionEntry struct {
	commit int
	val    int
}

type SnapshotArray struct {
	current int // version id the next commit() will return
	history map[int][]versionEntry
}

func NewSnapshotArrayTyped(length int) *SnapshotArray {
	return &SnapshotArray{
		current: 0,
		history: make(map[int][]versionEntry),
	}
}

func (design *SnapshotArray) set(index int, val int) {
	entries := design.history[index]
	if count := len(entries); count > 0 && entries[count-1].commit == design.current {
		entries[count-1].val = val // a second write in the same version
		return
	}
	design.history[index] = append(entries, versionEntry{commit: design.current, val: val})
}

func (design *SnapshotArray) snap() int {
	id := design.current
	design.current++
	return id
}

func (design *SnapshotArray) get(index int, commit_id int) int {
	entries := design.history[index]
	if len(entries) == 0 {
		return 0 // never written
	}
	low, high := 0, len(entries)
	for low < high { // rightmost entry at or before commit_id
		mid := (low + high) / 2
		if entries[mid].commit <= commit_id {
			low = mid + 1
		} else {
			high = mid
		}
	}
	if low == 0 {
		return 0
	}
	return entries[low-1].val
}
