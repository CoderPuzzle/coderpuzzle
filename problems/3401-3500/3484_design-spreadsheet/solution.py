class Spreadsheet:
    """A hash map from cell reference to its current value. Unset cells
    simply read as 0 through a defaulting lookup, and resetCell writes 0
    rather than deleting, so every cell state lives in one place.
    getValue drops the leading '=', splits on '+', and classifies each
    operand by its first character: a capital letter means a cell
    reference, anything else is a non-negative integer literal.
    """

    def __init__(self, rows: int):
        self.values = {}

    def setCell(self, cell: str, value: int):
        self.values[cell] = value

    def resetCell(self, cell: str):
        self.values[cell] = 0

    def getValue(self, formula: str) -> int:
        total = 0
        for operand in formula[1:].split("+"):
            if "A" <= operand[0] <= "Z":
                total += self.values.get(operand, 0)
            else:
                total += int(operand)
        return total
