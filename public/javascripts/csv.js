var stockData = [
        {
            Symbol: "AAPL",
            Company: "Apple Inc.",
            Price: 132.54
        },
        {
            Symbol: "INTC",
            Company: "Intel Corporation",
            Price: 33.45
        },
        {
            Symbol: "GOOG",
            Company: "Google Inc",
            Price: 554.52
        },
    ];

function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        console.log(result)
        return result;
    }

    function downloadCSV(args) {
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: stockData
        });
        if (csv == null) return;

        // DATE //

        var currentdate = new Date();
        var today = (currentdate.getMonth()+1) + "-"
                + currentdate.getDate()  + "-"
                + currentdate.getFullYear() + " - "
                + currentdate.getHours()
                + currentdate.getMinutes()
                + currentdate.getSeconds();

        filename = args.filename || 'restaurant-data - '+today+'.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
