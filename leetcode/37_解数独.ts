/**
 Do not return anything, modify board in-place instead.
 */
 /* （每次获取待填充位置时计算当前位置可用数值）待优化 */
function solveSudoku(board: string[][]): string[][] {

    /* 根据行/列序号，查询所在的 3x3 宫中已经存在的数值 */
    function getSpaceAlreadyNum(row: number, column: number) {
        const { start: rowStart, end: rowEnd } = getSpaceIndex(row, [2, 5, 8]);
        const { start: columnStart, end: columnEnd } = getSpaceIndex(column, [2, 5, 8]);

        const nums: string[] = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            const columnNums = board[i].slice(columnStart, columnEnd + 1).filter(num => num !== '.');
            nums.push(...columnNums);
        }

        return nums;
    }

    /* 根据行/列序号，查询所在的行列已经存在的数值 */
    function getRowAndColumnAlreadyNum(row: number, column: number) {
        let nums = board[row].slice();
        for (let i = 0; i < 9; i++) {
            nums.push(board[i][column]);
        }

        return nums.filter(num => num !== '.');
    }

    /* 根据行/列序号，查询所在的 3x3 宫的 行/列序号 */
    function getSpaceIndex(index: number, nums: number[]) {
        let start = 0, end = 0;
        for (let num of nums) {
            if (index <= num) {
                start = num - 2;
                end = num;
                return {
                    start,
                    end,
                };
            }
        }
    }

    function getCanUseNums(row: number, column: number) {
        let nums = getSpaceAlreadyNum(row, column);
        nums.push(...getRowAndColumnAlreadyNum(row, column));
        const used = [...new Set(nums)];
        return new Array(9).fill('').map((item, index) => `${index + 1}`).filter(item => !used.includes(item));
    }

    function dfs() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== '.') {
                    continue;
                }

                const canUseNums = getCanUseNums(i, j);

                /* 当前位置没有可用的数值时，中断递归 */
                if (!canUseNums.length) {
                    return false;
                }

                for (let k = 0; k < canUseNums.length; k++) {
                    board[i][j] = canUseNums[k];
                    /* 
                    当前是最后一列的话：换行， 列置为0；
                    否则，不换行，列 + 1；
                    */
                    if (dfs()) {
                        return true;
                    }
                    board[i][j] = '.';
                }
                /* 当前位置所有可用数值都无法向下走通时，返回false */ 
                return false;

            }
        }
        return true;
    }

    dfs();

    return board;
};

solveSudoku([["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]])




