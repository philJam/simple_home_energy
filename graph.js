var graph = {

    element: false,
    ctx: false,
    
    // Pixel width and height of graph
    width: 200,
    height: 200,
    
    margin: {
        bottom: 20,
        top:20
    },
    
    draw: function(element,series) {
    
        var xlabelmax = 0;
        for (s in series)
        {
            var data = series[s];
            for (z in data) {
                if (data[z][3].length>xlabelmax) xlabelmax = data[z][3].length;
            }
        }
        
        this.margin.bottom = (xlabelmax * 6.5) + 25;
        
        var plot_height = this.height - this.margin.bottom - this.margin.top;

        // Initialise the canvas get context
        if (!ctx) {
            this.element = element;
            var c = document.getElementById(element);  
            this.ctx = c.getContext("2d");
        }
        
        var ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0,0,this.width,this.height);
        
        // find out max and min values of data
        var xmin = undefined;
        var xmax = undefined;
        var ymin = undefined;
        var ymax = undefined;
        
        for (s in series)
        {
            var data = series[s];
            for (z in data)
            {
                if (xmin==undefined) xmin = data[z][0];
                if (xmax==undefined) xmax = data[z][0];
                if (ymin==undefined) ymin = data[z][1];
                if (ymax==undefined) ymax = data[z][1];
                            
                if (data[z][1]>ymax) ymax = data[z][1];
                if (data[z][1]<ymin) ymin = data[z][1];
                if (data[z][0]>xmax) xmax = data[z][0];
                if (data[z][0]<xmin) xmin = data[z][0];               
            }
        }
        var r = (ymax - ymin);
        ymin = (ymin + (r / 2)) - (r/1.5);
        ymin = 0;
        
        ymax = (ymax - (r / 2)) + (r/1.5);
        if (this.ymax!=undefined) ymax = this.ymax;
        
        xmin -= 1.3;
        xmax += 0.6;
        
        var scale = 1;
        
        ctx.font="16px Arial";
        ctx.save();
        ctx.translate(20, this.margin.top + plot_height/2);
        ctx.rotate(-Math.PI/2);
        ctx.textAlign = "center";
        ctx.fillText(this.yaxislabel, 0,0);
        ctx.restore();
        
        ctx.textAlign = "right";
        ctx.font="13px Arial";
        ctx.fillStyle = "#222";
        ctx.strokeStyle = "#222";
        
        for (i=0; i<=10; i++)
        {
            var y = this.margin.top + plot_height - (((i*this.ytick - ymin) / (ymax - ymin)) * plot_height);
            ctx.moveTo(55,y);
            ctx.lineTo(this.width,y);
            ctx.fillText(i*this.ytick, 51,y+4);
        }
        ctx.stroke();
        
        ctx.beginPath();
        for (s in series)
        {
            var data = series[s]; 
            for (z in data)
            {
                var x = ((data[z][0] - xmin) / (xmax - xmin)) * this.width;
                var y = this.margin.top + plot_height - (((data[z][1] - ymin) / (ymax - ymin)) * plot_height);
                
                var y2 = this.margin.top + plot_height - (((data[z][2] - ymin) / (ymax - ymin)) * plot_height);
                var y3 = this.margin.top + plot_height - (((data[z][3] - ymin) / (ymax - ymin)) * plot_height);  
                var barwidth = ((0.65) / (xmax - xmin)) * this.width;
                
                ctx.fillStyle = "#ff2712";
                ctx.fillRect(x-22,y,20,this.margin.top+plot_height-y);
                
                ctx.fillStyle = "#ff7466";
                ctx.fillRect(x-12,y2,15,this.margin.top+plot_height-y2);
                
                ctx.fillStyle = "#ffb5ad";
                ctx.fillRect(x+12,y3,15,this.margin.top+plot_height-y3);
                  
                  
                // X AXIS LABELS  
                ctx.fillStyle = "#222";
                ctx.font="13px Arial";
                ctx.save();
                ctx.translate(x+5, this.margin.top + plot_height+10);
                ctx.rotate(-Math.PI/2);
                ctx.textAlign = "right";
                ctx.fillText(data[z][4], 0,0);
                ctx.restore();
            }
            ctx.stroke();
        } 
    }

};
