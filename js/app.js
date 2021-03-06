$(function(){

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
        getNames: function() {
            var attendance = JSON.parse(localStorage.attendance),
            names = [];
            $.each(attendance, function(name){
            	names.push(name);
            }); 
            return names;
        },
        update: function(attendance) {
            localStorage.attendance = JSON.stringify(attendance);
        }
    };

    var octopus = {
    	init: function() {
    		model.init();
    		tableCreateView.init();
    		tableUpdateView.init();
    	},
    	getNumStudents: function() {
            return data.students.length;
    	},
    	getNumDays: function() {
            return DAYS;
    	},
    	getAttendance: function() {
    		return model.getAll();
    	},
    	getStudentNames: function() {
    		return model.getNames();
    	},
    	updateData: function(newData) {
    		model.update(newData);
    	}
    };

    function createRowElem(tx, tClass) {
    	var elem = document.createElement(tx);
        elem.className = tClass;
        if ((tx === 'td') && (tClass === 'attend-col')) {
            var input = document.createElement('input');
    	    input.type = 'checkbox';
    		elem.appendChild(input)
        }
        return elem;
    }

    function getTableColElem(tx, columnClass, numRows, rowClass) {
        var elem = document.createElement('tr');
        elem.className = columnClass;
 
        elem.appendChild(createRowElem(tx, rowClass[0]));
        for (var i = 0; i < numRows; i++) {
            elem.appendChild(createRowElem(tx, rowClass[1]));
    	}
    	elem.appendChild(createRowElem(tx, rowClass[2]));
    	return elem;
    }

    var tableCreateView = {
    	init: function() {
    		this.tableHeadElem = document.getElementById('table-head');
    		this.tableBodyElem = document.getElementById('table-body');
    		this.rowClass = ["name-col", "attend-col", "missed-col"];
    		this.columnClass = { "th": "t-header", "td": "student"};
    		this.numRows = octopus.getNumDays();
    		this.numCols = octopus.getNumStudents();

    		tableCreateView.render();

    	},
    	render: function() {
    		this.tableHeadElem.appendChild(getTableColElem("th", this.columnClass["th"], this.numRows, this.rowClass));
    		for (var i = 0; i < this.numCols; i++) {
    			var elem = getTableColElem("td", this.columnClass["td"], this.numRows, this.rowClass);
                this.tableBodyElem.appendChild(elem);
            }

            $('thead .name-col').text('Student Name');

            var $headAttendCol = $('thead .attend-col');
            $headAttendCol.each(function(e) {
            	$(this).text(e+1);
            })

            $('thead .missed-col').text('Days Missed');

            var names = octopus.getStudentNames();
            var studentRows = $('tbody .student');
          	studentRows.each(function() {
                $(this).children('.name-col').text(names.shift());
            });

            var attendance = octopus.getAttendance();

            $.each(attendance, function(name, days) {
            	var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            	dayChecks = $(studentRow).children('.attend-col').children('input');

                dayChecks.each(function(i) {
                   $(this).prop('checked', days[i]);
                });
            });
    	}
    };

    var tableUpdateView = {
        init: function() {

            tableUpdateView.render();
        },
        render: function() {

        	var $allMissed = $('tbody .missed-col'),
                $allCheckboxes = $('tbody input');

            function countMissing() {
            	$allMissed.each(function() {
            	    var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;
                    dayChecks.each(function() {
                        if (!$(this).prop('checked')) {
                            numMissed++;
                        }
                    });
                    $(this).text(numMissed);
                });
            }

            $allCheckboxes.on('click', function() {
                var studentRows = $('tbody .student'),
                newAttendance = {};

                studentRows.each(function() {
                    var name = $(this).children('.name-col').text(),
                    $allCheckboxes = $(this).children('td').children('input');

                    newAttendance[name] = [];

                    $allCheckboxes.each(function() {
                        newAttendance[name].push($(this).prop('checked'));
                    });
                });
                countMissing();
                octopus.updateData(newAttendance);
            });
            countMissing();
        }
    };

    octopus.init();
});