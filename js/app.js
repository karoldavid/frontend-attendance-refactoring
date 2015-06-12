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

	function getRandom() {
            return (Math.random() >= 0.5);
        }

    var model = {
	    init: function() {
		    if (!localStorage.attendance) {
		    	console.log('Creating attendance records...');
                var attendance = {};
                console.log(data.students);
                for (var i = 0; i < data.students.length; i++) {
            	    var name = data.students[i].name;
            	    console.log(name);
            	    attendance[name] = [];

                    for (var x = 0; x <= 11; x++) {
                        attendance[name].push(getRandom());
                    }
                }

                localStorage.attendance = JSON.stringify(attendance);
                console.log(localStorage.attendance);
            }
        }
    };

    var octopus = {
    	init: function() {
    		model.init();
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