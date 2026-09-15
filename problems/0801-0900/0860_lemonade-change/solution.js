/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
    // Only two counts ever matter: the $5 bills and the $10 bills on
    // hand. A $5 needs no change, a $10 consumes one $5, and a $20
    // consumes one $10 plus one $5 or three $5s. Handing the $10 first
    // is always at least as good: a $10 in the drawer is useful only as
    // part of a future $20's change, while a $5 serves every future
    // customer, so the choice that keeps the most $5s never hurts.
    let fives = 0;
    let tens = 0;
    for (const bill of bills) {
        if (bill === 5) {
            fives++;
        } else if (bill === 10) {
            if (fives === 0) {
                return false;
            }
            fives--;
            tens++;
        } else if (tens >= 1 && fives >= 1) {
            tens--;
            fives--;
        } else if (fives >= 3) {
            fives -= 3;
        } else {
            return false;
        }
    }
    return true;
};
