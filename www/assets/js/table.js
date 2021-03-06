/*!
 * jQuery Parse Table plugin
 *
 * Copyright 2011, Francis Chong
 * Licensed under the MIT licenses.
 *
 */
(function($) {
    $.fn.parsetable = function(dupCols, dupRows) {
        if (dupRows == undefined) dupRows = false;
        if (dupCols == undefined) dupCols = false;
        
        var columns = [],
        curr_x = 0,
        curr_y = 0;

        $("tr", this).each(function(row_idx, row) {
            curr_y = 0;
            $("td, th", row).each(function(col_idx, col) {
                var rowspan = $(col).attr('rowspan') || 1;
                var colspan = $(col).attr('colspan') || 1;
                var content = col.innerHTML || "";

                var x = 0,
                y = 0;
                for (x = 0; x < rowspan; x++) {
                    for (y = 0; y < colspan; y++) {
                        if (columns[curr_y + y] == undefined) {
                            columns[curr_y + y] = []
                        }

                        while (columns[curr_y + y][curr_x + x] != undefined) {
                            curr_y += 1
                            if (columns[curr_y + y] == undefined) {
                                columns[curr_y + y] = []
                            }
                        }

                        if ((x == 0 || dupRows) && (y == 0 || dupCols)) {
                            columns[curr_y + y][curr_x + x] = content
                        } else {
                            columns[curr_y + y][curr_x + x] = ""
                        }
                    }
                }
                curr_y += 1;
            });
            curr_x += 1;
        });

        return columns;
    };
})(jQuery);