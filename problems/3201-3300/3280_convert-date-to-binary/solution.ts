function convertDateToBinary(date: string): string {
    // The calendar pads month and day to two digits, but the binary form
    // drops that padding: each dash-separated component is parsed as its
    // plain decimal value and rendered in base 2 with no leading zeroes,
    // then the pieces are rejoined with dashes in year-month-day order.
    // toString(2) already omits leading zeroes.
    return date
        .split("-")
        .map((part) => parseInt(part, 10).toString(2))
        .join("-");
}
