import (
	"sort"
	"strconv"
)

func displayTable(orders [][]string) [][]string {
	counts := make(map[string]map[string]int)
	foodSet := make(map[string]bool)
	for _, order := range orders {
		table, food := order[1], order[2]
		foodSet[food] = true
		row, ok := counts[table]
		if !ok {
			row = make(map[string]int)
			counts[table] = row
		}
		row[food]++
	}
	foods := make([]string, 0, len(foodSet))
	for food := range foodSet {
		foods = append(foods, food)
	}
	sort.Strings(foods)
	tables := make([]string, 0, len(counts))
	for table := range counts {
		tables = append(tables, table)
	}
	sort.Slice(tables, func(i, j int) bool {
		a, _ := strconv.Atoi(tables[i])
		b, _ := strconv.Atoi(tables[j])
		return a < b
	})
	grid := make([][]string, 0, len(tables)+1)
	header := append([]string{"Table"}, foods...)
	grid = append(grid, header)
	for _, table := range tables {
		row := counts[table]
		out := make([]string, 0, len(foods)+1)
		out = append(out, table)
		for _, food := range foods {
			out = append(out, strconv.Itoa(row[food]))
		}
		grid = append(grid, out)
	}
	return grid
}
