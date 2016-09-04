# chobi
The Image Processing Library made in pure Javascript

##Usage

  __Include the Javascript file like this__
  
  `<script type="text/javascript" src="src/Chobi.min.js></script`
  
  __Then make a new object of Chobi__
  
The Chobi constructor takes 4 types of parameters
* Input type[file] element
    `var imgObj = new Chobi(document.getElementById("image-file");`
* Path to image file
    `var imgObj = new Chobi("myimage.jpg");`
* Image Object
    `var imgObj = new Chobi(new Image(...));`
* IMG Element
        `var imgObj = new Chobi(document.getElementById('myimg');`


__To execute a function whenever the Chobi object is loaded__

__Call the ready(callback) method__ 
`imgObj.ready(function(){this.loadImageToCanvas(document.getElementById("canvas"));}`

__To set the default canvas element__ `imgObj.canvas = document.getElementById("canvas")`
Then you can directly call `loadImageToCanvas()` method without any parameters, and it will load the image to the default canvas
  


__Then call various filter methods on the Chobi object__
- Black And White `imgObj.blackAndWhite()`
- Sepia `imgObj.sepia()`
- Negative `imgObj.negative()`
- Vintage `imgObj.vintage()`
- Cross Process`imgObj.crossProcess()`
- Brightness `imgObj.brightness(amount)`
- Contrast `imgObj.contrast(amount)`
- Crop `imgObj.crop(xCord,yCord,width,height)`
- Filter chaining is also possible `imgObj.brightness(-5).sepia().negative()`


    	
__To load the Image to a canvas -__ Call the `loadImageToCanvas()` method on the Chobi object
  
__To get an Image Element From the Chobi Object -__ Call the `getImage()` method on the Chobi object
      
__To get the Image Data, like width, height and pixel information -__ Call the `extractImageData()` method on the Chobi object
      
__To download the Chobi object as an image -__ Call the `download(filename)` meethod on the Chobi object

__To make your own filter you may use the following methods__

`imgObj.getColorAt(x,y)` to __get the r,g,b,a values at the x,y coordinate__
`imgObj.setColorAt(x,y,colorObj)` to __set the Color at x,y coordinate with colorObj__. ColorObj has the following format {red: redValue, green: greenValue, blue: blueValue, alpha: alphaValue}
`imgObj.imageData.width` to get the __width__ of the image
`imgObj.imageData.height` to get the __height__ of the image
      
  
##For further implementation example, refer the demo.html file
