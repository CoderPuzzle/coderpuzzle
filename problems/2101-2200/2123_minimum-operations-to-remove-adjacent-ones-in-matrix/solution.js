/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
    const rows = grid.length;
    const columns = grid[0].length;
    const total = rows * columns;
    const adjacency = Array.from({ length: total }, () => []);
    const leftVertices = [];
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (grid[row][column] === 0 || (row + column) % 2 === 1) continue;
            const vertex = row * columns + column;
            leftVertices.push(vertex);
            for (const [dr, dc] of directions) {
                const nr = row + dr;
                const nc = column + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] === 1) {
                    adjacency[vertex].push(nr * columns + nc);
                }
            }
        }
    }

    const pairLeft = new Int32Array(total).fill(-1);
    const pairRight = new Int32Array(total).fill(-1);
    const distance = new Int32Array(total);
    const infinity = total + 1;
    const stack = new Int32Array(total);
    const pathEdges = new Int32Array(total);

    const layer = () => {
        const queue = [];
        for (const vertex of leftVertices) {
            if (pairLeft[vertex] === -1) {
                distance[vertex] = 0;
                queue.push(vertex);
            } else distance[vertex] = infinity;
        }
        let shortest = infinity;
        for (let head = 0; head < queue.length; head++) {
            const vertex = queue[head];
            if (distance[vertex] >= shortest) continue;
            for (const neighbor of adjacency[vertex]) {
                const mate = pairRight[neighbor];
                if (mate === -1) shortest = distance[vertex] + 1;
                else if (distance[mate] === infinity) {
                    distance[mate] = distance[vertex] + 1;
                    queue.push(mate);
                }
            }
        }
        return shortest;
    };

    const augment = (root, shortest, nextEdge) => {
        let size = 1;
        stack[0] = root;
        while (size > 0) {
            const vertex = stack[size - 1];
            if (nextEdge[vertex] === adjacency[vertex].length) {
                distance[vertex] = infinity;
                size--;
                continue;
            }
            const neighbor = adjacency[vertex][nextEdge[vertex]++];
            const mate = pairRight[neighbor];
            if (mate === -1) {
                if (distance[vertex] + 1 !== shortest) continue;
                pairLeft[vertex] = neighbor;
                pairRight[neighbor] = vertex;
                for (let level = size - 2; level >= 0; level--) {
                    const parent = stack[level];
                    const edge = pathEdges[level];
                    pairLeft[parent] = edge;
                    pairRight[edge] = parent;
                }
                return true;
            }
            if (distance[mate] === distance[vertex] + 1) {
                pathEdges[size - 1] = neighbor;
                stack[size++] = mate;
            }
        }
        return false;
    };

    let matching = 0;
    while (true) {
        const shortest = layer();
        if (shortest === infinity) break;
        const nextEdge = new Int32Array(total);
        for (const vertex of leftVertices) {
            if (pairLeft[vertex] === -1 && augment(vertex, shortest, nextEdge)) matching++;
        }
    }
    return matching;
};
