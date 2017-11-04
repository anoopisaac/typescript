

class Cell {
    row: number;
    col: number;
}


class Route {
    cells: Cell[];
    remainingCells:Cell[];

}

class Board {
    cells: Cell[] = [];
    width: number = 5;
    height: number = 5;
    maxCoverPerc: number = 15;
    minCoverPerc: number = 10;
    mandatoryCol: number;
    constructor(width?, height?, maxCoverPerc?, minCoverPerc?, mandatoryCol?) {
        this.width = width;
        this.height = height;
        this.maxCoverPerc = maxCoverPerc;
        this.minCoverPerc = minCoverPerc;
        this.mandatoryCol = mandatoryCol;
    }

    populateBoard() {
        var cellCount: number = this.width * this.height;
        //no of cells that needs to be covered base on percentage
        var coverageCount: number = Math.floor(cellCount * (this.maxCoverPerc / 100))
        while (true) {
            this.cells = [];
            var cells: Cell[] = this.getRandomCells(coverageCount);
            //this.cells=this.cells.concat(cells);
            this.cells=cells;
            if (this.cells.filter(cell => cell.col == this.mandatoryCol).length > 0) {
                break;
            }

        }


    }

    getRandomCells(coverageCount: number): Cell[] {
        var cells: Cell[] = [];
        //adding min as 1 as it could be zero, it will never go beyond the max limt even if add one to it as its converted to in the above ine
        var min: number = 1;
        while (cells.length < coverageCount) {
            var col: number = Math.floor((Math.random() * this.width));
            var row: number = Math.floor((Math.random() * this.height) );
            if(cells.filter(cell=>cell.row==row&&cell.col==col).length==0)
                cells.push({ row: row, col: col })
            
        }
        return cells;
    }
}



class FrogJump {

    board: Board;
    startCell: Cell;
    completedRoutes: Route[]=[];

    constructor(board: Board, startCell: Cell) {
        this.board = board;
        this.startCell = startCell;
    }





    findNeighbors(cell: Cell, remainingList: Cell[]): Cell[] {
        //get the cell from the same row, the first one towards left and right
        let leftCells: Cell[] = remainingList.filter(boardCell =>
            boardCell.row == cell.row && boardCell.col < cell.col
        ).sort((a, b) => a.col - b.col);

        let rightCells: Cell[] = remainingList.filter(boardCell =>
            boardCell.row == cell.row && boardCell.col > cell.col
        ).sort((a, b) => a.col - b.col);

        let downCells: Cell[] = remainingList.filter(boardCell =>
            boardCell.col == cell.col && boardCell.row < cell.row
        ).sort((a, b) => a.row - b.row);

        let upCells: Cell[] = remainingList.filter(boardCell =>
            boardCell.col == cell.col && boardCell.row > cell.row
        ).sort((a, b) => a.row - b.row);


        //add to the list
        let neighbors: Cell[] = [leftCells[leftCells.length - 1], upCells[0], rightCells[0], downCells[downCells.length - 1]];
        return neighbors.filter(cell => cell ? true : false);
    }

    startDigging() {
        let neighbors: Cell[] = this.findNeighbors(this.startCell, this.board.cells);
        
        if (neighbors.length == 0) return;
        let routes: Route[] = [{ cells: neighbors,remainingCells:this.board.cells.filter(cell=>!(cell.row==neighbors[0].row&&cell.col==neighbors[0].col)) }];
        this.digRoutes(routes);
    }

    getEmptyCells():Cell[] {
        //var allCells:Cell[]=
        var board:Board=this.board;
        var allCells:Cell[]=new Array(this.board.width*this.board.height).fill(0).map((value, index) => {
            return  {row:parseInt(`${index/board.width}`),col:index%board.width}
        })
        var emptyCells:Cell[]=[];
        allCells.forEach(allCell=>{
            if(board.cells.find(cell=>cell.row==allCell.row&&cell.col==allCell.col)==null){
                emptyCells.push(allCell)
            }
        })
           
        return emptyCells;
    }


    digRoutes(routes: Route[]) {
        let frogJump = this;

        //let routes: Route[] = [{ cells: neighbors }]; 
        //go through each route
        //get the neighbors for the route
        //if no neibhbors
        //add route the completed route of the instance
        //else
        //call get new route passing the neighbors and route
        //call digRoutes method again passing the new list of routes    
        let nextGenRoutes: Route[] = [];
        routes.forEach(function (route) {
            
            

            //let remainingList: Cell[] = frogJump.board.cells.filter(boardCell => !containsIn(route.cells, boardCell));
            //let remainingList: Cell[] = frogJump.board.cells.filter(boardCell => route.cells.filter(cell=>cell.row==boardCell.row&&cell.col==boardCell.col).length==0);
            let lastCell: Cell = route.cells[route.cells.length - 1];
            var neighbors: Cell[] = frogJump.findNeighbors(lastCell, route.remainingCells);
            if (neighbors.length == 0) {
                frogJump.completedRoutes.push(route);
            }
            else {
                nextGenRoutes=nextGenRoutes.concat(frogJump.getNextGenRoutes(route, neighbors))
            }
        })
        if(nextGenRoutes.length==0){
            return;
        }
        this.digRoutes(nextGenRoutes);

    }

    /**
     * for each route it creates a new set of routes based on neighbors of terminating cell. its like tree branches
     * @param route 
     * @param nextGenCells 
     */
    getNextGenRoutes(route: Route, nextGenCells: Cell[]): Route[] {
        let nextGenRoutes: Route[]=[];
        nextGenCells.forEach(function (nextGenCell) {
            // slice is created because it creates a new array with a shallow copy of contents,otherwise it will interfere with next iteration
            let nextGenRoute: Route = { cells: route.cells.slice(),remainingCells:route.remainingCells.filter(cell=>!(cell.row==nextGenCell.row&&cell.col==nextGenCell.col)) }
            nextGenRoute.cells.push(nextGenCell);
            nextGenRoutes.push(nextGenRoute);
        })
        return nextGenRoutes;
    }

    /**
     * trying to find out routes contributed by a specific cell to figure out how many routes difference would it make if one cell is removed
     */
    getRoutesAfterMissingCells():Map<Cell,Route[]>{
        var routesAfterMissingCellMap:Map<Cell,Route[]>=new Map<Cell,Route[]>();
        this.board.cells.forEach(cell => {
            var newRoutes:Route[]=this.getRoutesAfterMissingCell(cell);
            routesAfterMissingCellMap.set(cell,newRoutes);
        });
        return routesAfterMissingCellMap;
    }

    /**
     * trying to find out routes contributed by a specific cell to figure out how many routes difference would it make if one cell is removed
     */
    getRoutesAfterMissingCell(missingCell:Cell):Route[]{
        var newRoutes:Route[]=[];
        this.completedRoutes.forEach(route => {
            var isRouteStillValid:boolean=false;
            var routeLength:number=route.cells.length;
            var cellIndex:number=route.cells.indexOf(missingCell);
            //not present in the route; must be in remaining cells
            if(cellIndex==-1){
                isRouteStillValid=true;
            }
            //check for last
            else if(cellIndex==routeLength-1){
                isRouteStillValid=true;
            }
            //first one; only need to check for col as the previous one would have row as -1
            else if (cellIndex==0){
                if(missingCell.col==route.cells[cellIndex+1].col){
                    isRouteStillValid=true;
                }
            }
            //anywhere in between
            else{
                var prevCol:number=route.cells[cellIndex-1].col;
                var proceedCol:number=route.cells[cellIndex+1].col;
                var prevRow:number=route.cells[cellIndex-1].row;
                var proceedRow:number=route.cells[cellIndex+1].row;
                if(prevCol==proceedCol||prevRow==proceedRow){
                    isRouteStillValid=true;
                }
            }
            
            if(isRouteStillValid){
                var newRoute:Route={ cells: route.cells.filter(cell=>!(cell.row==missingCell.row&&cell.col==missingCell.col)),remainingCells:route.remainingCells.filter(cell=>!(cell.row==missingCell.row&&cell.col==missingCell.col)) }
                newRoutes.push(newRoute)
            }
        });
        return newRoutes;
    }



}

function containsIn(list: any[], object) {
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