var version = "1.8.7-bloxd midroll ads fix";
console.log("cmgAds cmg-ads.js loaded", version);

// Add styles
const styles = `
/* General Styles */
.ads-popup {
  font-family: "Helvetica Neue", "Arial Nova", Helvetica, Arial, sans-serif!important;
}

/* Hidden Elements */
.ads-popup, .ad-container, #img-button-self {
  display: none;
}

/* Ads Popup and Container Styles */
.ads-popup, .ad-container {
  position: relative;
  z-index: 10;
}

.ads-popup {
  position: absolute;
  left: 0;
  top: 0;
  z-index:111111;
  background: #000000;
  height: 100vh;
  width: 100%;
}

.ad-container {
  height: 100%;
}

.ad-container.flex-center {
  display: flex !important;
  justify-content: center;
 // align-items: center;
}

.ad-container > div iframe {
 // position:unset;
}

/* Preloader Styles */
#afg_preloader {
  display: flex;
  justify-content: center;
 // align-items: center;

}

/* Container123 Styles */
#container123 {
  width: 640px;
  height: 480px;
}

/* Nested div inside ad-container */
.ad-container > div {
  width: 100%;
  height: 100%;
  position: absolute;
}

/* Link Styles */
#timer_div a, .timer-div a, .continue-lnk-container-rsection, .continue-link-yellow, #continue-link {
  color: #000;
}

.continue-lnk-container-rsection, .continue-link-yellow {
  font-size: 16px;

}

.timer-div {
  margin-left: 5px;
}

/* Continue Container Styles */
#continue-container, .continue-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  bottom: 0;
  z-index: 10;
  min-width:160px;
  background: #ffe420;
  border-radius: 5px;
  font-weight: 500;
  color: #000;
  height: 20px;
  padding: 5px;
  text-align:center;
}

/* Continue Link Yellow Styles */
.continue-link-yellow {
  text-decoration: none;
  background: #ffe420;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  height: 20px;
  position: absolute;
  left: 15px;
  top:0;
  display:block;
  padding: 5px;
  text-align:center;
}

.continue-link-yellow:active::before {
  opacity: 1;
  transform: translate(2px, 1px);
  box-shadow: none;
}

/* AFG Container Styles */
#afg_container {
  text-align: center;
  width: 100vw;
  height: 100vh;
}

#afg_container .load-wrap {
  width: 100%;
  padding-top: 50px;
  margin-bottom: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

#afg_container .load-wrap .loadingText {
  display: block;
  font-size: 20px;
  margin-top: 46px;
  color: #fff;
  text-align: center;
}

#afg_container .load-wrap .circle {
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-left: 20px;
  border-radius: 50%;
  animation: afg_container_loading 1.6s infinite;
  vertical-align: middle;
}

#afg_container .load-wrap .circle:first-child {
  animation-delay: 0.1s;
  background: #f8eb13;
}

#afg_container .load-wrap .circle:nth-child(2) {
  animation-delay: 0.3s;
  background: #29bffd;
}

#afg_container .load-wrap .circle:nth-child(3) {
  animation-delay: 0.5s;
  background: #f3733b;
}

#afg_container .load-wrap .circle:nth-child(4) {
  animation-delay: 0.7s;
  background: #65efbd;
}

/* Loading Animation */
@keyframes afg_container_loading {
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

/* Play Now Button Styles */
.playNow {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
}

.playWrapper {
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  position: absolute;
}

#playAdsNowButton {
  width: 88px;
  height: 88px;
  position: absolute;
  z-index: 10000;
  transform: translate(-50%, -50%);
  text-align: center;
  /* Correct the positioning */
  left: 50%;
  top: 50%;
}

#playAdsNowButton h4 {
  color: #fff;
}

#playAdsNowButton::before {
  animation: playPulse 2s infinite;
  background: #fff;
  border-radius: 50%;
  content: "";
  height: 118%;
  left: -9%;
  position: absolute;
  top: -9%;
  width: 118%;
  z-index: -1;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Add drop shadow */
}

#playAdsNowButton::after {
  background: #56eeb7;
  border-radius: 50%;
  content: "";
  height: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
}

#playAdsNowButton svg{
  height: 34px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: scaleX(1.1) translate(-50%, -50%);
  width: 40px;
  z-index: 2;
}

@keyframes playPulse {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
`;

var styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

var adBreakInterval = 180000; // Change to 180000 for live
if(/mine-escape/.test(window.location.href)) {  //Mr Mine Escape
	adBreakInterval = 10;
}
if(/0-clicker-heroes-escape/.test(window.location.href)) {  //Mr Mine Escape
  adBreakInterval = 10;
}


var gameInterstitialAdTimerDone = false;
var gameInterstitialAdTimer;
var adLoadedTimer;
var justAMomentLoaderTimer;
// Ad URL Production
var adTagUrl = "https://pubads.g.doubleclick.net/gampad/ads?iu=/137548614/1023174/71134/1023174-71134-video&description_url=https%3A%2F%2Fwww.coolmathgames.com%2F&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x480&unviewed_position_start=1";
//Test ad URL Development
//adTagUrl = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=";
var isRewardAd = false;
var cmgAInvD = false;
var adsManager;
var reInitCounter = 0;



var validSubscriber = false;
window.addEventListener('message', function(event) {
    console.log("Message received from the parent: " + event.data);
    if(/(www|stage|stage-edit|dev|stage2).coolmathgames.com/i.test(event.origin) && event.data == "valid-subscriber") {
	    validSubscriber = true;
	    console.log("CMGAdBreak - Premium Subscriber");
    }
});

console.log("cmg Not subbed user, loading ads.");

$.fn.once = function (processed_class) {
  if (typeof processed_class == "undefined") {
    processed_class = "processed";
  }
  return this.not("." + processed_class).addClass(processed_class);
};

function adBreakRequestInit() {
  adBreakInterval = 1000;
  gameInterstitialAdTimerDone = true;

  // Reset the timer
  gameInterstitialAdTimer = setTimeout(function () {
    currentTime = new Date();
    console.log();
  }, adBreakInterval);
}

function adBreakRequest() {
  if (window.parent && window.parent.document) {

    if (window.parent.document.readyState === 'complete') {

    } else {
      window.parent.addEventListener('load', () => {

      });
    }
  }
}

function adBreakRequestInit() {
  adBreakInterval = 1000;
  gameInterstitialAdTimerDone = true;
}

function adBreakRequest() {
  if (window.parent && window.parent.document) {
      adBreakRequestInit();
      cmgAdBreak();
    }
  }

function gameInterstitialAdTimerAction() {
  console.log("cmg gameInterstitialAdTimerAction called");
  gameInterstitialAdTimerDone = true;
  clearGameInterstitialAdTimer();
}

function clearGameInterstitialAdTimer() {
  console.log("cmgAdBreak: timer completed, ready to display the ad next time");
  clearTimeout(gameInterstitialAdTimer);
  gameInterstitialAdTimer = null;
}

function init() {
  var script = document.createElement("script");
  script.src = "https://cdn.intergi.com/prebid/cmg-prebid.js";
  script.async = false;
  document.head.appendChild(script);
  var script2 = document.createElement("script");
  script2.src = "https://cdn.intergi.com/cmg/cmg-headerbidding.js";
  script2.async = false;
  document.head.appendChild(script2);
  var script3 = document.createElement("script");
  script3.src = "https://imasdk.googleapis.com/js/sdkloader/ima3_debug.js";
  script3.async = false;
  document.head.appendChild(script3);
  console.log("cmgAdBreak initialized");
  window.top.postMessage("midroll initialized", "*"); //for game qa page
 // Start the timer
 gameInterstitialAdTimer = setTimeout(function () {
    currentTime = new Date();
    gameInterstitialAdTimerAction();
  }, adBreakInterval);
}

function createAdsLoadingPopup() {
  console.log("cmg Creating Ads Loading Popup...");
  var popupContent = $(
    '<div class="ads-popup"><div id="afg_container"><div class="load-wrap">' +
      '<div class="circle"></div><div class="circle"></div>' +
      '<div class="circle"></div><div class="circle"></div>' +
      '<h3 class="loadingText">Just a moment while your content loads</h3>' +
      "</div></div></div>"
  );
  return popupContent;
}

function createPreloaderAndGameContainer() {
  console.log("cmgAdBreak Creating Preloader and Game Container...");
  var html =
    "<!--Start of Preloader call -->" +
    '<div id="afg_preloader" >' +
    '<div id="container123">' +
    '<div id="videoplayer"></div>' +
    '<div id="adcontainer" class="ad-container"></div>' +
    "</div>" +
    "</div>" +
    "<!-- Continue to Game container with timer -->" +
    '<div id="continue-container"  style="display:none">' +
    '<div id="img-button-container">' +
    '<div id="img-button-self" class="img-button"></div>' +
    '<div class="continue-lnk-container-rsection">' +
    '<span id="continue-link">Continue in </span>' +
    '<span id="timer_div" class="timer-div">8</span>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  return html;
}

$(document).ready(function () {
  console.log("cmg Document is ready, loading ad window...");
  const adsLoadingPopup = createAdsLoadingPopup();
  const preloaderAndGameContainer = createPreloaderAndGameContainer();
  $("body").prepend(adsLoadingPopup);
  $(".ads-popup").prepend(preloaderAndGameContainer);
});

function reInit() {
  console.log("cmg Re-initializing ad window...");
  const adsLoadingPopup = createAdsLoadingPopup();
  const preloaderAndGameContainer = createPreloaderAndGameContainer();
  $("body").prepend(adsLoadingPopup);
  $(".ads-popup").prepend(preloaderAndGameContainer);
}

init();
var initialWidth = window.innerWidth; // Store the initial width
var initialHeight = window.innerHeight; // Store the initial height
var isMobile; // Variable to store if the device is mobile

function isMobileDevice() {
  console.log("cmg is mobile device Function called");
  let isMobileDevices = /Android|iPhone/i.test(navigator.userAgent);
  let isSmallScreen = $(window).width() <= 640 || $(window).height() <= 500;
  let isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);

  if (isTablet && $(window).width() > 640 && $(window).height() > 500) {
    // Tablet with enough space for larger ad
    return false;
  } else {
    // Mobile device or tablet with small screen
    return isMobileDevices && isSmallScreen;
  }
}


// Initialize the isMobile variable
isMobile = isMobileDevice();
function getGameDimensions() {
  var gameIframe = document.getElementById('html5game');
  if (gameIframe) {
    return {
      width: gameIframe.clientWidth,
      height: gameIframe.clientHeight
    };
  }
  return null;
}

function sendResizeMessage(width, height) {
  if (width === undefined || height === undefined) {
    var gameDimensions = getGameDimensions();
    if (gameDimensions) {
      width = gameDimensions.width;
      height = gameDimensions.height;
      console.log("cmg Using game dimensions:", width, "x", height);
    } else {
      if (isMobile) {
        // Check if the mobile device has a larger screen
        if (initialWidth > 640 && initialHeight > 500) {
          // Use larger ad size for larger mobile screens
          width = 640;
          height = 480;
          console.log("cmg Using larger ad size for larger mobile screens:", width, "x", height);
        } else {
          // Default mobile ad size
          width = 300;
          height = 250;
          console.log("cmg Using default mobile ad size:", width, "x", height);
        }
      } else {
        // Default desktop ad size
        width = 640;
        height = 480;
        console.log("cmg Using default desktop ad size:", width, "x", height);
      }
    }
  }

  window.parent.postMessage(
    { action: "resize", width: width, height: height },
    "*"
  );
  console.log("cmg Resize message sent.", width, "x", height);
}
// Function to swap width and height
function swapWidthHeight() {
  var tempWidth = window.innerWidth;
  var tempHeight = window.innerHeight;
  initialWidth = tempHeight;
  initialHeight = tempWidth;
}

function resetToOriginalSize() {
  console.log("cmg Resetting to initial size:", initialWidth, "x", initialHeight);
  sendResizeMessage(initialWidth, initialHeight);
}

// Event listener for orientation change
window.addEventListener('orientationchange', function() {
  console.log("Orientation changed. Resizing the ad.");
  swapWidthHeight();

  // Resize the ad based on the current orientation
  var currentWidth = window.innerWidth;
  var currentHeight = window.innerHeight;
  sendResizeMessage(currentWidth, currentHeight);
});

const adBreakComplete = new CustomEvent("adBreakComplete");
const adBreakStart = new CustomEvent("adBreakStart");

function removeMidrollAndReinit() {
  console.log("cmgAdBreak removeMidrollAndReinit called");
  //clear the timers if any
  clearTimeout(justAMomentLoaderTimer);

  $(".ads-popup").remove();
  reInitCounter++;

  handleAdBreakComplete();

  gameInterstitialAdTimerDone = false;
  gameInterstitialAdTimer = setTimeout(function () {
    currentTime = new Date();
    console.log("cmgAdBreak starting the timer at: " + currentTime);
    gameInterstitialAdTimerAction();
  }, adBreakInterval);

  gameInterstitialAdTimerDone = false;
  if (typeof adsManager != "undefined" && adsManager) {
    adsManager.destroy();
  }

  //add focus back to game if the game is implemented with canvas
  if (document.getElementById("canvas") != null) {
    document.getElementById("canvas").focus();
  }

  if(typeof isRewardAd != "undefined" && isRewardAd){
    window.top.postMessage("reward completed", "*"); //for game qa page
  }else{
    window.top.postMessage("midroll completed", "*"); //for game qa page
  }
  resetToOriginalSize();
}

// Callback when AdsManager is loaded
function onAdsManagerLoaded(adsManagerLoadedEvent) {
  adsManager = adsManagerLoadedEvent.getAdsManager(videoContent); // Make sure videoContent is correctly referenced
  adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,onAllAdsCompleted);
}

window.cmgRewardAds = function () {
  isRewardAd = true;
  //gameInterstitialAdTimerAction();
  cmgRewardsAdBreak();
};

cmgAInvD = false;

function cmgAdBreak() {
  if(validSubscriber) {   //iframed games recieves valid-subscriber post message from parent if the user is premium subscriber
	  handleAdBreakComplete();
	  return;
  }
  if (/(www|stage|stage-edit|dev|stage2).coolmathgames.com/i.test(window.location.hostname)) { //for all the games that are uploaded to coolmathgames (not iframed multiplayer games)
	if(validSubscriber || window.parent.document.body.classList.contains('subscribed-users')) {
	  console.log("cmg premium subscriber - skipping ad break");
	  handleAdBreakComplete();
	  return;
    }
  }
  console.log("cmgAdBreak called");
  isRewardAd = false; // Set to false for regular ads
  
  //Bloxd-io specific logic:  display Midroll ads without waiting for the first time as we are not displaying preroll ads
  if(/bloxd/.test(window.location.href) && reInitCounter < 1) {  //Bloxd-io 
	gameInterstitialAdTimerDone = true;
  }
  if (typeof gameInterstitialAdTimerDone != "undefined" && gameInterstitialAdTimerDone) {
    document.dispatchEvent(adBreakStart);
  } else {
    handleAdBreakComplete();
    console.log("cmgAdBreak: Too early to invoke midroll ads, wait for " + adBreakInterval + " milliseconds");
    return;
  }

  if (shouldReinitialize()) reInit();
  commonAdBreakLogic();
  adBreakSpecificLogic();
  sendResizeMessage();
  setupAdInteraction();
}


function cmgRewardsAdBreak() {
  console.log("cmgAdBreak cmgRewardsAdBreak called");
  window.top.postMessage("reward called", "*"); //for game qa page
  if (shouldReinitialize()) reInit();
  $(".load-wrap").show();
  adRewardsBreakSpecificLogic();
  startMidRollRewardAd();
  prepareAdDisplayElements();
  sendResizeMessage();
  isRewardAd = true; // Set the flag when loading a rewards ad
}

function onAllAdsCompleted() {
  removeMidrollAndReinit(); // Call your function to handle the end of the ad
  isRewardAd = false; // Reset the flag
}

function commonAdBreakLogic() {
  window.top.postMessage("midroll called", "*"); //for game qa page
}

function adBreakSpecificLogic() {
  midRollAdStarted = true;
  midroll_ads_timer = 8; // 8 seconds timer
  cmgAInvD = false;

  $(".ads-popup").show();
  $("#adcontainer").addClass("ad-container flex-center");
  $("#timer_div a").addClass("timer-div");
  $("#continue-container").addClass("continue-container");
  $("#img-button-self").html("&nbsp;");
  $("#timer_div").addClass("continue-button-link");
  $("#afg_container").css({ "z-index": 2 });
  $("#afg_container .load-wrap").html("");
  $("#afg_container").addClass("top-continue-btn");
  $("#afg_preloader").show();
  $("#continue-container").show();
  $("#continue-link").text("Skip Ad in");
  $(".continue-button-link").text(midroll_ads_timer); //8 seconds timer
  var swf_game_url = $("#swfgame").attr("src");
  var auctionCallback = function (displayAds, videoUrl) {
    application = new Application(displayAds, videoUrl);
  };

  if (!cmgAInvD) {
    cmgAInvD = true;
    var parentURL =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href;
    var gameURL = parentURL.split("/")[3];
    console.log(new Date() + " CMGAds Midroll Ads inside game: window.PW_CMG.startAuction...." + gameURL);
    if (typeof window.PW_CMG !== "undefined") {
      window.PW_CMG.startAuction(
        auctionCallback,
        undefined,
        gameURL,
        undefined
      );
    }
  }
  startAdTimer();
}

function adRewardsBreakSpecificLogic() {
  midRollAdStarted = true;
  midroll_ads_timer = 30; // 30 seconds timer
  document.dispatchEvent(adBreakStart);
  cmgAInvD = false;

  $(".ads-popup").show();
  $("#adcontainer").addClass("ad-container");
  $("#img-button-self").html("&nbsp;");
  $("#afg_container").css({ "z-index": 2 });
  $("#afg_container").addClass("top-continue-btn");
  $("#afg_preloader").show();
  $("#afg_container .load-wrap").show();

  //destroy Just a moment loaded if the Ad Load event doesnot fire in 8 seconds
  justAMomentLoaderTimer = setTimeout(() => {
    if (typeof is_ad_loaded != "undefined" && !is_ad_started) {
      console.log("cmgAdBreak Ad did not load in 8 seconds so removing it...");
      removeMidrollAndReinit(); //remove  midroll or rewarded ads
    } else {
      console.log( "cmgAdBreak Ad is loaded in 8 seconds so not removing the justamomnetloader/ad container..."
      );
    }
  }, 8000);

  var auctionCallback = function (displayAds, videoUrl) {
    application = new Application(displayAds, videoUrl);
  };

  // Start the CMG auction using the reusable function
  if (!cmgAInvD) {
    cmgAInvD = true;
    var parentURL =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href;
    var gameURL = parentURL.split("/")[3];
    console.log("cmg  new Date() + ' CMGAds Rewarded Ads inside game: window.PW_CMG.startAuction....' +  gameURL");

    if (typeof window.PW_CMG !== "undefined") {
      window.PW_CMG.startAuction(
        auctionCallback,
        undefined,
        gameURL,
        isRewardAd || undefined
      );
    }
  }
}

function startAdTimer() {
  var seconds_left = midroll_ads_timer;
  var midrollIntervalId = setInterval(function () {
    seconds_left--;
    $(".continue-button-link").html(seconds_left);
    if (seconds_left <= 0) {
      clearInterval(midrollIntervalId);
      updateAdCompletionUI();
    }
  }, 1000);
}

function updateAdCompletionUI() {
  if ($(".continue-button-link ") != null) {
    $("#continue-link").each(function () {
      $(".continue-lnk-container-rsection #continue-link").text("");
      $(this).html("");
    });
    $(".continue-button-link").html(
      '<a href="javascript:removeMidrollAndReinit();" class="continue-link-yellow">Return to Game <span>&#x25BA;</span></a>'
    );
  }
}

function isAdTimingValid() {
  return (
    typeof gameInterstitialAdTimerDone !== "undefined" &&
    gameInterstitialAdTimerDone
  );
}

function handleAdBreakComplete() {
  document.dispatchEvent(adBreakComplete);
}

function shouldReinitialize() {
  return reInitCounter > 0;
}

function startMidRollAd() {
  midRollAdStarted = true;
  midroll_ads_timer = 8;
  cmgAInvD = false;
  $(".ads-popup").show();
}

function startMidRollRewardAd() {
  midRollAdStarted = true;
  cmgAInvD = false;
  $(".ads-popup").show();
}

function prepareAdDisplayElements() {
  $("#img-button-self").html("&nbsp;");
  $("#timer_div").addClass("continue-button-link");
  $("#afg_container").addClass("top-continue-btn");
}

function setupAdInteraction() {
  $("#afg_preloader").show();
  $("continue-lnk-container-rsection").remove();
  var swf_game_url = $("#swfgame").attr("src");
  setupAuctionCallback();
}

function setupAuctionCallback() {
  const auctionCallback = function (displayAds, videoUrl) {
    application = new Application(displayAds, videoUrl);
  };

  if (!cmgAInvD) {
    cmgAInvD = true;
    const parentURL =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href;
    const gameURL = parentURL.split("/")[3];
    console.log(new Date() +" cmgRewardsAdBreak Midroll inside game: window.PW_CMG.startAuction..." + gameURL );

    if (typeof window.PW_CMG !== "undefined") {
      window.PW_CMG.startAuction(auctionCallback, undefined, gameURL);
    }
  }
}

function addPlayButtonToAdPopup() {
  const playAdsNowButtonHtml = `
    <a href="/play" class="playNow" >
    <div class="playWrapper">
      <div id="playAdsNowButton">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"></path>
        </svg>
        </div>
      </div>
    </a>
    `;
  $(".load-wrap").remove();
  $(".top-continue-btn").remove();
  $(".ads-popup").prepend(playAdsNowButtonHtml);
  $(".ad-container").addClass("flex-center");
  $(".playNow")
    .off("click")
    .on("click", function (e) {
      $(".playNow").remove();
      e.preventDefault();
      console.log("cmg Play button clicked");
      if (adsManager) {
        adsManager.resume();
        //show the ad container
        $(".ad-container").show();
       console.log("cmg Ad remaining time: " + adsManager.getRemainingTime());
        var currentAd = adsManager.getCurrentAd();
        if (
          typeof currentAd != "undefined" &&
          !adsManager.getCurrentAd().isLinear()
        ) {
          //non linear Ad, destroy after 8 seconds
          var nonLinearAdTimer = setTimeout(() => {
            console.log("cmgAdBreak Ad is non-linear so destroying in 5 seconds...");
            removeMidrollAndReinit(); //remove  midroll or rewarded ads
          }, 5000);
        }
        if (adsManager.getCurrentAd() && adsManager.getCurrentAd().isLinear()) {
        }

       console.log("cmg Ad resumed by user");
      }
    });
}

var pagepreRollType = "";
var Application = function (displayAds, adTagUrl, preRollType) {
  if (typeof preRollType == "undefined") {
    //desktop
    preRollType = "";
  } else {
    pagepreRollType = preRollType;
  }
  this.playing_ = false;
  this.adsActive_ = false;
  this.adsDone_ = false;
  if (typeof displayAds === "undefined" || displayAds === null) {
    this.displayAds = true;
  } else {
    this.displayAds = displayAds;
  }
  this.adTagUrl_ = adTagUrl;
  this.videoPlayer_ = new VideoPlayer(preRollType);

  console.log("cmg Checking mobile device status...");
  var isMobile = isMobileDevice();
  console.log("cmg Is mobile device:", isMobile);

  if (isMobile) {
    // If it's a mobile device, set dimensions for mobile
    this.videoPlayer_.width = 300;
    this.videoPlayer_.height = 250;
  } else {
    // For non-mobile devices (including tablets with enough space), set larger dimensions
    this.videoPlayer_.width = 640;
    this.videoPlayer_.height = 480;
  }


  this.ads_ = new Ads(this, this.videoPlayer_);
  this.ads_.initialUserAction();
  // if (isRewardAd) {
  console.log("cmg Rewards ad break: Pausing the game");
  // }
  this.videoPlayer_.preloadContent(this.bind_(this, this.loadAds_));
  this.adsDone_ = true;
};

Application.prototype.bind_ = function (thisObj, fn) {
  return function () {
    fn.apply(thisObj, arguments);
  };
};

Application.prototype.loadAds_ = function () {
  this.ads_.requestAds(this.adTagUrl_);
};

var VideoPlayer = function (preRollType) {
  this.contentPlayer = document.getElementById(preRollType + "content123");
  this.adContainer = document.getElementById(preRollType + "adcontainer");
  this.videoPlayerContainer_ = document.getElementById(
    preRollType + "videoplayer"
  );
  this.width = 640;
  this.height = 480;
};

VideoPlayer.prototype.preloadContent = function (contentLoadedAction) {
  contentLoadedAction();
};
VideoPlayer.prototype.play = function () {
  this.contentPlayer.play();
};

VideoPlayer.prototype.pause = function () {
  console.log("cmg Pausing video. Current contentPlayer:", this.contentPlayer);
  if (this.contentPlayer) {
    this.contentPlayer.pause();
  }
  else {
    //console.error("cmg Cannot pause video. contentPlayer is null.");
  }
};

var Ads = function (application, videoPlayer) {
  this.application_ = application;
  this.videoPlayer_ = videoPlayer;
  this.customClickDiv_ = document.getElementById("customClick");
  this.contentCompleteCalled_ = false;
  google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
  this.adDisplayContainer_ = new google.ima.AdDisplayContainer(
    this.videoPlayer_.adContainer,
    this.videoPlayer_.contentPlayer,
    this.customClickDiv_
  );
  this.adsLoader_ = new google.ima.AdsLoader(this.adDisplayContainer_);
  this.adsManager_ = null;

  this.adsLoader_.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    this.onAdsManagerLoaded_,
    false,
    this
  );
  this.adsLoader_.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    this.onAdError_,
    false,
    this
  );
};

Ads.prototype.initialUserAction = function () {
  this.adDisplayContainer_.initialize();
  if (
    typeof this.videoPlayer_ != "undefined" &&
    typeof this.videoPlayer_.contentPlayer != "undefined" &&
    this.videoPlayer_.contentPlayer != null
  ) {
    this.videoPlayer_.contentPlayer.load();
  }
};

Ads.prototype.requestAds = function (adTagUrl) {
  const adsRequest = new google.ima.AdsRequest();
  if (isRewardAd) {
    adsRequest.setAdWillAutoPlay(false);
    adsRequest.setAdWillPlayMuted(false);
  }
  adsRequest.adTagUrl = adTagUrl;
  adsRequest.linearAdSlotWidth = this.videoPlayer_.width;
  adsRequest.linearAdSlotHeight = this.videoPlayer_.height;
  adsRequest.nonLinearAdSlotWidth = this.videoPlayer_.width;
  adsRequest.nonLinearAdSlotHeight = this.videoPlayer_.height;
  this.adsLoader_.requestAds(adsRequest);
};

Ads.prototype.onAdsManagerLoaded_ = function (adsManagerLoadedEvent) {
  console.log("cmg Ads loaded");
  var adsRenderingSettings = new google.ima.AdsRenderingSettings();
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

  this.adsManager_ = adsManagerLoadedEvent.getAdsManager(
    this.videoPlayer_.contentPlayer,
    adsRenderingSettings
  );
  adsManager = this.adsManager_;

  this.adsManager_.addEventListener(
    google.ima.AdEvent.Type.STARTED,
    () => {
      if (!isRewardAd) {
        this.adsManager_.resume();
        //show the Ad
        $(".ad-container").show();
        console.log("cmgAdBreak play on start");
      } else {
        //rewardAds
        this.adsManager_.pause();
        addPlayButtonToAdPopup();
      }
    },
    false,
    this
  );

  this.adsManager_.setVolume(0);
  if (isRewardAd) {
    this.adsManager_.setVolume(1);
  }
  this.processAdsManager_(this.adsManager_);
  adsManager = this.adsManager_;
};

Ads.prototype.processAdsManager_ = function (adsManager) {
  if (adsManager.isCustomClickTrackingUsed()) {
    this.customClickDiv_.style.display = "table";
  }
  adsManager.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    this.onAdError_,
    false,
    this
  );

  const events = [
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    google.ima.AdEvent.Type.COMPLETE,
    google.ima.AdEvent.Type.FIRST_QUARTILE,
    google.ima.AdEvent.Type.LOADED,
    google.ima.AdEvent.Type.MIDPOINT,
    google.ima.AdEvent.Type.STARTED,
    google.ima.AdEvent.Type.THIRD_QUARTILE,
    google.ima.AdEvent.Type.USER_CLOSE,
    google.ima.AdEvent.Type.PAUSED,
  ];
  events.forEach((eventType) => {
    adsManager.addEventListener(eventType, this.onAdEvent_, false, this);
  });

  adsManager.init(
    this.videoPlayer_.width,
    this.videoPlayer_.height,
    google.ima.ViewMode.NORMAL
  );

  adsManager.start();
  console.log("cmg AdsManager started");
};

window.is_ad_loaded = false;
window.is_ad_started = false;

Ads.prototype.onAdEvent_ = function (adEvent) {
  console.log("cmg Preroll adEvent type: ${adEvent.type} --> ${new Date()}");

  if (adEvent.type === google.ima.AdEvent.Type.STARTED) {
    console.log("cmg Ad STARTED event triggered. Calling sendResizeMessage...");
    sendResizeMessage();

    window.parent.postMessage("adBreakStart", "*");
  } else if (
    adEvent.type === google.ima.AdEvent.Type.COMPLETE ||
    adEvent.type === google.ima.AdEvent.Type.ALL_ADS_COMPLETED ||
    adEvent.type === google.ima.AdEvent.Type.USER_CLOSE
  ) {
    console.log("cmg Ad completed or user closed. Preparing to resize back to original dimensions: " +     initialWidth +"x" + initialHeight +".");
    sendResizeMessage(initialWidth, initialHeight);

    window.parent.postMessage("adBreakComplete", "*");
  }

  switch (adEvent.type) {
    case google.ima.AdEvent.Type.LOADED:
      console.log("cmgAdBreak AdEvent type Loaded fired - starting 8 second timer to kill the Ad if it is not started" );
      is_ad_loaded = true;
      clearTimeout(justAMomentLoaderTimer);
      //create a 8 second timer to see if the ad is started otherwise destroy the Ad and load the game.
      adLoadedTimer = setTimeout(() => {
        if (typeof is_ad_started != "undefined" && !is_ad_started) {
          console.log("cmgAdBreak Ad did not start in 8 seconds so removing it..." );
          removeMidrollAndReinit(); //remove  midroll or rewarded ads
        }
      }, 8000);
      ["#content123", "#m-content123", "#r-content123"].forEach((selector) => {
        const element = $(selector);
        if (element.length && element.is(":visible")) {
          element.hide();
        }
      });
      break;
    case google.ima.AdEvent.Type.STARTED:
      console.log( "cmgAdBreak AdEvent type Started fired - clearing Loader Timer");
      console.log("cmgAdBreak AdEvent type Started fired - clearing Loader Timer");
      is_ad_started = true;
      clearTimeout(adLoadedTimer);

      // Resize the ad based on the current orientation
      var currentWidth = window.innerWidth;
      var currentHeight = window.innerHeight;
      sendResizeMessage(currentWidth, currentHeight);
      console.log("cmgAdBreak AdEvent type Started fired - resized to " + currentWidth + "x" + currentHeight);
      break;
    case google.ima.AdEvent.Type.COMPLETE:
    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
    case google.ima.AdEvent.Type.USER_CLOSE:
      if (typeof midRollAdStarted !== "undefined" && midRollAdStarted) {
        removeMidrollAndReinit();
        window.is_ad_loaded = false;
        window.is_ad_started = false;
      }
      break;
  }
};

Ads.prototype.onAdError_ = function (adErrorEvent) {
  console.log("cmg Ad error: " + adErrorEvent.getError());
  if (this.adsManager_) {
    this.adsManager_.destroy();
  }
  if (typeof midRollAdStarted !== "undefined" && midRollAdStarted) {
    removeMidrollAndReinit();
  }
};
