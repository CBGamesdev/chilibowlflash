

var CreateCharSelect = function(users)
{
    var SCREEN_STATE = 
    {
        SELECT_CHAR:1
        ,SHOW_NEXT_FOE:2
    }

    var DELAY = 100;
    var delayAfterSelect_ = 0;
    var keyCount_ = 0;
    var selectableChars_ = [CHARACTERS.RYU,CHARACTERS.KEN,CHARACTERS.MBISON,CHARACTERS.SAGAT,CHARACTERS.AKUMA];
    var initialized_ = false;
    var u1_ = null;
    var u2_ = null;
    var teamA_ = [];
    var teamB_ = [];
    var showNextFoe_ = false;
    var state_ = SCREEN_STATE.SELECT_CHAR;
    var nextFoeElement_ = {X:0,Y:0,Element:null,StartFrame:0};
    var animations_ = {};
    var isFirstFoe_ = true;

    function determineTeams()
    {
        if(!users)
            return;

        teamA_ = [];
        teamB_ = [];

        if(users[0].isRequestingCharSelect() || users[0].hasSelectedPlayer() || users[0].isInCharSelect())
        {
            teamA_.push(0);
            users[0].ShowSelectIcon = true;
            if(!!users[0].IsRequestingCharSelect)
            {
                for(var i = 2; i < users.length; ++i)
                    if((users[i].Team == 1))
                        users[i].reset();

            }
        }
        if(users[1].isRequestingCharSelect() || users[1].hasSelectedPlayer() || users[1].isInCharSelect())
        {
            teamB_.push(1);
            users[1].ShowSelectIcon = true;
            if(users[1].isRequestingCharSelect())
                for(var i = 2; i < users.length; ++i)
                    if((users[i].Team == 2))
                        users[i].reset();
        }

        for(var i = 2; i < users.length; ++i)
        {
            if(!!users[i].IsAI)
                users[i].reset();
            if((users[i].Team == 1) && !users[i].IsAI && !users[0].isRequestingCharSelect())
                teamA_.push(i);
            else if((users[i].Team == 2) && !users[i].IsAI && !users[1].isRequestingCharSelect())
                teamB_.push(i);
        }

        u1_ = users[teamA_[0]];
        u2_ = users[teamB_[0]];
    }

    determineTeams();

    var isU1Human = function() { return !!u1_ && (!u1_.isAI()); }
    var isU2Human = function() { return !!u2_ && (!u2_.isAI()); }

    var CharSelect = function()
    {

        this.CharsMax = 11;
        this.CharsRow1 = {Min:0,Max:3};
        this.CharsRow2 = {Min:4,Max:7};
        this.CharsRow3 = {Min:8,Max:11};

        this.CharsCol1 = [0,4,8];
        this.CharsCol2 = [1,5,9];
        this.CharsCol3 = [2,6,10];
        this.CharsCol4 = [3,7,11];

        this.Element = null;
        this.PlayerSelectImg = null;
        this.CharSelectElement = null;
        this.NextFoeLine1Element = null;
        this.NextFoeLine2Element = null;
        this.Music = "audio/misc/player-select.zzz";
        this.LastPicked = "";
        this.NbFrames = 0;
        this.loadAssets();
    }

    //Simply returns the count of all of the frames
    CharSelect.prototype.getNextFrameID = function()
    {
        return this.NbFrames;
    }

    CharSelect.prototype.getDelayAfterSelect = function() { return delayAfterSelect_; }
    CharSelect.prototype.getUser1 = function() { return (!!u1_ && (!!u1_.IsInCharSelect || u1_.IsInStoryMode)) ? u1_ : null; }
    CharSelect.prototype.getUser2 = function() { return (!!u2_ && (!!u2_.IsInCharSelect || u2_.IsInStoryMode)) ? u2_ : null; }
    CharSelect.prototype.getPlayers = function(users)
    {
        var retVal = [];

        for(var i = 0; i < users.length; ++i)
            retVal.push(users[i].getPlayer());

        return retVal;
    }


    CharSelect.prototype.getStage = function()
    {
        return stages_[this.LastPicked];
    }


    CharSelect.prototype.restartMusic = function()
    {
        soundManager_.restart(this.Music);
    }

    CharSelect.prototype.playMusic = function()
    {
        soundManager_.playOrResume(this.Music,true);
    }

    CharSelect.prototype.pauseMusic = function()
    {
        soundManager_.pause(this.Music);
    }


    CharSelect.prototype.pause = function()
    {
        this.pauseMusic();
    }


    CharSelect.prototype.resume = function()
    {
        this.playMusic();
    }


    CharSelect.prototype.start = function()
    {
        game_.showLoading(false);
        this.init();
        this.restartMusic();
        this.playMusic();
        this.setupAnimations();
    }

    CharSelect.prototype.setupAnimations = function()
    {
        animations_ = {};
        animations_["show_next_foe"] = new BasicAnimation("show_next_foe",[],false);
        animations_["show_next_foe"].addFrame(this,"images/misc/misc/question-0.png",8);
        animations_["show_next_foe"].addFrame(this,"images/misc/misc/question-1.png",8).set({"X":10});
        animations_["show_next_foe"].addFrame(this,"images/misc/misc/question-2.png",8).set({"X":25});
        animations_["show_next_foe"].addFrame(this,"images/misc/misc/question-3.png",8).set({"X":23});
        animations_["show_next_foe"].addFrame(this,"images/misc/misc/question-4.png",8).set({"X":10});
        animations_["show_next_foe"].addFrame(this,"",CONSTANTS.MAX_FRAME);
    }

    CharSelect.prototype.setupSelectedChar = function(user)
    {
        if(user.Selected !== undefined)
        {
            user.SelectScreenData.Row = undefined;
            user.SelectScreenData.Row = this.getRow(user);

            user.SelectScreenData.Col = undefined;
            user.SelectScreenData.Col = this.getColumn(user);

            user.SelectIcon.Y = this.rowToY(user.SelectScreenData.Row);
            user.SelectIcon.X = this.rowToX(user.SelectScreenData.Col);
        }
    }

    CharSelect.prototype.rowToY = function(row)
    {
        return CONSTANTS.CHARSELECT_Y - (row * CONSTANTS.CHARSELECT_HEIGHT);
    }

    CharSelect.prototype.rowToX = function(col)
    {
        return CONSTANTS.CHARSELECT_X + (col * CONSTANTS.CHARSELECT_WIDTH);
    }

    CharSelect.prototype.getRow = function(user)
    {
        if(user.SelectScreenData.Row !== undefined)
            return user.SelectScreenData.Row

        if((user.Selected <= this.CharsRow1.Max) && (user.Selected >= this.CharsRow1.Min))
            return CONSTANTS.ROW1;
        else if((user.Selected <= this.CharsRow2.Max) && (user.Selected >= this.CharsRow2.Min))
            return CONSTANTS.ROW2;
        else// if((user.Selected <= this.CharsRow3.Max) && (user.Selected >= this.CharsRow3.Min))
            return CONSTANTS.ROW3;
    }

    CharSelect.prototype.getColumn = function(user)
    {
        if(user.SelectScreenData.Col !== undefined)
            return user.SelectScreenData.Col;

        if(-1 < this.CharsCol1.indexOf(user.Selected))
            return CONSTANTS.COL1;
        else if(-1 < this.CharsCol2.indexOf(user.Selected))
            return CONSTANTS.COL2;
        else if(-1 < this.CharsCol3.indexOf(user.Selected))
            return CONSTANTS.COL3;
        else if(-1 < this.CharsCol4.indexOf(user.Selected))
            return CONSTANTS.COL4;
        else if(user.PlayerNdx == 1)
            return CONSTANTS.COL1;
        else if(user.PlayerNdx == 2)
            return CONSTANTS.COL4;

    }

    //try to change character on the selection screen
    CharSelect.prototype.tryChangeCharacter = function(who, direction)
    {
        var row = this.getRow(who);
        var col = this.getColumn(who);

        var tmpRow = this.getRow(who);
        var tmpCol = this.getColumn(who);

        var isUser1 = who.PlayerNdx == 1;
        var isUser2 = who.PlayerNdx == 2;
        var MAX_COL = 3;
        var MAX_ROW = 3;

        if(direction == CONSTANTS.DOWN)
        {
            //ensure that the player can only go to its own random select
            if(!(row == CONSTANTS.ROW2 && ((isUser1 && col == CONSTANTS.COL4) || (isUser2 && col == CONSTANTS.COL1))))
                row = Math.min(row + 1, CONSTANTS.ROW3);
        }
        else if(direction == CONSTANTS.UP)
        {
            row = Math.max(row - 1, 0);
        }
        else
        {
            switch(row)
            {
                case CONSTANTS.ROW1:
                case CONSTANTS.ROW2:
                {
                    if(direction == CONSTANTS.RIGHT) { col = Math.min(col + 1, CONSTANTS.COL4); }
                    else if(direction == CONSTANTS.LEFT) { col = Math.max(col - 1, CONSTANTS.COL1); }
                    break;
                }
                case CONSTANTS.ROW3:
                {
                    //ensure that the player can only go to its own random select
                    if(direction == CONSTANTS.RIGHT)
                    {
                        if(isUser1 && col == CONSTANTS.COL3)
                            break;

                        col = Math.min(col + 1, CONSTANTS.COL4);
                    } 
                    else if(direction == CONSTANTS.LEFT)
                    {
                        if(isUser2 && col == CONSTANTS.COL2)
                            break;

                        col = Math.max(col - 1, CONSTANTS.COL1);
                    }
                    break;
                }
            }
        }

        tmpSelected = col + (row * 4);
        if((tmpSelected == 8) && (who.Selected >= 11))
        {
            //
        }
        else
        {
            who.Selected = tmpSelected;

            if(tmpRow != row || tmpCol != col)
            {
                if(isUser1)
                    this.queueUser1MoveSound();
                else
                    this.queueUser2MoveSound();
                
            }

            who.SelectIcon.Y = this.rowToY(row);
            who.SelectIcon.X = this.rowToX(col);
        }
        
        return {Row:row,Col:col};
    }



    CharSelect.prototype.kill = function()
    {
        this.release();
    }


    CharSelect.prototype.release = function()
    {
        showNextFoe_ = false;
        soundManager_.pause(this.Music);
        var parentElement = window.document.getElementById("pnlStage");
        parentElement.style.backgroundImage = "";
        parentElement.style.backgroundRepeat = "";

        //parentElement.removeChild(this.Element);
        //parentElement.removeChild(this.PlayerSelectImg);

        utils_.removeChildrenFromDOM(this.Element);
        utils_.removeChildrenFromDOM(this.CharSelectElement);
        utils_.removeChildrenFromDOM(this.PlayerSelectImg);
        utils_.removeChildrenFromDOM(this.CharSelectElement);
        utils_.removeChildrenFromDOM(this.NextFoeLine1Element);
        utils_.removeChildrenFromDOM(this.NextFoeLine2Element);
        utils_.removeChildrenFromDOM(nextFoeElement_.Element);
        isFirstFoe_ = false;

        if(!!u1_)
            u1_.release();

        if(!!u2_)
            u2_.release();

        initialized_ = false;
    }


    CharSelect.prototype.init = function()
    {
        if(!initialized_)
        {
            showNextFoe_ = false;
            LoadCharSelectSpriteData();
            delayAfterSelect_ = 0;
            this.NextFoeLine1Element = window.document.createElement("div");
            this.NextFoeLine1Element.style.display = "none";
            this.NextFoeLine1Element.className = "next-foe-line1";
            for(var i = 0; i < 4; ++i)
            {
                var element = window.document.createElement("div");
                element.className = "question-mark-container"

                var childElement = window.document.createElement("div");
                childElement.className = "question-mark"
                spriteLookup_.set(childElement,"images/misc/misc/question-0.png");
                element.appendChild(childElement);

                this.NextFoeLine1Element.appendChild(element);
            }

            this.NextFoeLine2Element = window.document.createElement("div");
            this.NextFoeLine2Element.style.display = "none";
            this.NextFoeLine2Element.className = "next-foe-line2";
            for(var i = 0; i < 4; ++i)
            {
                var element = window.document.createElement("div");
                element.className = "question-mark-container"

                var childElement = window.document.createElement("div");
                childElement.className = "question-mark"
                spriteLookup_.set(childElement,"images/misc/misc/question-0.png");
                element.appendChild(childElement);

                this.NextFoeLine2Element.appendChild(element);
            }

            this.Element = window.document.createElement("div");
            spriteLookup_.set(this.Element, "images/misc/misc/globe.png", true);
            this.Element.className = "select";

            this.CharSelectElement = window.document.createElement("div");
            spriteLookup_.set(this.CharSelectElement, "images/misc/misc/char-select.png", true);
            this.CharSelectElement.className = "char-select";
            this.CharSelectElement.style.display = "";

            this.PlayerSelectImg = window.document.createElement("div");
            spriteLookup_.set(this.PlayerSelectImg, "images/misc/misc/player-select.png", true);
            this.PlayerSelectImg.className = "player-select";


            var parentElement = window.document.getElementById("pnlStage");
            parentElement.appendChild(this.PlayerSelectImg);
            parentElement.appendChild(this.Element);
            parentElement.appendChild(this.CharSelectElement);
            parentElement.appendChild(this.NextFoeLine1Element);
            parentElement.appendChild(this.NextFoeLine2Element);
            spriteLookup_.set(parentElement, "images/misc/misc/player-select-back-bg.png", true);
            parentElement.style.backgroundRepeat = "no-repeat";


            //init music
            //soundManager_.load(this.Music);

            initialized_ = true;
        }


        if(!!u1_ && (u1_.isRequestingCharSelect() || u1_.isInStoryMode()))
        {
            this.enableUser1();
            this.setupSelectedChar(u1_);
        }
        if(!!u2_ && (u2_.isRequestingCharSelect() || u2_.isInStoryMode()))
        {
            this.enableUser2();
            this.setupSelectedChar(u2_);
        }
    }

    //checks to see if a player is going into one-player mode (vs computer)
    CharSelect.prototype.checkFor1PMode = function()
    {
        hasP1 = false;
        hasP2 = false;

        if(isU1Human())
        {
            hasP1 = true;
        }

        if(isU2Human())
        {
            hasP2 = true;
        }

        if(hasP1 && hasP2)
        {
            u1_.disableStoryMode();
            u2_.disableStoryMode();
        }
        else if(hasP1)
        {
            u1_.enableStoryMode();
            if(!!u2_)
                u2_.disableStoryMode();
        }
        else if(hasP2)
        {
            u2_.enableStoryMode();
            if(!!u1_)
                u1_.disableStoryMode();
        }
    }

    CharSelect.prototype.addNewChallenger = function(user,slot)
    {
        determineTeams();
        this.enableUser(user,slot,slot == 1 ? teamB_ : teamA_);
        user.IsRequestingCharSelect = false;
    }

    CharSelect.prototype.enableUser1 = function()
    {
        this.enableUser(users[teamA_[0]],1,teamB_);
    }

    CharSelect.prototype.enableUser2 = function()
    {
        this.enableUser(users[teamB_[0]],2,teamA_);
    }

    CharSelect.prototype.enableUser = function(user,slot,otherTeam)
    {
        if(slot === undefined)
        {
            if(isU1Human())
            {
                slot = u1_.PlayerNdx == 1 ? 2 : 1;
                teamB_ = [user];
                u2_ = users[user];
                user = u2_;
            }
            else if(isU2Human())
            {
                slot = u2_.PlayerNdx == 1 ? 2 : 1;
                teamA_ = [user];
                u1_ = users[user];
                user = u1_;
            }
        }

        otherUser = (slot == 1) ? this.getUser2() : this.getUser1();
        if(user.isRequestingCharSelect())
            user.useCredit();

        var changeCharacterFn = function(thisValue) { return function(direction) { return thisValue.tryChangeCharacter(this,direction); } };
        var getOtherCharacterFn = function(thisValue) { return function(direction) { return !!thisValue ? (thisValue.IsCharSelected ? thisValue.getName() : "") : ""; } };
        var isCharOnOtherTeamFn = function(thisValue,otherTeam)
        {
            return function(direction)
            {
                return otherTeam.some(function(a) { return (users[a].isCharSelected() && (users[a].getName() == thisValue.getName())); });
            }
        };
        var isAltCharOnOtherTeamFn = function(thisValue,otherTeam)
        {
            return function(direction)
            {
                return otherTeam.some(function(a) { return (users[a].isCharSelected() && (users[a].getName() == thisValue.getName())) && users[a].isAlternateChar(); });
            }
        };

        var chooseCharacterFn = function(thisValue)
        {
            return function()
            {
                thisValue.queueUser1ChooseSound();
                this.IsCharSelected ? this.getName() : "";
                thisValue.LastPicked = this.getName();
            }
        };

        //Init user
        if(!!user)
        {
            user.PlayerNdx = slot == 1 ? 1 : 2;
            user.Direction = slot == 1 ? -1 : 1;
            user.IsInCharSelect = true;
            user.init(slot == 1);
            user.changeCharacterFn = changeCharacterFn(this);
            user.chooseCharacterFn = chooseCharacterFn(this);
            user.getOtherCharacterFn = getOtherCharacterFn(otherUser);
            user.isCharOnOtherTeamFn = isCharOnOtherTeamFn(user,otherTeam);
            user.isAltCharOnOtherTeamFn = isAltCharOnOtherTeamFn(user,otherTeam);

            if(user.Selected === null)
                user.Selected = (slot == 1) ? CHARACTERS.RYU : CHARACTERS.KEN;

            user.changeCharacterFn();
            user.showCharacter();
            if(user.isInStoryMode())
            {
                user.setChar();
            }
        }
        this.checkFor1PMode();
    }

    CharSelect.prototype.resetKeys = function()
    {
    }

    //input handler
    CharSelect.prototype.onKeyStateChanged = function(isDown,keyCode,frame)
    {

    }

    CharSelect.prototype.handleCharsSelected = function(frame)
    {
        delayAfterSelect_ = frame + DELAY;
        isFirstFoe_ = true;
        teamA_ = this.getTeamA();
        teamB_ = this.getTeamB();

        if(teamA_.some(function(a) { return users[a].isInStoryMode(); }))
        {
            if(game_.isTeamMode() && teamA_.length == 1)
            {
                this.addAiUser(teamA_,teamB_);
            }

            this.LastPicked = users[teamB_[0]].getName();
            this.showNextFoe(users[teamB_[0]].Selected);
        }
        else if(teamB_.some(function(a) { return users[a].isInStoryMode(); }))
        {
            if(game_.isTeamMode() && teamA_.length == 1)
            {
                this.addAiUser(teamB_,teamA_);
            }

            this.LastPicked = users[teamA_[0]].getName();
            this.showNextFoe(users[teamA_[0]].Selected);
        }
        else
        {
            this.LastPicked = !!this.LastPicked 
                ? this.LastPicked
                : !!users[teamA_[0]] 
                    ? users[teamA_[0]].getName()
                    : users[teamB_[0]].getName();
        }
    }

    CharSelect.prototype.getTeamA = function()
    {
        if(teamA_.length == 0)
            teamA_ = this.getAiTeam(teamB_);
        return teamA_;
    }
    CharSelect.prototype.getTeamB = function()
    {
        if(teamB_.length == 0)
            teamB_ = this.getAiTeam(teamA_);
        return teamB_;
    }

    CharSelect.prototype.addAiUser = function(team, otherTeam, ch)
    {
        var playerIndex = 0;
        for(var j = 2; j < users.length; ++j)
        {
            if(!users[j].IsCharSelected)
            {
                playerIndex = j;
                break;
            }
        }

        if(j >= users.length)
            return;

        var teamMember = users[playerIndex];
        if(!ch)
        {
            ch = users[team[0]].TeamMates.pop() || CHARACTERS.RYU;
        }
        var isAlternate = otherTeam.some(function(a) { return (users[a].Selected == ch) && !users[a].isAlternateChar(); })
         || team.some(function(a) { return (users[a].Selected == ch) && !users[a].isAlternateChar(); });

        teamMember.setChar(ch,isAlternate,true);
        team.push(playerIndex);

        //keep adding teammates
        if(users[team[0]].TeamMates.length > 0)
            this.addAiUser(team, otherTeam);
    }

    CharSelect.prototype.getAiTeam = function(otherTeam)
    {
        //user = (otherUserNdx == 1) ? u1_ : u2_;
        otherUser = users[otherTeam[0]]; //(otherUserNdx == 1) ? u2_ : u1_;

        var opponents = otherUser.StoryMode.getOpponents();
        var team = [];

        for(var i = 0; i < opponents.length; ++i)
        {
            var playerIndex = 0;
            for(var j = 2; j < users.length; ++j)
            {
                if(!users[j].IsCharSelected)
                {
                    playerIndex = j;
                    break;
                }
            }
            var teamMember = users[playerIndex];


            var ch = opponents[i];

            //var isAlternate = (otherUser.Selected == ch) ? !otherUser.IsAlternate : (getRand(100) > 50);
            var isAlternate = otherTeam.some(function(a) { return (users[a].Selected == ch) && !users[a].isAlternateChar(); });

            teamMember.setChar(ch,isAlternate,true);
            team.push(playerIndex);
        }
        return team;
    }

    CharSelect.prototype.check = function(frame)
    {
        if((!this.getUser1() || u1_.IsCharSelected) && (!this.getUser2() || u2_.IsCharSelected))
        {
            this.IsDone = true;
            this.handleCharsSelected(frame);
        }
    }

    CharSelect.prototype.queueUser1MoveSound = function(value) { soundManager_.queueSound("audio/misc/p-select-move-0.zzz"); }
    CharSelect.prototype.queueUser1ChooseSound = function(value) { soundManager_.queueSound("audio/misc/p-select-choose-0.zzz"); }
    CharSelect.prototype.queueUser2MoveSound = function(value) { soundManager_.queueSound("audio/misc/p-select-move-1.zzz"); }
    CharSelect.prototype.queueUser2ChooseSound = function(value) { soundManager_.queueSound("audio/misc/p-select-choose-0.zzz"); }

    CharSelect.prototype.loadUserAssets = function(users)
    {
        /*
        for(var i = 0; i < users.length; ++i)
        {
            var user = users[i];
            if(!!user.getName())
            {
                var name = user.getName();
                var folder = user.getFolder();
                stuffLoader_.queue("script/player-" + name + ".js",RESOURCE_TYPES.SCRIPT);
                stuffLoader_.queue("script/player-" + folder + "-spritedata.js",RESOURCE_TYPES.SCRIPT);
            }
        }
        */
    }

    CharSelect.prototype.loadAssets = function()
    {
        stuffLoader_.queue("char-select.js",RESOURCE_TYPES.BASE64AUDIO);
    }


    CharSelect.prototype.showNextFoe = function(who,boxIndex)
    {
        boxIndex = boxIndex || 0;
        if(!!this.getUser1())
            u1_.charSelectElementsVisible(false);
        if(!!this.getUser2())
            u2_.charSelectElementsVisible(false);
        showNextFoe_ = true;
        this.CharSelectElement.style.display = "none";
        this.NextFoeLine1Element.style.display = "";
        this.NextFoeLine2Element.style.display = "";

        state_ = SCREEN_STATE.SHOW_NEXT_FOE;

        var checkDefeatedOpponents = function(u)
        {
            for(var i = 0; i < CONSTANTS.MAX_STORY_MODE_LEVEL; ++i)
            {
                var src = u.StoryMode.getDefeatedOpponentsImgSrc(i);

                if(i < 4)
                    spriteLookup_.set(this.NextFoeLine1Element.children[i].firstChild,src[0]);
                else
                    spriteLookup_.set(this.NextFoeLine2Element.children[i-4].firstChild,src[0]);
            }


            nextFoeElement_.StartFrame = game_.getCurrentFrame();
            var level = u.StoryMode.getLevel();
            nextFoeElement_.Element = level < 4 
                                    ? this.NextFoeLine1Element.children[level].firstChild
                                    : this.NextFoeLine2Element.children[level-4].firstChild;
       }

        if(!!this.getUser1() && !!u1_.isInStoryMode())
        {
            checkDefeatedOpponents.call(this,u1_);
        }
        else if(!!this.getUser2() && !!u2_.isInStoryMode())
        {
            checkDefeatedOpponents.call(this,u2_);
        }


        switch(who)
        {
            case CHARACTERS.KEN:    { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-ken-r.png"; break; }
            case CHARACTERS.RYU:    { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-ryu-r.png"; break; }
            case CHARACTERS.CHUNLI: { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-chunli-r.png"; break; }
            case CHARACTERS.CHARLIE:{ animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-charlie-r.png"; break; }
            case CHARACTERS.GUY:    { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-guy-r.png"; break; }
            case CHARACTERS.BIRDIE: { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-birdie-r.png"; break; }
            case CHARACTERS.SODOM:  { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-sodom-r.png"; break; }
            case CHARACTERS.ADON:   { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-adon-r.png"; break; }
            case CHARACTERS.ROSE:   { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-rose-r.png"; break; }
            case CHARACTERS.SAGAT:  { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-sagat-r.png"; break; }
            case CHARACTERS.MBISON: { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-mbison-r.png"; break; }
            case CHARACTERS.AKUMA:  { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-akuma-r.png"; break; }
            case CHARACTERS.DAN:    { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/char-dan-r.png"; break; }
            default:                { animations_["show_next_foe"].BaseAnimation.Frames[5].RightSrc = "images/misc/misc/question-0.png"; break; }
        }

    }


    CharSelect.prototype.frameMove = function(frame)
    {
        if(!this.IsDone)
        {
            if(!users[0].IsInCharSelect && !!users[0].IsRequestingCharSelect)
                this.addNewChallenger(users[0],1);
            if(!users[1].IsInCharSelect && !!users[1].IsRequestingCharSelect)
                this.addNewChallenger(users[1],2);
            this.check(frame);
        }

        if(state_ == SCREEN_STATE.SHOW_NEXT_FOE)
        {
            
        }

        if(!!this.getUser1())
            u1_.frameMove(frame);
        if(!!this.getUser2())
            u2_.frameMove(frame);
    }


    CharSelect.prototype.render = function(frame)
    {
        if(state_ == SCREEN_STATE.SHOW_NEXT_FOE)
        {
            animations_["show_next_foe"].tryRender(frame, nextFoeElement_);
        }

        if(!!this.getUser1())
            u1_.render(frame);
        if(!!this.getUser2())
            u2_.render(frame);
    }

    var LoadCharSelectSpriteData = function()
    {
    }

    return new CharSelect();
}