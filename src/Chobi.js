'use strict';

var Chobi = function(elem){
			if(elem instanceof(Image)){
				this.image = elem;
				this.imageData = this.extractImageData();
				console.log('Type matched. instanceof(Image). Saved as [Chobi object]');
				try{
					this.onload();
				}catch(e){
					console.log('ready callback not found');
				}
			}
			else if(typeof(elem)=='string'){
				var context = this;
				console.log('Not instanceof(Image). Trying as URL');
				var img = new Image();
				img.crossOrigin = "Anonymous";
				img.src = elem;
				img.onload = function(){
					context.image = img;
					context.imageData = context.extractImageData();
					console.log('Type matched. URL. Saved as [Chobi object]');
					try{
						context.onload();
					}catch(e){
						console.log('ready callback not found');
					}
					return;
				}
			}
			else{
				console.log('Not instanceof(Image). Trying as URL');
				console.log('Not URL. Trying as input[file]');
				var context = this;
				try {
					var file = elem.files[0];
					var fr = new FileReader();
					fr.onload= function(){
						var img = new Image();
						img.onload = function(){
							context.image = img;
							context.imageData = context.extractImageData();
							console.log('Type matched. input[file]. Saved as [Chobi object]');
							try{
								context.onload();
							}catch(e){
								console.log('ready callback not found');
							}
							return;
						}
						img.src = fr.result;
					};
					fr.readAsDataURL(file);
				} catch(e) {
					console.log("Not input[file]. Trying as <canvas>");
				}
				try{
					var img = new Image();
					var imgData = elem.toDataURL();
					img.src = imgData;
					console.log(imgData);
					img.onload = function(){
						context.image = img;
						context.imageData = context.extractImageData();
						console.log('Type matched. <canvas>. Saved as [Chobi object]');
						try{
							context.onload();
						}catch(e){
							console.log('ready callback not found');
						}
						return;
					}
				}catch(e){
					console.log('Not <canvas>. Trying as <img>');
				}
				try{
					var img = new Image();
					img.src = elem.src;
					img.onload = function(){
						context.image = img;
						context.imageData = context.extractImageData();
						console.log('Type matched. <img>. Saved as [Chobi object]');
						try{
							context.onload();
						}catch(e){
							console.log('ready callback not found');
						}
						return;
					}
				}catch(e){
					console.log('Not <img>. No other type is supported');
				}

			}
		}
		Chobi.prototype.ready = function(onLoadFunc){
			this.onload = onLoadFunc;
		}
		Chobi.prototype.onload = null;
		Chobi.prototype.extractImageData = function(){
			var img = this.image;
			var drawArea = document.createElement('canvas');
			var ctx = drawArea.getContext("2d");
			drawArea.width = img.width;
			drawArea.height = img.height;
			ctx.drawImage(img,0,0,img.width,img.height);
			this.imageData = ctx.getImageData(0,0,img.width,img.height);
			return this.imageData;
		}
		Chobi.prototype.getColorAt = function(x,y){
			var index=(y*4)*this.imageData.width+(x*4);
			var colorData = {
				red: this.imageData.data[index],
				green: this.imageData.data[index+1],
				blue: this.imageData.data[index+2],
				alpha: this.imageData.data[index+3]
			}
			return colorData;
		}
		Chobi.prototype.setColorAt = function(x,y,obj){
			var index=(y*4)*this.imageData.width+(x*4);
			try{
				this.imageData.data[index] = obj.red;
				this.imageData.data[index+1] = obj.green;
				this.imageData.data[index+2] = obj.blue;
				this.imageData.data[index+3] = obj.alpha;
				return true;
			}
			catch(e){
				return e;
			}
		}
		Chobi.prototype.blackAndWhite = function(){
			var imageData = this.imageData;
			for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var red=imageData.data[index];
         			var green=imageData.data[index+1];
        	 		var blue=imageData.data[index+2];
        	 		var avg = (red+green+blue)/3;
        	 		imageData.data[index] = avg;
        	 		imageData.data[index+1] = avg;
        	 		imageData.data[index+2] = avg;
				}
			}
			return this;
		}
		Chobi.prototype.blackAndWhite2 = function(){
			var imageData = this.imageData;
			for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var red=imageData.data[index];
         			var green=imageData.data[index+1];
        	 		var blue=imageData.data[index+2];
        	 		var avg = ((red*0.3)+(green*0.59)+(blue*0.11));
        	 		imageData.data[index] = avg;
        	 		imageData.data[index+1] = avg;
        	 		imageData.data[index+2] = avg;
				}
			}
			return this;
		}
		Chobi.prototype.sepia = function(){
			var imageData = this.imageData;
			for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var red=imageData.data[index];
         			var green=imageData.data[index+1];
        	 		var blue=imageData.data[index+2];
        	 		imageData.data[index] = (red*0.393)+(green*0.769)+(blue*0.189);
        	 		imageData.data[index+1] = (red*0.349)+(green*0.686)+(blue*0.168);
        	 		imageData.data[index+2] = (red*0.272)+(green*0.534)+(blue*0.131);
				}
			}
			return this;
		}
		Chobi.prototype.negative = function(){
			var imageData = this.imageData;
			for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var red=imageData.data[index];
         			var green=imageData.data[index+1];
        	 		var blue=imageData.data[index+2];
        	 		var alpha = imageData.data[index+3];
        	 		red = 255-red;
        	 		green = 255-green;
        	 		blue = 255-blue;
        	 		imageData.data[index] = red;
        	 		imageData.data[index+1] = green;
        	 		imageData.data[index+2] = blue;
				}
			}
			return this;
		}
		Chobi.prototype.random = function(min, max) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		Chobi.prototype.noise = function(){
			var imageData = this.imageData;
			for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var rindex=(i*4)*imageData.width+(j*4);
					var randRed = this.random(100,200);
					var randGreen = this.random(100,200);
					var randBlue = this.random(100,200);
					var red=(imageData.data[index]+randRed)/2;
         			var green=(imageData.data[index+1]+randGreen)/2;
        	 		var blue=(imageData.data[index+2]+randBlue)/2;
        	 		imageData.data[index] = red;
        	 		imageData.data[index+1] = green;
        	 		imageData.data[index+2] = blue;
				}
			}
			return this;
		}
		Chobi.prototype.contrast = function(amount){
			var value = (255.0 + amount) / 255.0;
			value *= value;
			var imageData = this.imageData;
			for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var r=imageData.data[index];
         			var g=imageData.data[index+1];
        	 		var b=imageData.data[index+2];
        	 		var red = r / 255.0;
				    var green = g / 255.0;
				    var blue = b / 255.0;
        	 		red = (((red - 0.5) * value) + 0.5) * 255.0;
			    	green = (((green - 0.5) * value) + 0.5) * 255.0;
			    	blue = (((blue - 0.5) * value) + 0.5) * 255.0;
			    	if(red>255) red=255;
			    	if(red<0) red=0;
			    	if(green>255) green=255;
			    	if(green<0) green=0;
			    	if(blue>255) blue=255;
			    	if(blue<0) blue=0;
        	 		imageData.data[index] = red;
        	 		imageData.data[index+1] = green;
        	 		imageData.data[index+2] = blue;
				}
			}
			return this;
		}
		Chobi.prototype.crossProcess = function(){
			var imageData = this.imageData;
			this.vintage();
			this.brightness(10);
			this.contrast(50);
			return this;
		}
		Chobi.prototype.map = function(x,min,max,a,b){
			return ((b-a)*(x-min)/(max-min))+a;  
		}
		Chobi.prototype.brightness = function(amount) {
		    var imageData = this.imageData;
		    amount = this.map(amount,-100,100,-255,255);
		    console.log(amount);
		   	for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var red=imageData.data[index];
         			var green=imageData.data[index+1];
        	 		var blue=imageData.data[index+2];
       	 			red = red+amount;
       	 			green = green+amount;
       	 			blue = blue+amount;
       	 			if(red>255) red=255;
			    	if(red<0) red=0;
			    	if(green>255) green=255;
			    	if(green<0) green=0;
			    	if(blue>255) blue=255;
			    	if(blue<0) blue=0;
        	 		imageData.data[index] = red;
  		      	 	imageData.data[index+1] = green;
        		 	imageData.data[index+2] = blue;
				}
			}
			return this;
		}		

		Chobi.prototype.vintage = function() {
		    var imageData = this.imageData;
		   	for(var i=0;i<imageData.width;i++){
				for(var j=0;j<imageData.height;j++){
					var index=(j*4)*imageData.width+(i*4);
					var red=imageData.data[index];
         			var green=imageData.data[index+1];
        	 		var blue=imageData.data[index+2];
       	 			red = green;
       	 			green = red;
       	 			blue = 150;
        	 		imageData.data[index] = red;
  		      	 	imageData.data[index+1] = green;
        		 	imageData.data[index+2] = blue;
				}
			}
			this.contrast(50);
			return this;
		}
		Chobi.prototype.crayon = function() {
			this.noise().contrast(500);
			return this;
		}
		Chobi.prototype.cartoon = function() {
			this.contrast(400);
			return this;
		}
		Chobi.prototype.canvas = null;
		Chobi.prototype.loadImageToCanvas = function(drawArea){
			if(drawArea==null&&this.canvas!=null){
				drawArea = this.canvas;
			}
			try{
				var imageData = this.imageData;
				var ctx = drawArea.getContext("2d");
				drawArea.width = imageData.width;
				drawArea.height = imageData.height;
				ctx.putImageData(imageData,0,0);
				return true;
			}
			catch(e){
				return false;
			}
			return this;
		}
		Chobi.prototype.getImage = function(){
			var tmpCanvas = document.createElement('canvas');
			var tmpctx = tmpCanvas.getContext('2d');
			tmpCanvas.width = this.imageData.width;
			tmpCanvas.height = this.imageData.height;
			tmpctx.putImageData(this.imageData,0,0);
			var img = document.createElement("img");
			img.src = tmpCanvas.toDataURL("image/png");
			return img;
		}
		Chobi.prototype.crop = function(x,y,width,height){
			if(x==""||y==""||width==""||height==""){
				console.log("Invalid crop parameters");
				return this;
			}
			if(x<0||y<0||x>this.imageData.width||y>this.imageData.height||(x+width)>this.imageData.width||(y+height)>this.imageData.height){
				console.log("Invalid crop parameters");
				return this;
			}
			var canvas = document.createElement("canvas");
			this.loadImageToCanvas(canvas);
		    var context = canvas.getContext("2d");
		    var data = context.getImageData(x, y, width, height);
		    this.imageData = data;
		    return this;
		}
		Chobi.prototype.vignette = function(scaleLevel){
				if(scaleLevel==""||scaleLevel==null){
				scaleLevel = 0.1;
				}
				var imgCntX = this.imageData.width/2;
				var imgCntY = this.imageData.height/2;
				var maxDis = Math.sqrt((imgCntY*imgCntY) + (imgCntX*imgCntX));
				var dis = Math.sqrt(((this.imageData.width/2-i)*(this.imageData.width/2-i))-((this.imageData.height/2-j)*(this.imageData.height/2-j)));

				for(var i=0;i<this.imageData.width;i++){
					for(var j=0;j<this.imageData.height;j++){
						var mix = this.getColorAt(i,j);
						var dis = Math.sqrt(Math.floor(Math.pow(i-imgCntY,2))+Math.floor(Math.pow(j-imgCntX,2)));
						mix.red = mix.red*(1-(1-scaleLevel)*(dis/maxDis));
		           		mix.green = mix.green*(1-(1-scaleLevel)*(dis/maxDis));
		           		mix.blue = mix.blue*(1-(1-scaleLevel)*(dis/maxDis));
						this.setColorAt(i,j,mix);
					}
				}
				return this;
		}
		Chobi.prototype.download = function(filename,filetype){
			if(filename==""){
				filename="untitled";
			}
			if(filetype==""){
				filetype = "png";
			}
			var imageData = this.imageData;
			var drawArea = document.createElement('canvas');
			var ctx = drawArea.getContext("2d");
			drawArea.width = imageData.width;
			drawArea.height = imageData.height;
			ctx.putImageData(imageData,0,0);
			var image = drawArea.toDataURL("image/"+filetype).replace("image/"+filetype, "image/octet-stream");
			var link = document.createElement('a');
	        if (typeof link.download === 'string') {
	             document.body.appendChild(link); // Firefox requires the link to be in the body
	             link.download = filename+"."+filetype;
	             link.href = image;
	             link.click();
	             document.body.removeChild(link); // remove the link when done
	        } else {
	             location.replace(uri);
	        }
			return true;
		}
