/**
 Do not return anything, modify board in-place instead.
 */
/* （待填充位置使用1-9 填充 校验当前位置使用此数值是否合法） 
相比较于获取一个位置的所有可用数值的优化点：获取一个位置的所有可用数值需要全量计算，而校验合法性只要遍历到不合法的数值就可以直接返回false
*/
function solveSudoku2(board: string[][]): string[][] {
    const ROWL = 9, COLUMNL = 9, STEP = 3;

    /* 每次寻找未填充位置，依次尝试使用 1-9 填充 */
    /* 当前位置 1-9都不合法则返回false；
    从叶子节点（寻找不到空位置时）开始自下而上的返回true */
    function solveItem() {
        /* 数独未填充完毕才会递归 */
        /* 每次寻找未填充位置， 使用 1-9 进行填充校验*/
        for (let i = 0; i < ROWL; i++) {
            for (let j = 0; j < COLUMNL; j++) {
                if (board[i][j] !== '.') {
                    continue;
                }

                for (let k = 1; k <= 9; k++) {
                    if (isValid(i, j, `${k}`)) {
                        board[i][j] = `${k}`;
                        if (solveItem()) {
                            return true;
                        }
                        board[i][j] = '.';
                    }
                }
                /* 当前位置 9个数都试完了，都不行，则返回false */
                return false;
            }
        }
        /* 数独已经全部填充完毕，直接返回true */
        return true;
    }

    function isValid(row: number, column: number, str: string): boolean {
        /* 校验行是否重复 */
        for (let i = 0; i < COLUMNL; i++) {
            if (board[row][i] === str) {
                return false;
            }
        }

        /* 校验列是否重复 */
        for (let j = 0; j < ROWL; j++) {
            if (board[j][column] === str) {
                return false;
            }
        }

        /* 校验 3*3 宫 是否重复 */
        const startRow = Math.floor(row / STEP) * STEP;
        const startCol = Math.floor(column / STEP) * STEP;
        for (let r = startRow; r < startRow + STEP; r++) {
            for (let c = startCol; c < startCol + STEP; c++) {
                if (board[r][c] === str) {
                    return false;
                }
            }
        }

        return true;
    }

    solveItem();

    return board;
};

const board = [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]];
solveSudoku2(board)




