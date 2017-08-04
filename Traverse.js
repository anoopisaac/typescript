class Cell {
}
class Route {
}
class Board {
    constructor(width, height, maxCoverPerc, minCoverPerc, mandatoryCol) {
        this.cells = [];
        this.width = 5;
        this.height = 5;
        this.maxCoverPerc = 15;
        this.minCoverPerc = 10;
        this.width = width;
        this.height = height;
        this.maxCoverPerc = maxCoverPerc;
        this.minCoverPerc = minCoverPerc;
        this.mandatoryCol = mandatoryCol;
    }
    populateBoard() {
        var cellCount = this.width * this.height;
        //no of cells that needs to be covered base on percentage
        var coverageCount = Math.floor(cellCount * (this.maxCoverPerc / 100));
        while (true) {
            this.cells = [];
            var cells = this.getRandomCells(coverageCount);
            this.cells = this.cells.concat(cells);
            if (this.cells.filter(cell => cell.col == this.mandatoryCol).length > 0) {
                break;
            }
        }
    }
    getRandomCells(coverageCount) {
        var cells = [];
        //adding min as 1 as it could be zero, it will never go beyond the max limt even if add one to it as its converted to in the above ine
        var min = 1;
        while (cells.length < coverageCount) {
            var col = Math.floor((Math.random() * this.width) + min);
            var row = Math.floor((Math.random() * this.height) + min);
            if (cells.filter(cell => cell.row == row && cell.col == col).length == 0)
                cells.push({ row: row, col: col });
        }
        return cells;
    }
}
class FrogJump {
    constructor(board, startCell) {
        this.completedRoutes = [];
        this.board = board;
        this.startCell = startCell;
    }
    findNeighbors(cell, remainingList) {
        //get the cell from the same row, the first one towards left and right
        let leftCells = remainingList.filter(boardCell => boardCell.row == cell.row && boardCell.col < cell.col).sort((a, b) => a.col - b.col);
        let rightCells = remainingList.filter(boardCell => boardCell.row == cell.row && boardCell.col > cell.col).sort((a, b) => a.col - b.col);
        let downCells = remainingList.filter(boardCell => boardCell.col == cell.col && boardCell.row < cell.row).sort((a, b) => a.row - b.row);
        let upCells = remainingList.filter(boardCell => boardCell.col == cell.col && boardCell.row > cell.row).sort((a, b) => a.row - b.row);
        //add to the list
        let neighbors = [leftCells[leftCells.length - 1], upCells[0], rightCells[0], downCells[downCells.length - 1]];
        return neighbors.filter(cell => cell ? true : false);
    }
    startDigging() {
        let neighbors = this.findNeighbors(this.startCell, this.board.cells);
        if (neighbors.length == 0)
            return;
        let routes = [{ cells: neighbors, remainingCells: this.board.cells.filter(cell => !(cell.row == neighbors[0].row && cell.col == neighbors[0].col)) }];
        this.digRoutes(routes);
    }
    digRoutes(routes) {
        let frogJump = this;
        //let routes: Route[] = [{ cells: neighbors }]; 
        //go through each route
        //get the neighbors for the route
        //if no neibhbors
        //add route the completed route of the instance
        //else
        //call get new route passing the neighbors and route
        //call digRoutes method again passing the new list of routes    
        let nextGenRoutes = [];
        routes.forEach(function (route) {
            //let remainingList: Cell[] = frogJump.board.cells.filter(boardCell => !containsIn(route.cells, boardCell));
            //let remainingList: Cell[] = frogJump.board.cells.filter(boardCell => route.cells.filter(cell=>cell.row==boardCell.row&&cell.col==boardCell.col).length==0);
            let lastCell = route.cells[route.cells.length - 1];
            var neighbors = frogJump.findNeighbors(lastCell, route.remainingCells);
            if (neighbors.length == 0) {
                frogJump.completedRoutes.push(route);
            }
            else {
                nextGenRoutes = nextGenRoutes.concat(frogJump.getNextGenRoutes(route, neighbors));
            }
        });
        if (nextGenRoutes.length == 0) {
            return;
        }
        this.digRoutes(nextGenRoutes);
    }
    getNextGenRoutes(route, nextGenCells) {
        let nextGenRoutes = [];
        nextGenCells.forEach(function (nextGenCell) {
            let nextGenRoute = { cells: route.cells.slice(), remainingCells: route.remainingCells.filter(cell => !(cell.row == nextGenCell.row && cell.col == nextGenCell.col)) };
            nextGenRoute.cells.push(nextGenCell);
            nextGenRoutes.push(nextGenRoute);
        });
        return nextGenRoutes;
    }
}
function containsIn(list, object) {
    return list.filter(e => isEquivalent(e, object)).length > 0;
}
function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
}
//# sourceMappingURL=Traverse.js.map