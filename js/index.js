var $ = function(selector){

    var self = document.querySelectorAll(selector);
    console.log('$ called');

    function text() {
    	console.log(arguments);
        if (self.length == 1 && arguments.length == 0) {
        	return self[0].innerHTML;
        }
        else if (self.length == 1 && arguments.length == 1) {
        	self[0].innerHTML = arguments[0];
        	return self;
        }
        else {
        	return self;
        }
    }

    function val() {
    	if (self.length == 1) return self[0].value;
    }

    self.text = text;
    self.val = val;
    return self;
}

function main() {
	console.log("Working");
	// console.log($("[href*=assign]"));
	console.log($("[href*='01']").text());
}