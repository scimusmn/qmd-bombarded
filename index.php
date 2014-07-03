	<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>ASCII Cam</title>
	<link rel="stylesheet" href="style.css" />
    <script>
        <?php
            echo 'var ipAddress = "' . gethostname() . '";';
            echo 'var clientID = "' . uniqid() . '";';
        ?>
    </script>
	<script>
	</script>
</head>
<body>
	<div class="hidden">

		<div id="asciiContainer" style=""><!---->
			<!-- The ascii art comes in the pre tag below -->
			<canvas id="main"> </canvas>
			<div id="swatch">sample color</div>
			<div id="swatch2">average color</div>
			<div id="fndCol"></div>
			<div id="numBalls" style="font-size:xx-large;">0</div>
			<div id="colors" style="display:none;">
				<div class="color" id="blue" value="-1" color="64,163,234">Yikes! That information was misleading.</div>
				<div class="color" id="white" value="0" color="200,200,200">Wow! There's a lot of information out there...</div>
				<div class="color" id="orange" value="2" color="228,127,28">Excellent! You found some science-based information!</div>
			</div>
		</div>
		<audio id="intro" src="assets/audio/Bombarded_V2.mp3">
		  <!--<source  type="audio/mpeg">-->
		Your browser does not support the audio element.
		</audio>
        <audio id="outro" src="assets/audio/EndClip.mp3">
            Your browser does not support the audio element.
        </audio>
	</div>
	<div class="display">
        <div id="instruct"></div>
		<div id="title">Collect your Evidence!</div>
		<div id="scorebox" class="body">
			<div>Score:</div>
			<div id="score">0</div>
			<div id="footer"></div>
		</div>
		<div id="balls" class="body">
			<div id="blueDiv"></div>
			<div id="whiteDiv"></div>
			<div id="orangeDiv"></div>
			<div style="width: 100% height:10px display: inline-block;"></div>
		</div>
		<h2 id="footer"></h2>
		<canvas id="bgSpiral"></canvas>
		<canvas id="frame"></canvas>
		<div id="timerBox">
			<div>
				<div>Time Remaining:</div>
				<div id="timer">60</div>
			</div>
		</div>
	</div>
	<div id="countdown">
		<div>
			<span id="cdText">Get Ready!</span>
			<br>
			<span id="skipNote">Press button again to skip</span>
		</div>
	</div>

    <div id="winBox">
        <div>
            <span id="winText">Get Ready!</span>
        </div>
    </div>

	<script src="src/camera.js"></script>
	<script src="src/webSockets.js"></script>
	<script src="src/smm_utils.js"></script>
	<script src="src/colors.js"></script>
	<script src="src/colorAverage.js"></script>
	<script src="src/colorBuffers.js"></script>
	<script src="src/background.js"></script>
	<script src="src/colorTest.js"></script>
	<script src="src/overlayDiv.js"></script>
	<script src="src/interfaceElements.js"></script>
	<script src="src/arduinoControl.js"></script>
	<script src="src/interface.js"></script>
	
</body>
</html>