<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>ASCII Cam</title>
	<link rel="stylesheet" href="style.css" />
    <script>
        <?php
            echo 'var ipAddress = "' . gethostname() . '";'
        ?>
    </script>
	<script>
		var windowResize = function(){
			console.log("test test");
			$("trace").width = window.innerWidth-10;
			$("trace").height = window.innerHeight-10;
		}
	</script>
</head>
<body>
	<div class="body">

		<div id="asciiContainer" style="display:none;"><!---->
			<!-- The ascii art comes in the pre tag below -->
			<video id="cam" autoplay></video> 
			<canvas id="main"> </canvas>
			<div id="swatch">sample color</div>
			<div id="swatch2">average color</div>
			<div id="fndCol"></div>
			<div id="numBalls" style="font-size:xx-large;">0</div>
			<!-- <pre id="asciiText"></pre> -->
			<div style="clear:both;"></div>
			<div id="buttons"></div>
			
		</div>
	</div>
	<h1>Collect your Evidence!<h1>
	<div id="score" class="body">0</div>
	<div id="balls" class="body"></div>
	<h2 id="footer"></h2>

	<script src="webSockets.js"></script>
	<script src="smm_utils.js"></script>
	<script src="colors.js"></script>
	<script src="colorAverage.js"></script>
	<script src="colorBuffers.js"></script>
	<script src="colorIdent.js"></script>
	
</body>
</html>