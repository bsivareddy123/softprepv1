<!DOCTYPE html>
<html ng-app="sample">
<head>
    <title>angular-toaster-sample!</title>
    <link href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../libs/angularjs-toaster/toaster.min.css" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js" ></script>
    <script src="http://code.angularjs.org/1.3.3/angular-animate.min.js" ></script>
    <script src="../libs/angularjs-toaster/toaster.min.js"></script>
    <script src="script.js"></script>
    <link href="style.css" rel="stylesheet" />
</head>
<body>

    <div ng-controller="HomeController" class="container" >
       
       <span>Simple Notifications:</span>
        <div class="rows">
            <div class="col-md-2"><button class="btn btn-primary" href ng-click="simple()">Simple notification</button></div>
            <div class="col-md-2"><button class="btn btn-warning" href ng-click="warning()">Warning notification</button></div>
            <div class="col-md-2"><button class="btn btn-success" href ng-click="success()">Success notification</button></div>
            <div class="col-md-2"><button class="btn btn-danger" href ng-click="error()">Error notification</button></div>
            <div class="col-md-2"><button class="btn btn-grimace" href ng-click="wait()">Wait notification</button></div>
            <div class="col-md-2"><button class="btn btn-primary" href ng-click="pop()">Link to other page</button></div>
        </div>
        <hr/> 
        <span>Addding Option from Script:</span>
        <div class="rows">
            <div class="col-md-6">
                <Span>With CLose button</span>
                <button class="btn btn-primary" href ng-click="close()">Close Button </button>
            </div>
            <div class="col-md-6">
                <Span>Fade after 1 Sec</span>
                <button class="btn btn-primary" href ng-click="timeout()">Html notification</button>
            </div>
        </div>
        <br/>
        <hr/>
        <span>Custom Notification and Body output type:</span>
        <div class="rows">
            <div class="col-md-3"><button class="btn btn-primary" href ng-click="Custom_temp()">Custom template</button></div>
            <div class="col-md-3"><button class="btn btn-primary" href ng-click="trusted_html()">Trusted HTML</button></div>
            <div class="col-md-3"><button class="btn btn-primary" href ng-click="default_temp()">Default Template</button></div>
            <div class="col-md-3"><button class="btn btn-primary" href ng-click="file_custom_temp()">Including file from Folder</button></div>
        </div>
        
        <!-- TO show the Notification Basic -->
        <toaster-container toaster-options="{'time-out': 3000,'position-class': 'toast-top-right'}"></toaster-container>


        <!-- If you Get Null values in your Function by defalut show this Template --> 
        <script type="text/ng-template" id="toasterBodyTmpl.html">
          <p>Null values ! Here is your default template</p>
        </script>
        
        <!-- Including Custom template -->
        <script type="text/ng-template" id="myTemplate.html">
            <div class="Custom_temp_html">
                <p>Hello this is my Customm Template</p>
            </div>
        </script>        

        <!-- Including Template as well as data from Script -->
        <script type="text/ng-template" id="myTemplateWithData.html">
          <p>Here it is! {{toaster.data}}</p>
        </script>

        <!-- Incuding File From another folder -->
        <script toaster-options="{'time-out': 3000,'position-class': 'toast-top-center','body-output-type': 'template'}" id="myTemplate" >
          <p>it is! </p>
        </script>

    </div>

</body>
</html> 