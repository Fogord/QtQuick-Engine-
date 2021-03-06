/**
  * The including files
  */

//The files for including
var jsFiles = [
            {path: "../js/engine.js"},
            {path: "../js/localStorage.js"}
        ];

//The loop for checking including files
for (var i = 0; i < jsFiles.length; i++) {
    // инклудим файл
    var includeResult = Qt.include(jsFiles[i].path);
    switch (includeResult.status) {
    case 2: // result.NETWORK_ERROR - incorrect URL, in out case incorrect file path
        throw ("Error including of " + jsFiles[i].path + ". Uncorrect file path/name");
        break;
    case 3: // result.EXCEPTION - the implementation error of file
        var err = includeResult.exception;
        throw("Error in " + jsFiles[i].path + ". " + err.message + " in line " + err.lineNumber);
        break;
    default: // ok
        console.log(jsFiles[i].path + " included");
        break;
    }
}

// The modules of app
var app = (function () {

    var parentHeight

    var listOfProcesses = function() {
        var item = [{
            componentName: "Item",
            elements: [{
                                componentName: "Line"
                          },{
                                componentName: "Button",
                                property: {
                                    text: "Name of Button"
                                },
                                publish: {
                                    clicked: "Signal From BTN",
                                },
                                subscribe: {
                                    signalFromBTN: function() {
                                        //todo
                                    }
                                }
                          },{
                                componentName: "Line"
                          }] // elements that describe processes
            }];

        return item;
    }


    var start = function () {
        localStorage.dbInit();
        makePublisher(root);
        createPage(listOfProcesses(), root);
    }

    return {
        start: start
    }
})()
