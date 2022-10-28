


var koaning_canvas_elem = function(css_id, scalar = 3.14){
  var self = {}
  self.CANVAS_WIDTH = d3.select(css_id).node().clientWidth; 
  
  self.canvas = d3.select(css_id)
    .append("canvas")
    .attr("width", self.CANVAS_WIDTH)
    .attr("height", self.CANVAS_WIDTH);

  self.ctx = self.canvas.node().getContext("2d");
  self.ctx.globalAlpha = 0.2;
  self.ctx.width = self.CANVAS_WIDTH;

  self.draw_point = function(xs, ys, zs, vals){
    var height = self.CANVAS_WIDTH,
    width = self.CANVAS_WIDTH;
    var new_x = Math.sin(vals[0]*xs) + Math.sin(vals[1]*ys) - Math.cos(vals[2]*zs);
    var new_y = Math.sin(vals[3]*xs) + Math.sin(vals[4]*ys) - Math.cos(vals[5]*zs);
    xs = new_x;
    ys = new_y;
    zs = zs + 0.1;
    self.ctx.fillRect(xs*width/8 + width/2, ys*height/8 + height/2, 1, 1);
    return [xs, ys, zs]
  }

  self.draw_all = function(n, vals){
    self.ctx.clearRect(0,0,self.CANVAS_WIDTH,self.CANVAS_WIDTH);
    vals = vals.map(function(d){return d * scalar})
    var xs = 0,
    ys = 0,
    zs = 0;

    for(var i = n; i >= 0; i--) {
      var res = self.draw_point(xs, ys, zs, vals)
      xs = res[0];
      ys = res[1];
      zs = res[2];
    }
  }
  return self 
}

var koaning_slider_1d = function(css_id, min_val = 0, max_val = 1, rounding = 1000){
  var self = {}
  self.selector = d3.select(css_id); 
  self.svg = self.selector
    .append("svg")
    .attr("width", "100%")
    .attr("height", 20)
    .style("background-color", "#eeeeee")
  self.width = parseInt(self.svg.style("width"))
  self.height = parseInt(self.svg.style("height"))
  self.margin = 40;
  self.pos = (self.width - self.margin)/2
  self.value = function(){
    return min_val + self.pos/(self.width-self.margin)*(max_val - min_val)
  }
  self.round = function(num){
    return Math.round(self.value() * rounding)/rounding
  }

  self.rect = self.svg
    .append("rect")
    .attr("width", self.width - self.margin)
    .attr("height", self.height)
    .style("fill", "#dddddd")

  self.line = self.svg
    .append("line")
    .attr("x1", self.pos)
    .attr("x2", self.pos)
    .attr("y1", 0)
    .attr("y2", self.height)
    .style("stroke", "black")
    .style("stroke-width", 2)
  
  self.text = self.svg
    .append("text")
    .text(self.round(self.value()))
    .attr("x", self.width - self.margin + 2)
    .attr("y", self.height/2 + 4)
    .attr("font-size", "11px")
  
  self.when_value_change = function(){}

  self.set_value = function(val){
    self.pos = (val - min_val)/(max_val - min_val) * (self.width - self.margin);
    self.pos = Math.min(Math.max(0, self.pos), self.width - self.margin);
    self.render_pos()
  }

  self.render_pos = function(){
    self.line.attr("x1", self.pos).attr("x2", self.pos);
    self.text.text(self.round(self.value()));
  }

  self.rect.on("mousemove", function(d,i,l){
    var coords = d3.mouse(self.svg.node());
    self.pos = coords[0]
    self.render_pos()
    self.when_value_change(self.round(self.value()))
  })
  
  self.min_val = min_val;
  self.max_val = max_val;
  return self;
}

var koaning_slider_2d = function(css_id, min_x = 0, max_x = 1, min_y = 0, max_y = 1, rounding = 1000){
  var self = {}
  self.svg = d3.select(css_id)
    .append("svg")
    .attr("width", "100%")
    .attr("height", 300 + 10)
    .style("background-color", "#eeeeee");

  self.height = parseInt(self.svg.style("height"))
  self.width = parseInt(self.svg.style("width"))
  self.margin = 10
  self.pos = [self.width/2, self.height/2]
  self.value = function(){
    return [
    min_x + self.pos[0]/(self.width-self.margin)*(max_x - min_x),
    min_y + self.pos[1]/(self.width-self.margin)*(max_y - min_y),
    ]
  }
  self.round = function(num){
    return Math.round(num * rounding)/rounding
  }
  
  self.rect = self.svg
    .append("rect")
    .attr("y", 20)
    .attr("width", self.width)
    .attr("height", self.height - self.margin)
    .style("fill", "#dddddd")

  self.slider = self.svg
    .append("circle")
    .attr("cx", self.pos[0])
    .attr("cy", self.pos[1])
    .attr("r", 4)
    .style("background-color", "cyan");

  self.text = self.svg
    .append("text")
    .attr("y", 15)
    .attr("x", self.width/2 - 50)
    .text(self.value().map(self.round).join(","))

  self.when_value_change = function(){}

  self.set_value = function(arr_val){
    arr_val[0] = (arr_val[0] - min_x)/(max_x - min_x) * (self.width - self.margin);
    arr_val[0] = Math.min(Math.max(0, arr_val[0]), self.width - self.margin);
    arr_val[1] = (arr_val[1] - min_y)/(max_y - min_y) * (self.width - self.margin);
    arr_val[1] = Math.min(Math.max(0, arr_val[1]), self.width - self.margin);
    self.pos = arr_val
    self.render_pos()
  }

  self.render_pos = function(){
    self.slider.attr("cx", self.pos[0]).attr("cy", self.pos[1]);
    self.text.text(self.value().map(self.round).join(","))
  }

  self.rect.on("mousemove", function(d,i,l){
    var coords = d3.mouse(self.svg.node());
    self.pos = coords;
    self.render_pos();
    self.when_value_change();
  })

  return self
}