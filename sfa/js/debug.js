function GetDebugInstance(game)
{
    /*private member*/
    var game_ = game;

    var setupMatch = function(t1, t2, stage, state)
    {
        $$init();
        game_.end();

        t1 = t1 || [];
        t2 = t2 || [];

        var teamA = [0];
        var teamB = [1];

        for(var a = 0; a < t1.length; ++a)
        {
            t1[a].B = t1[a].B || false;
            t1[a].C = t1[a].C || false;
        }

        for(var a = 0; a < t2.length; ++a)
        {
            t2[a].B = t2[a].B || false;
            t2[a].C = t2[a].C || false;
        }


        for(var a = 0; a < t1.length; ++a)
        {
            for(var b = 0; b < t2.length; ++b)
            {
                if(t1[a].A === t2[b].A)
                {
                    if(!!t1[a].B)
                        t2[b].B = false;
                    if(!!t2[b].B)
                        t1[a].B = false;
                    if(!t1[a].B && !t2[b].B)
                        t2[b].B = true;
                }
            }
        }

        /*TEAM 1*/
        if(!!t1[0])
            user1_.resetChar(t1[0].A, t1[0].B, t1[0].C);
        else
            user1_.resetChar(CHARACTERS.KEN);

        if(!!t1[1])
        {
            if(!!t1[1].D)
            {
                teamB.pop();
                user2_.resetChar(t1[1].A, t1[1].B, t1[1].C);
                teamA.push(1);
            }
            else
            {
                user3_.resetChar(t1[1].A, t1[1].B, t1[1].C);
                teamA.push(2);
            }
        }
        if(!!t1[2])
        {
            user4_.resetChar(t1[2].A, t1[2].B, t1[2].C);
            teamA.push(3);
        }
        if(!!t1[3])
        {
            user5_.resetChar(t1[3].A, t1[3].B, t1[3].C);
            teamA.push(4);
        }

        /*TEAM 2*/
        if(!!t1[1] && !!t1[1].D)
        {
            if(!!t2[0])
                user3_.resetChar(t2[0].A, t2[0].B, t2[0].C);
            else
                user3_.resetChar(CHARACTERS.RYU);

            teamB.push(2);
        }
        else
        {
            if(!!t2[0])
                user2_.resetChar(t2[0].A, t2[0].B, t2[0].C);
            else
                user2_.resetChar(CHARACTERS.RYU);
        }

        if(!!t2[1])
        {
            user6_.resetChar(t2[1].A, t2[1].B, t2[1].C);
            teamB.push(5);
        }
        if(!!t2[2])
        {
            user7_.resetChar(t2[2].A, t2[2].B, t2[2].C);
            teamB.push(6);
        }
        if(!!t2[3])
        {
            user8_.resetChar(t2[3].A, t2[3].B, t2[3].C);
            teamB.push(7);
        }
        game_.startMatch(state === undefined ? MATCH_STATES.PRACTICE : 0, teamA, teamB, stages_[stage || "guy"]);
    }

    var Debug = function()
    {

    }


    Debug.prototype.maxOutEnergy = function()
    {
        game_.getMatch().getTeamA().getEnergybar().change(1000);
        game_.getMatch().getTeamB().getEnergybar().change(1000);
    }

    //test player battle
    Debug.prototype.practice = function (t1, t2, stage)
    {
        this.setPracticeMode(true);
        __noDamage = true;
        setupMatch(t1, t2, stage);
    }

    //test player battle
    Debug.prototype.startMatch = function (t1, t2, stage)
    {
        this.setPracticeMode(false);
        __noDamage = false;
        setupMatch(t1, t2, stage, 0);
    }


    Debug.prototype.p1 = function()
    {
        if(!!game_.getMatch())
            return game_.getMatch().getTeamA().getPlayer(0);
        return null;
    }

    Debug.prototype.p2 = function()
    {
        if(!!game_.getMatch())
            return game_.getMatch().getTeamB().getPlayer(0);
        return null;
    }

    Debug.prototype.t1 = function(index)
    {
        if(!!game_.getMatch())
            return game_.getMatch().getTeamA().getPlayer(index || 0);
        return null;
    }

    Debug.prototype.t2 = function(index)
    {
        if(!!game_.getMatch())
            return game_.getMatch().getTeamB().getPlayer(index || 0);
        return null;
    }

    Debug.prototype.p1Execute = function(input)
    {
        if(!!game_.getMatch())
        {
            if(!this.p1().Ai.isRunning())
                this.p1().enableAI();
            return this.p1().Ai.getManaged().execute(input);
        }
        return null;
    }

    Debug.prototype.p2Execute = function(input)
    {
        if(!!game_.getMatch())
        {
            if(!this.p2().Ai.isRunning())
                this.p2().enableAI();
            return this.p2().Ai.getManaged().execute(input);
        }
        return null;
    }

    Debug.prototype.p2TestAI = function()
    {
        if(!!game_.getMatch())
        {
            this.p2().enableAI();
        }
        return null;
    }

    Debug.prototype.p1ReverseFrame = function()
    {
        debug_.p1().reverseFrame();
        game_.pause();
    }

    Debug.prototype.p1StepFrame = function()
    {
        game_.pause();
    }

    var spnIndex = window.document.getElementById("spnIndex");
    var txtX = window.document.getElementById("txtX");
    var txtY = window.document.getElementById("txtY");
    var txtShadow = window.document.getElementById("txtShadow");
    var txtShadowOffsetX = window.document.getElementById("txtShadowOffsetX");
    var txtShadowOffsetY = window.document.getElementById("txtShadowOffsetY");


    Debug.prototype.readFrameData = function(frame)
    {
        //.ImageOffsetX,this.CurrentFrame.ImageOffsetY,this.CurrentFrame.ShadowImageSrc

        spnIndex.innerHTML = frame.Index;
        txtX.value = +frame.ImageOffsetX;
        txtY.value = +frame.ImageOffsetY;
        txtShadow.value = frame.ShadowImageSrc.match(/[\d]+/)[0];
        txtShadowOffsetX.value = +frame.ShadowOffset.X;
        txtShadowOffsetY.value = +frame.ShadowOffset.Y;
    }

    Debug.prototype.setFrameData = function()
    {
        var x = window.document.getElementById("txtX").value;
        var y = window.document.getElementById("txtY").value;
        var s = window.document.getElementById("txtShadow").value;
        var sx = window.document.getElementById("txtShadowOffsetX").value;
        var sy = window.document.getElementById("txtShadowOffsetY").value;

        if(!!+x || x === 0)
            debug_.p1().CurrentFrame.ImageOffsetX = +x;
        if(!!+y || y === 0)
            debug_.p1().CurrentFrame.ImageOffsetY = +y;
        if(!!s)
            debug_.p1().CurrentFrame.ShadowImageSrc = "images/misc/misc/shadow-" + s + ".png";
        if(!!+sx || sx === 0)
            debug_.p1().CurrentFrame.ShadowOffset.X = +sx;
        if(!!+sy || sy === 0)
            debug_.p1().CurrentFrame.ShadowOffset.Y = +sy;
    }

    Debug.prototype.setPracticeMode = function(flag)
    {
        __noDamage = flag;
        window.document.getElementById("chkPracticeMode").checked = flag;
    }

    Debug.prototype.setFallingDamage = function(flag)
    {
        __noFallDamage = !flag;
        window.document.getElementById("chkFallDamageMode").checked = flag;
    }

    Debug.prototype.setTeamMode = function(flag)
    {
        game_.setTeamMode(flag);
        window.document.getElementById("chkTeamMode").checked = flag;
    }

    Debug.prototype.keyCount = 1000;

    Debug.prototype.injectPlayer = function(playerId,team,isAlternate)
    {
        if(!game_.getMatch() || !game_.getMatch().getTeamA() || !game_.getMatch().getTeamB())
        {
            AlertError("You can only inject a player during a match.");
            return;
        }

        right = Debug.prototype.keyCount++;
        up = Debug.prototype.keyCount++;
        left = Debug.prototype.keyCount++;
        down = Debug.prototype.keyCount++;
        p1 = Debug.prototype.keyCount++;
        p2 = Debug.prototype.keyCount++;
        p3 = Debug.prototype.keyCount++;
        k1 = Debug.prototype.keyCount++;
        k2 = Debug.prototype.keyCount++;
        k3 = Debug.prototype.keyCount++;
        turn = Debug.prototype.keyCount++;
        var user = new User(right,up,left,down,p1,p2,p3,k1,k2,k3,turn);
        user.resetChar(playerId,isAlternate,true);
        if(!!user.getName())
        {
            var name = user.getName();
            var folder = user.getFolder();
            stuffLoader_.queue("script/player-" + name + ".js",RESOURCE_TYPES.SCRIPT);
            stuffLoader_.queue("script/player-" + folder + "-spritedata.js",RESOURCE_TYPES.SCRIPT);

            var onDone = (function(user)
            {
                return function()
                {
                    var player = user.getPlayer();
                    if(team == 1)
                        game_.getMatch().getTeamA().addPlayer(player,true,true);
                    else
                        game_.getMatch().getTeamB().addPlayer(player,true,true);
                }
            })(user);
            stuffLoader_.start(null,onDone,null);
        }
        else
        {
            AlertError("user not found");

        }


    }

   /*implemented as a singleton*/
    var instance_ = instance_ || new Debug();
    return instance_;
}
