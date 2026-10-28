    /**********************************************************************************/
    /*This prototype together with the Match prototype handles the announcing of round*/
    /**********************************************************************************/
    var CreateFaceoff = function(match)
    {
        var match_ = match;
        var showedFaceoff_ = false;
        var announcedNewRound_ = false;
        var startedRound_ = false;
        var areNamesHidden_ = true;
        var faceoffSound_ = "audio/misc/faceoff.zzz";

        var Faceoff = function()
        {
            this.FaceoffElement = null;
            this.TeamAFaceoffElement = null;
            this.TeamBFaceoffElement = null;
            this.TeamANameElement = null;
            this.TeamBNameElement = null;
            this.VsElement = null;

            this.MaxAngle = 360;
            this.MaxScale = 1;

            this.Angle = 0;
            this.Scale = 0;

            var nbFrames = 20;

            this.rotateUpFn = (function(max,inc) { return function(t,value) { return Math.min(value + (max/nbFrames), max); } })(this.MaxAngle);
            this.rotateDownFn = (function(max,inc) { return function(t,value) { return Math.max(value + (max/nbFrames), 0); } })(this.MaxAngle);
            this.scaleUpFn = (function(max,inc) { return function(t,value) { return Math.min(value + (max/nbFrames), max); } })(this.MaxScale);
            this.scaleDownFn = (function(max,inc) { return function(t,value) { return Math.max(value - (max/nbFrames), 0); } })(this.MaxScale);
        }

        Faceoff.prototype.setTeamA = function(name)
        {
            spriteLookup_.set(this.TeamAFaceoffElement,"images/misc/misc/p2-select-" + name + ".png");
            spriteLookup_.set(this.TeamANameElement,"images/misc/font3/name-" + name + ".png",false,true);
        }
        Faceoff.prototype.setTeamB = function(name)
        {
            spriteLookup_.set(this.TeamBFaceoffElement,"images/misc/misc/p2-select-" + name + ".png");
            spriteLookup_.set(this.TeamBNameElement,"images/misc/font3/name-" + name + ".png",false,true);
        }

        Faceoff.prototype.init = function()
        {
            this.FaceoffElement = window.document.createElement("div");
            this.FaceoffElement.style.display = "none";
            this.FaceoffElement.className = "faceoff";

            this.TeamAFaceoffElement = window.document.createElement("div");
            this.TeamAFaceoffElement.className = "team1-faceoff";

            this.TeamBFaceoffElement = window.document.createElement("div");
            this.TeamBFaceoffElement.className = "team2-faceoff";

            this.FaceoffElement.appendChild(this.TeamAFaceoffElement);
            this.FaceoffElement.appendChild(this.TeamBFaceoffElement);

            this.TeamANameElement = window.document.createElement("div");
            this.TeamANameElement.className = "faceoff-name flipped";
            this.TeamAFaceoffElement.appendChild(this.TeamANameElement);

            this.TeamBNameElement = window.document.createElement("div");
            this.TeamBNameElement.className = "faceoff-name";
            this.TeamBFaceoffElement.appendChild(this.TeamBNameElement);

            this.VsElement = window.document.createElement("div");
            this.VsElement.className = "vs";
            spriteLookup_.set(this.VsElement,"images/misc/misc/vs-0.png");
            this.FaceoffElement.appendChild(this.VsElement);

            this.reset();

            /*
            imageLookup_.getBgB64(this.TeamAFaceoffElement,"images/misc/head-sprites.png");
            imageLookup_.getBgB64(this.TeamBFaceoffElement,"images/misc/head-sprites.png");
            imageLookup_.getBgB64(this.TeamANameElement,"images/misc/name-sprites.png");
            imageLookup_.getBgB64(this.TeamBNameElement,"images/misc/name-sprites.png");
            imageLookup_.getBgB64(this.VsElement,"images/misc/head-sprites.png");
            */

            window.document.getElementById("pnlStage").appendChild(this.FaceoffElement);
        }

        Faceoff.prototype.isActive = function()
        {
            return !startedRound_;
        }

        Faceoff.prototype.reset = function()
        {
            showedFaceoff_ = !!__debugMode;
            announcedNewRound_ = !!__debugMode;
            startedRound_ = false;
            this.Scale = 0;
            this.Angle = 0;

            this.rotateScale();

            this.TeamANameElement.style.display = "none";
            this.TeamBNameElement.style.display = "none";
            this.VsElement.style.display = "none";
            areNamesHidden_ = true;
        }

        Faceoff.prototype.pause = function()
        {
            soundManager_.pause(faceoffSound_);
        }

        Faceoff.prototype.resume = function()
        {
            if(!startedRound_)
                soundManager_.resume(faceoffSound_);
        }

        Faceoff.prototype.release = function()
        {
            utils_.removeFromDOM(this.FaceoffElement);
        }

        Faceoff.prototype.show = function(frame)
        {
            showedFaceoff_ = true;
            soundManager_.queueSound(faceoffSound_);
            this.FaceoffElement.style.display = "";
        }


        Faceoff.prototype.hide = function(frame)
        {
            this.FaceoffElement.style.display = "none";
        }

        Faceoff.prototype.startNewRound = function(frame)
        {
            announcedNewRound_ = true;
            match_.startNewRound(frame);
        }

        Faceoff.prototype.endNewRound = function(frame)
        {
            startedRound_ = true;
            match_.endNewRound(frame);
        }

        Faceoff.prototype.handleRound1 = function(frame)
        {
            if(!showedFaceoff_ && (frame > CONSTANTS.SHOW_FACEOFF_DELAY))
                this.show(frame);
            if(!announcedNewRound_ && (frame > CONSTANTS.ANNOUNCE_FIRST_ROUND_DELAY))
                this.startNewRound(frame);
            if(!startedRound_ && (frame > CONSTANTS.START_FIRST_ROUND_DELAY))
                this.endNewRound(frame);
        }

        Faceoff.prototype.handleOtherRounds = function(frame)
        {
            if(!announcedNewRound_ && (frame > CONSTANTS.ANNOUNCE_NEW_ROUND_DELAY))
                this.startNewRound(frame);
            if(!startedRound_ && (frame > CONSTANTS.START_NEW_ROUND_DELAY))
                this.endNewRound(frame);
        }

        Faceoff.prototype.frameMove = function(frame)
        {
            if((frame > CONSTANTS.SHOW_FACEOFF_PICS_DELAY) && (frame < CONSTANTS.REMOVE_FACEOFF_PICS_DELAY))
            {
                if(this.Scale < this.MaxScale)
                {
                    this.Scale = this.scaleUpFn(frame, this.Scale);
                    this.Angle = this.rotateUpFn(frame, this.Angle);
                    this.rotateScale();
                }
                else if(!!areNamesHidden_)
                {
                    this.TeamANameElement.style.display = "";
                    this.TeamBNameElement.style.display = "";
                    this.VsElement.style.display = "";
                    areNamesHidden_ = false;
                }
            }
            else if(frame > CONSTANTS.REMOVE_FACEOFF_PICS_DELAY)
            {
                if(!areNamesHidden_)
                {                
                    this.TeamANameElement.style.display = "none";
                    this.TeamBNameElement.style.display = "none";
                    this.VsElement.style.display = "none";
                    areNamesHidden_ = true;
                }
                if(this.Scale > 0)
                {
                    this.Scale = this.scaleDownFn(frame, this.Scale);
                    this.Angle = this.rotateDownFn(frame, this.Angle);
                    this.rotateScale();
                }
            }
        }

        Faceoff.prototype.rotateScale = function()
        {
            this.TeamAFaceoffElement.style["-webkit-transform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";
            this.TeamAFaceoffElement.style["-moz-transform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";
            this.TeamAFaceoffElement.style["MozTransform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";
            this.TeamAFaceoffElement.style["-o-transform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotate(" + this.Angle + "deg)";
            this.TeamAFaceoffElement.style["OTransform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotate(" + this.Angle + "deg)";
            this.TeamAFaceoffElement.style["-ms-transform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";

            this.TeamBFaceoffElement.style["-webkit-transform"] = "scale(" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";
            this.TeamBFaceoffElement.style["-moz-transform"] = "scale(" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";
            this.TeamBFaceoffElement.style["MozTransform"] = "scale(" + this.Scale + "," + this.Scale + ") rotate(" + this.Angle + "deg)";
            this.TeamBFaceoffElement.style["OTransform"] = "scale(" + this.Scale + "," + this.Scale + ") rotate(" + this.Angle + "deg)";
            this.TeamBFaceoffElement.style["-ms-transform"] = "scale(-" + this.Scale + "," + this.Scale + ") rotateZ(" + this.Angle + "deg)";
        }

        Faceoff.prototype.render = function(frame)
        {
        }

        return new Faceoff();
    }