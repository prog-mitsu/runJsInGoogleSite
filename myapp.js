var MYAPP = {
    
    /**--------------------------------------------
    * JqGridにデータをセットして表示します
    * @param {String}  JqGrid表示DOM名
    *---------------------------------------------*/
    setJqGrid: function(targetDomName){
        var JQGRID_TITLE = "JqGridテスト",
            DISP_ROW_MAX = 100,
            colArray = [],
            rowArray = [];
            
        colArray.push({"name":"id",     "label":"ID",  "sortable":true, "width": 100 });
        colArray.push({"name":"value0", "label":"値1", "sortable":true, "width": 100 });
        colArray.push({"name":"value1", "label":"値2", "sortable":true, "width": 100 });
            
        rowArray.push({"id":0, "value0":0, "value1":000 });
        rowArray.push({"id":1, "value0":1, "value1":100 });
        rowArray.push({"id":2, "value0":2, "value1":200 });
        rowArray.push({"id":3, "value0":3, "value1":300 });
        rowArray.push({"id":4, "value0":4, "value1":400 });
        rowArray.push({"id":5, "value0":5, "value1":500 });
        rowArray.push({"id":6, "value0":6, "value1":600 });
        rowArray.push({"id":7, "value0":7, "value1":700 });
        rowArray.push({"id":8, "value0":8, "value1":800 });
        rowArray.push({"id":9, "value0":9, "value1":900 });
            
        jQuery(targetDomName).jqGrid({
            data: rowArray,
            colModel: colArray,
            datatype: "local",
            height: 'auto',
            sortorder: "ASC",
            multiselect: false,
            rowNum:DISP_ROW_MAX,
            excel: true,
            viewrecords: true,
            caption: JQGRID_TITLE
        });
    
    }

};



