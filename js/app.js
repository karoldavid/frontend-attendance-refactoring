$(function(){

    var data = {
    	"students": [
    	{
         	"name": "Slappy the Frog"
        },
    	{
    		"name": "Lilly the Lizard"
    	},
    	{
    		"name": "Paulrus the Walrus"
        },
        {
    	    "name": "Gregory the Goat"
    	},
        {
    	    "name":  "Adam the Anaconda"
    	}
    ]};

    var DAYS = 12;

	function getRandom() {
		return (Math.random() >= 0.5);
	}

    var model = {
	    init: function() {
		    if (!localStorage.attendance) {
		    	console.log('Creating attendance records...');
                var attendance = {};
                for (var i = 0; i < data.students.length; i++) {
            	    var name = data.students[i].name;
            	    attendance[name] = [];

                    for (var x = 0; x < DAYS; x++) {
                        attendance[name].push(getRandom());
                    }
                }
                localStorage.attendance = JSON.stringify(attendance);
            }
        },
        getAll: function() {
        	return JSON.parse(localStorage.attendance);
        },
        getRecord: function(name) {
            return JSON.parse(localStorage.attendance)[name];
        }
    };

    var octopus = {
    	init: function() {
    		model.init();
    		tableView.init();
    	},
    	getNumStudents: function() {
            return data.students.length;
    	},
    	getNumDays: function() {
            return DAYS;
    	},
    	getAllDays: function() {
    		model.getAll();
    	}
    };

    function createRowElem(tx, tClass) {
    	var elem = document.createElement(tx);
        elem.class = tClass;
        if ((tx === 'td') && (tClass === 'attend-col')) {
            var input = document.createElement('input');
    	    input.type = 'checkbox';
    		elem.appendChild(input)
        }
        return elem;
    }

    function getTableColElem(tx, columnClass, numRows, rowClass) {
        var elem = document.createElement('tr');
        elem.class = columnClass;
 
        elem.appendChild(createRowElem(tx, rowClass[0]));
        for (var i = 0; i < numRows; i++) {
            elem.appendChild(createRowElem(tx, rowClass[1]));
    	}
    	elem.appendChild(createRowElem(tx, rowClass[2]));
    	return elem;
    }

    var tableView = {
    	init: function() {
    		this.tableHeadElem = document.getElementById('table-head');
    		this.tableBodyElem = document.getElementById('table-body');
    		this.numRows = octopus.getNumDays();
    		this.numCols = octopus.getNumStudents();
    		this.rowClass = ["name-col", "attend-col", "missed-col"];
    		this.columnClass = { "th": "t-header", "td": "student"};

            tableView.render();

    	},
    	render: function() {
    		this.tableHeadElem.appendChild(getTableColElem("th", this.columnClass["th"], this.numRows, this.rowClass));
    		for (var i = 0; i < this.numCols; i++) {
    			var elem = getTableColElem("td", this.columnClass["td"], this.numRows, this.rowClass);
                this.tableBodyElem.appendChild(elem);
            }

            var students = $('tbody .name-col');
        
    	}
    };


// /* STUDENT APPLICATION */
// $(function() {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());


    octopus.init();
});