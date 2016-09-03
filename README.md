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
  
  __Then call various filter methods on the Chobi object__
  
      * __Black And White__ `imgObj.blackAndWhite()`
      * __Sepia__ `imgObj.sepia()`
      * __Negative__ `imgObj.negative()`
      * __Vintage__ `imgObj.vintage()`
      * __Cross Process_ `imgObj.crossProcess()`
      * __Brightness__ `imgObj.brightness(amount)`
      * __Contrast__ `imgObj.contrast(amount)`
    	* __Filter chaining is also possible__ `imgObj.brightness(-5).sepia().negative()`
    	
  __To load the Image to a canvas__
      Call the `loadImageToCanvas()` method on the Chobi object
  
  __To get an Image Element From the Chobi Object__
      Call the `getImage()` method on the Chobi object
      
  __To get the Image Data, like width, height and pixel information__
      Call the `extractImageData()` method on the Chobi object
      
  __To download the Chobi object as an image__
      Call the `download(filename)` meethod on the Chobi object
      
  
  ##For further implementation example, refer the demo.html file
