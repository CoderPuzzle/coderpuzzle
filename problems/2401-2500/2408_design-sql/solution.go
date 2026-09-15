package main

import (
	"sort"
	"strconv"
	"strings"
)

// One table record per name in a hash map: the declared column count, an
// id -> row map, and a never-reset auto-increment counter. Failed inserts
// never touch the counter, and removals never roll it back, so the ids
// issued in a table strictly ascend and are never reused — sorting the
// row map's keys is therefore also the exp() output order.
type table struct {
	columns int
	rows    map[int][]string
	nextID  int
}

type SQL struct {
	tables map[string]*table
}

func NewSQLTyped(names []string, columns []int) *SQL {
	database := &SQL{tables: make(map[string]*table, len(names))}
	for i, name := range names {
		database.tables[name] = &table{
			columns: columns[i],
			rows:    make(map[int][]string),
			nextID:  1,
		}
	}
	return database
}

func (design *SQL) ins(name string, row []string) bool {
	target := design.tables[name]
	if target == nil || len(row) != target.columns {
		return false
	}
	target.rows[target.nextID] = row
	target.nextID++
	return true
}

func (design *SQL) rmv(name string, rowId int) {
	if target := design.tables[name]; target != nil {
		delete(target.rows, rowId)
	}
}

func (design *SQL) sel(name string, rowId int, columnId int) string {
	target := design.tables[name]
	if target == nil {
		return "<null>"
	}
	row := target.rows[rowId]
	if row == nil || columnId < 1 || columnId > target.columns {
		return "<null>"
	}
	return row[columnId-1]
}

func (design *SQL) exp(name string) []string {
	target := design.tables[name]
	if target == nil {
		return []string{}
	}
	rowIds := make([]int, 0, len(target.rows))
	for rowId := range target.rows {
		rowIds = append(rowIds, rowId)
	}
	sort.Ints(rowIds)
	lines := make([]string, 0, len(rowIds))
	for _, rowId := range rowIds {
		lines = append(lines, strconv.Itoa(rowId)+","+strings.Join(target.rows[rowId], ","))
	}
	return lines
}
