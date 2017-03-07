
var columnDefs = [
    {headerName: "Athlete", field: "athlete", width: 150, filter: 'text'},
    {headerName: "Gold", field: "gold", width: 100, filter: 'number', floatingFilterComponent: NumberFloatingFilter,
        floatingFilterComponentParams:{
            suppressFilterButton:true
        }, suppressMenu:true},
    {headerName: "Silver", field: "silver", width: 100, filter: 'number', floatingFilterComponent: NumberFloatingFilter,
        floatingFilterComponentParams:{
            suppressFilterButton:true
        }, suppressMenu:true},
    {headerName: "Bronze", field: "bronze", width: 100, filter: 'number', floatingFilterComponent: NumberFloatingFilter,
        floatingFilterComponentParams:{
            suppressFilterButton:true
        }, suppressMenu:true},
    {headerName: "Total", field: "total", width: 100, filter: 'number', floatingFilterComponent: NumberFloatingFilter,
        floatingFilterComponentParams:{
            suppressFilterButton:true
        }, suppressMenu:true}
];

var gridOptions = {
    floatingFilter:true,
    columnDefs: columnDefs,
    rowData: null,
    enableFilter: true
};

function NumberFloatingFilter() {
}

NumberFloatingFilter.prototype.init = function (params) {
    this.onFloatingFilterChanged = params.onFloatingFilterChanged;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = '&gt; <input style="width:20px" type="text"/>'
    this.currentValue = null;
    this.eFilterInput = this.eGui.querySelector('input');
    var that = this;
    function onInputBoxChanged(){
        if (that.eFilterInput.value === ''){
            //If the input box is empty we clear the filter
            that.onFloatingFilterChanged(null);
            return;
        }

        that.currentValue = Number(that.eFilterInput.value);
        that.onFloatingFilterChanged({
            //In this example we are only interested in filtering by greaterThan
            type:'greaterThan',
            filter:that.currentValue
        });
    }
    this.eFilterInput.addEventListener('input', onInputBoxChanged);
};

NumberFloatingFilter.prototype.onParentModelChanged = function (parentModel) {
    // When the filter is empty we will receive a null message her
    if (!parentModel) {
        this.eFilterInput.value = '';
        this.currentValue = null;
    } else {
        this.eFilterInput.value = parentModel.filter + '';
        this.currentValue = parentModel.filter;
    }
};

NumberFloatingFilter.prototype.getGui = function () {
    return this.eGui;
};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', '../olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});

