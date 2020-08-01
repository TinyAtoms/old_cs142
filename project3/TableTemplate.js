class TableTemplate {
    static fillIn(id, dict, columnName) {
        let table = document.getElementById(id);
        table.setAttribute("style", "visibility:visible");
        let rows = table.children[0].children;
        let nCols = 0;
        let changeColIndex = 0;
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (!i) {
                // if first row, index 0
                let cells = row.cells;
                for (let col = 0; col < cells.length; col++) {
                    let posKey = cells[col].innerText;
                    posKey = posKey.substring(2, posKey.length - 2);
                    let posVal = dict[posKey];
                    cells[col].innerText = posVal;
                    if (columnName === posVal) {
                        changeColIndex = col + 1;
                    }
                }
            }
            else {
                // normal row
                if (changeColIndex) {
                    // if we've set it, meaning if we found a matching column row
                    let posKey = row.cells[changeColIndex - 1].innerText;
                    posKey = posKey.substring(2, posKey.length - 2);
                    row.cells[changeColIndex - 1].innerText = dict[posKey];
                }
                else {
                    // mo colname specified
                    let cells = row.cells;
                    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                        let posKey = cells[cellIndex].innerText;
                        posKey = posKey.substring(2, posKey.length - 2);
                        cells[cellIndex].innerText = dict[posKey];
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=TableTemplate.js.map