/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
var displayTable = function (orders) {
    const counts = new Map();
    const foodSet = new Set();
    for (const [, table, food] of orders) {
        foodSet.add(food);
        if (!counts.has(table)) {
            counts.set(table, new Map());
        }
        const row = counts.get(table);
        row.set(food, (row.get(food) || 0) + 1);
    }
    const foods = [...foodSet].sort();
    const tables = [...counts.keys()].sort((a, b) => Number(a) - Number(b));
    const grid = [["Table", ...foods]];
    for (const table of tables) {
        const row = counts.get(table);
        grid.push([table, ...foods.map((food) => String(row.get(food) || 0))]);
    }
    return grid;
};
