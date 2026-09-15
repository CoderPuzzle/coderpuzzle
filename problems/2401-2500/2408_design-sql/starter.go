package main

type SQL struct{}

func NewSQLTyped(names []string, columns []int) *SQL {
	panic("TODO")
}

func (design *SQL) ins(name string, row []string) bool {
	panic("TODO")
}

func (design *SQL) rmv(name string, rowId int) {
	panic("TODO")
}

func (design *SQL) sel(name string, rowId int, columnId int) string {
	panic("TODO")
}

func (design *SQL) exp(name string) []string {
	panic("TODO")
}
