class SQL {
    constructor(names: string[], columns: number[]) {}

    ins(name: string, row: string[]): boolean {}

    rmv(name: string, rowId: number) {}

    sel(name: string, rowId: number, columnId: number): string {}

    exp(name: string): string[] {}
}
