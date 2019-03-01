d3.layout.trail = function() {

    var var1 = {};

    var time = function() {},
        currentTime,
        decayRange,
        data,
        positioner,
        sort,
        coordType = 'coordinates',
        grouping;

    grouping = function(d) {
        return 1
    }

    positioner = function(datum) {
        return [datum.x,datum.y]
    }


    lineToSegments = function(values) {
        if (currentTime != undefined & decayRange != undefined) {
            values = values.filter(function(d) {
                return (time(d) <= currentTime && time(d) >= (currentTime-decayRange))
            })
        }



        values = d3
            .nest()
            .key(function(d) {return grouping(d)})
            .entries(values);

        tmp = values;

        output = [];


        var i = 0
        values.forEach(function(element) {
            i++;
	    if (sort!=undefined) {
		element.values.sort(sort)
	    }
            if (i==1) {
                //console.log(element)
	    }
            var values = element.values;

            for (var i = 0; i < (values.length); i++) {
                var current = values[i];
                if (values[i+1] != undefined) {
		    current.next = values[i+1]
		} else {
		    current.next = {}
		}
                if (values[i-1] != undefined) {
                    current.previous = values[i-1]
                    if (coordType=="coordinates") {
                        current.coordinates = [
                            positioner(values[i-1]),
                            positioner(values[i])
                        ]
                    } else if (coordType=="xy") {
                        var a = positioner(values[i-1]),
                            b = positioner(values[i]);
                        current.x1=a[0]
                        current.y1=a[1]
                        current.x2=b[0]
                        current.y2=b[1]
                    }
                    current.type = "LineString";
                }
                current.opacity = 1-(currentTime-time(current))/decayRange
            }
	    output = output.concat(values);
        })
        return output;
    }

    var1.layout = function() {
        output = lineToSegments(data);
        return output;
    }

    var1.coordType = function(x) {
        if (!arguments.length) return coordType;
        coordType= x
        return var1
    }

    var1.grouping = function(x) {
        if (!arguments.length) return grouping;
        grouping= x
        return var1
    }

    var1.time = function(x) {
        if (!arguments.length) return time;
        time = x
        return var1
    }

    var1.currentTime = function(x) {
        if (!arguments.length) return currentTime;
        currentTime= x
        return var1
    }

    var1.decayRange = function(x) {
        if (!arguments.length) return decayRange;
        decayRange= x
        return var1
    }

    var1.data = function(x,append) {
        if (!arguments.length) return data;

        if (append) {
            data = data || [];
            data = data.concat(x)
        } else {
            data = x
        }

        return var1
    }

    var1.positioner = function(x) {
        if (!arguments.length) return positioner;
        positioner = x
        return var1
    }
    var1.sort = function(x) {
 	if (!arguments.length) return sort; 
	    sort= x
 	return var1
    } 

    return var1;

}
