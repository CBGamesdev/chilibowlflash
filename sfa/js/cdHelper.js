var CreateCDHelper = function()
{
    /*******************************************************/
    /*******************  PRIVATE STATE    *****************/
    /*******************************************************/

    var getMatch = function() { return game_.getMatch(); }
    var getStage = function() { return getMatch().getStage(); }

    var HasIntersection_ = function(a, b)
    {
        if((a.Flags.Player.has(PLAYER_FLAGS.IGNORE_COLLISIONS) || b.Flags.Player.has(PLAYER_FLAGS.IGNORE_COLLISIONS)) || (a.IgnoreCollisionsWith == b.Id) || (b.IgnoreCollisionsWith == a.Id))
            return false;

        var retVal = false;
        var rect = a.getRect();
        var otherRect = b.getRect();
        var padding = 30;

        var hasP1RightIntersection = (rect.Right > (otherRect.Left) && rect.Right < (otherRect.Right));
        var hasP1LeftIntersection = (rect.Left > (otherRect.Left) && rect.Left < (otherRect.Right));
        var hasP1TopIntersection = (rect.Top > (otherRect.Bottom+padding) && rect.Top < (otherRect.Top-padding));
        var hasP1BottomIntersection = (rect.Bottom > (otherRect.Bottom+padding) && rect.Bottom < (otherRect.Top-padding));

        /*
        var hasP2RightIntersection = (otherRect.Right > rect.Left && otherRect.Right < rect.Right);
        var hasP2LeftIntersection = (otherRect.Left > rect.Left && otherRect.Left < rect.Right);
        var hasP2TopIntersection = (otherRect.Top > rect.Bottom && otherRect.Top < rect.Top);
        var hasP2BottomIntersection = (otherRect.Bottom > rect.Bottom && otherRect.Bottom < rect.Top);

        retVal = (hasP1RightIntersection   ? CONSTANTS.RIGHT : 0) 
                | (hasP1LeftIntersection   ? CONSTANTS.LEFT : 0)
                | (hasP1TopIntersection    ? CONSTANTS.UP : 0)
                | (hasP1BottomIntersection ? CONSTANTS.DOWN : 0)
                ;
        */

        retVal = (hasP1TopIntersection || hasP1BottomIntersection) && (hasP1RightIntersection || hasP1LeftIntersection);


        return retVal;
    }

    var GetPlayersAtPosition_ = function(rect,who,type)
    {
        var team = who.Team;
        var temp = [];
        var retVal = [];
        var match = getMatch();
        var PADDING = 1;
        var players = (team == CONSTANTS.TEAM1) ? match.getTeamB().getPlayers() : match.getTeamA().getPlayers();
        var distance = 0;
        var otherRect = {};
        var hasP1RightIntersection = false;
        var hasP1ExistsingRightIntersection = false;
        var hasP1LeftIntersection = false;
        var hasP1ExistsingLeftIntersection = false;
        var hasP1TopIntersetion = false;
        var hasP1BottomIntersection = false;
        var hasP2RightIntersection = false;
        var hasP2LeftIntersection = false;
        var hasP2TopIntersetion = false;
        var hasP2BottomIntersection = false;


        for(var i = 0, length = players.length; i < length; ++i)
        {
            if((who.Flags.Player.has(PLAYER_FLAGS.IGNORE_COLLISIONS) || players[i].Flags.Player.has(PLAYER_FLAGS.IGNORE_COLLISIONS)) || (who.IgnoreCollisionsWith == players[i].Id) || (players[i].IgnoreCollisionsWith == who.Id))
                continue;

            distance = 0;
            otherRect = players[i].getRect();

            hasP1RightIntersection = (rect.Right >= otherRect.Left && rect.Right <= otherRect.Right);
            hasP1ExistsingRightIntersection = !!rect.OldRight && (rect.OldRight >= otherRect.Left && rect.OldRight <= otherRect.Right);
            hasP1LeftIntersection = (rect.Left >= otherRect.Left && rect.Left <= otherRect.Right);
            hasP1ExistsingLeftIntersection = !!rect.OldLeft && (rect.OldLeft >= otherRect.Left && rect.OldLeft <= otherRect.Right);
            hasP1TopIntersection = (rect.Top >= otherRect.Bottom && rect.Top <= otherRect.Top);
            hasP1BottomIntersection = (rect.Bottom >= otherRect.Bottom && rect.Bottom <= otherRect.Top);

            hasP2RightIntersection = (otherRect.Right >= rect.Left && otherRect.Right <= rect.Right);
            hasP2LeftIntersection = (otherRect.Left >= rect.Left && otherRect.Left <= rect.Right);
            hasP2TopIntersection = (otherRect.Top >= rect.Bottom && otherRect.Top <= rect.Top);
            hasP2BottomIntersection = (otherRect.Bottom >= rect.Bottom && otherRect.Bottom <= rect.Top);

            switch(type)
            {
                case CONSTANTS.RIGHT: /*moving right*/
                {
                    if(hasP1RightIntersection && hasP1BottomIntersection) distance = rect.Right - otherRect.Left;
                    else if(hasP1ExistsingRightIntersection && hasP1BottomIntersection) distance = -(rect.OldRight - otherRect.Left);
                    break;
                }
                case CONSTANTS.LEFT: /*moving left*/
                {
                    if(hasP1LeftIntersection && hasP1BottomIntersection) distance = rect.Left - otherRect.Right;
                    else if(hasP1ExistsingLeftIntersection && hasP1BottomIntersection) distance = -(rect.OldLeft - otherRect.Right);
                    break;
                }
                case CONSTANTS.LEFT_AND_CHECK_RIGHT: /*moving left, but checks for right side collision as well*/
                {
                    if((hasP1LeftIntersection || hasP1RightIntersection) && hasP1BottomIntersection) distance = rect.Left - otherRect.Right;
                    break;
                }
                case CONSTANTS.RIGHT_AND_CHECK_LEFT: /*moving right, but checks for left side collision as well*/
                {
                    if((hasP1LeftIntersection || hasP1RightIntersection) && hasP1BottomIntersection) distance = rect.Right - otherRect.Left;
                    break;
                }
                case CONSTANTS.UP: /*moving up*/
                {
                    if((hasP1TopIntersection || hasP2TopIntersection) && (hasP1RightIntersection || hasP2RightIntersection)) distance = rect.Top - otherRect.Bottom;
                    break;
                }
                case CONSTANTS.DOWN: /*moving down*/
                {
                    if((hasP1BottomIntersection || hasP2BottomIntersection) && (hasP1RightIntersection || hasP2RightIntersection)) distance = rect.Bottom - otherRect.Top;
                    break;
                }
                default: /*check for any intersection*/
                {
                    if(
                        (hasP1LeftIntersection || hasP1RightIntersection && hasP1BottomIntersection) /*right or left*/
                        || (hasP2LeftIntersection || hasP2RightIntersection && hasP1BottomIntersection) /*right or left*/
                       )
                    {
                        distance = 1;
                    }
                    break;
                }
            };

            if(!!distance) temp[temp.length] = {Distance:Math.abs(distance), Player:players[i]};
        }


        /*arrange the list of items from closest to farthest*/
        var indices = [];
        var maxDist = -1;
        var index = -1;
        while(temp.length > 0)
        {
            maxDist = -1;
            index = -1;
            for(var i = 0, length = temp.length; i < length; ++i)
            {
                if(temp[i].Distance > maxDist)
                {
                    index = i;
                    maxDist = temp[i].Distance;
                }
            }
            if(index > -1)
                retVal[retVal.length] = temp.splice(index,1)[0].Player;
        }

        return retVal;
    }

    /*******************************************************/
    /*******************  PUBLIC  STATE    *****************/
    /*******************************************************/

    /* Provides simple collisions testing between players */
    var CDHelper = function()
    {
    }


    /*Test each player to see if the hit region intersects with them*/
    CDHelper.prototype.tryAttack = function(hitStop,hitID,attackID,maxNbHits,frame,points,flagsToSend,attackFlags,p1,p2,damage,moveOverrideFlags,energyToAdd,behaviorFlags,invokedAnimationName,hitSound,blockSound,nbFreeze,otherParams)
    {
        if(!p2)
            return;
        if(p2.Flags.Player.has(PLAYER_FLAGS.IGNORE_ATTACKS))
            return;
        /*some moves can only hit a certain number of times - e.g. MBison psycho crusher*/
        if(!!p2.Hits[attackID] && (p2.Hits[attackID].Nb >= maxNbHits))
            return;
        /*is p1 ejecting p2 from a grapple?*/
        var isEjecting = hasFlag(attackFlags,ATTACK_FLAGS.THROW_EJECT);
        var isP1GrapplingP2 = p1.isGrappling(p2.Id);
        var isP2BeingGrappled = p2.isBeingGrappled();
        var isP1Grappling = p1.isGrappling();
        var isP2Grappling = p2.isGrappling();

        if(!!isEjecting && !isP1GrapplingP2)
            return;
        /*Is p2 being grappled by p1?*/
        if(isP2BeingGrappled && !isP1GrapplingP2)
            return;
        /*Can only start a grapple once*/
        if(isP2BeingGrappled && isP1GrapplingP2 && !isEjecting)
            return;
        if(!p2.isVisible() && !p2.isTeleporting())
            return;
        if(p1.canJuggle(p2,attackID,otherParams.HitJuggleGroup))
        {
        }
        /*need to reform the "invulernable" flags - there are too many*/  
        else if(p2.Flags.Player.has(PLAYER_FLAGS.SUPER_INVULNERABLE) && !hasFlag(behaviorFlags,BEHAVIOR_FLAGS.THROW))
            return;
        /*frame can not hit more than once*/
        if(!!p2.isHitFrameOk(p1.Id,p1.getHitFrameID(hitID)))
            return;
        /*if the attack is a throw, it can not grab more than one player*/
        if(isP1Grappling && !isP1GrapplingP2)
            return;
        if(isP2Grappling)
            return;
        if(p1.canJuggle(p2))
        {
        }
        else if(p2.isAirborne() && hasFlag(attackFlags,ATTACK_FLAGS.CAN_AIR_JUGGLE))
        {
            //return;
        }
        else if(hasFlag(attackFlags,ATTACK_FLAGS.OVERRIDE_INVULNERABLE))
        {
            //moves such as M Bison psycho crusher will override invulnerable
        }
        else if(p2.Flags.Player.has(PLAYER_FLAGS.INVULNERABLE))
        {
            return;
        }
        var isGrapple = hasFlag(behaviorFlags,BEHAVIOR_FLAGS.THROW);

        var p1Rect = p1.getImgRect();
        var p2Rect = p2.getImgRect();

        var p1Left = p1Rect.LeftNoOffset;
        var p1Right = p1Rect.RightNoOffset;
        var p1Top = p1Rect.Top;
        var p1Bottom = p1.getY(); //p1Rect.BottomNoOffset;

        var p2Left = p2Rect.Left;
        var p2Right = p2Rect.Right;
        var p2Top = p2Rect.Top;
        var p2Bottom = p2Rect.Bottom;

        var fx = 1;
        var fy = 1;

        if(p1.Direction < 0)
        {
            for(var i = 0; i < points.length; ++i)
            {
                fx = !!isNaN(+points[i].Fx) ? fx : +points[i].Fx;
                fy = !!isNaN(+points[i].Fy) ? fy : +points[i].Fy;

                var x = p1Left + points[i].x;
                var y = p1Bottom + points[i].y;
                if(((points[i].x == -1) && !!p2.isBeingGrappled()) || (x >= p2Left && x < p2Right && y >= p2Bottom && y < p2Top))
                {
                    p1.setGiveHit(attackFlags,hitStop,energyToAdd,behaviorFlags,p2);
                    p2.setRegisteredHit(attackFlags,points[i].state,flagsToSend,frame,damage,energyToAdd,isGrapple,false,STAGE.MAX_STAGEX - x,y,p1.Direction,p1.Id,p1.getHitFrameID(hitID),attackID,moveOverrideFlags,p1,fx, fy, behaviorFlags,invokedAnimationName,hitSound,blockSound,nbFreeze,maxNbHits,otherParams);
                    break;
                }
            }
        }
        else
        {
            for(var i = 0; i < points.length; ++i)
            {
                fx = points[i].Fx || fx;
                fy = points[i].Fy || fy;

                var x = p1Right - points[i].x;
                var y = p1Bottom + points[i].y;
                if(((points[i].x == -1) && !!p2.isBeingGrappled()) || ((x <= p2Right && x > p2Left && y >= p2Bottom && y < p2Top)))
                {
                    p1.setGiveHit(attackFlags,hitStop,energyToAdd, behaviorFlags,p2);
                    p2.setRegisteredHit(attackFlags,points[i].state,flagsToSend,frame,damage,energyToAdd,isGrapple,false,x,y,p1.Direction,p1.Id,p1.getHitFrameID(hitID),attackID,moveOverrideFlags,p1,fx, fy, behaviorFlags,invokedAnimationName,hitSound,blockSound,nbFreeze,maxNbHits,otherParams);
                    break;
                }
            }
        }
    }

    /*Handles projectiles hitting a player*/
    CDHelper.prototype.tryProjectileAttack = function(frame,projectile,p1,p2)
    {
        if(!!projectile && !!projectile.IsDisintegrating)
            return;
        if(!p2)
            return;
        if(p2.isGrappling())
            return;
        if(!p2.isVisible() && !p2.isTeleporting())
            return;
        if(p2.Flags.Player.has(PLAYER_FLAGS.IGNORE_ATTACKS))
            return;
        if(p2.Flags.Player.has(PLAYER_FLAGS.SUPER_INVULNERABLE))
            return;
        if(p2.Flags.Player.has(PLAYER_FLAGS.IGNORE_PROJECTILES))
            return;

        if(!!projectile && projectile.canJuggle(p2))
        {
            /*allows override PLAYER_FLAGS.INVULNERABLE*/
        }
        else if(p2.isAirborne() && !!projectile && hasFlag(projectile.FlagsToSend,ATTACK_FLAGS.SUPER) && !!projectile.CanJuggle)
        {
            /*allows super fireballs to hit multiple times in the air*/
        }
        else if(p2.Flags.Player.has(PLAYER_FLAGS.INVULNERABLE) || !projectile)
            return;

        if(!projectile.canHit(frame))
            return;

        var p2Rect = p2.getImgRect();

        var p2Left = p2Rect.Left;
        var p2Right = p2Rect.Right;
        var p2Top = p2Rect.Top;
        var p2Bottom = p2Rect.Bottom;

        var p1Rect = projectile.Owner.getImgRect();
        var p1Left = p1Rect.Left;
        var p1Right = p1Rect.Right;

        var y0 = projectile.getTop();
        var y1 = projectile.getBottom();
        var x0 = 0;
        var x1 = 0;

        if(projectile.Direction < 0)
        {
            x0 = projectile.getBackX();
            x1 = projectile.getFrontX();
            if(
                ((x0 >= p2Left && x0 < p2Right) || (x1 >= p2Left && x1 < p2Right)) && ((y0 >= p2Bottom && y0 < p2Top) || (y1 >= p2Bottom && y1 < p2Top))
                || (projectile.isFirstFrame() && (x1 >= p2Right) && (p2Left > p1Left) && ((y0 >= p2Bottom && y0 < p2Top) || (y1 >= p2Bottom && y1 < p2Top)))
            )
            {
                /*Calculate a general hit poisition.
                Since this function use left zeroed only values, we must convert, so that the right can be zeroed as well*/
                var hitX = ((x1 - x0) / 2) + x0;
                if(p2.Direction > 0)
                    hitX = STAGE.MAX_STAGEX - hitX;
                var hitY = ((y1 - y0) / 2) + y0;
                if(p2.setRegisteredHit(projectile.getAttackState(p2.Hits[projectile.Id]),projectile.getHitState(p2.Hits[projectile.Id]),projectile.FlagsToSend,frame,projectile.BaseDamage,projectile.EnergyToAdd,false,true,hitX,hitY,projectile.Direction,p1.Id,projectile.getHitId(frame),projectile.Id,projectile.OverrideFlags,projectile.Owner,projectile.Fx,projectile.Fy,0,0,projectile.HitSound,projectile.BlockSound,projectile.getHitStop(),projectile.MaxHits,projectile.Params))
                {
                    p1.changeEnergy(projectile.EnergyToAdd);
                    projectile.hitPlayer(frame);
                }
            }
            else
            {
                /*test against the other player's projectiles*/
                for(var i = 0; i < p2.Projectiles.length; ++i)
                    this.tryProjectileHitProjectile(frame,x0,x1,y0,y1,projectile,p2.Projectiles[i]);
            }
        }
        else
        {
            x0 = projectile.getBackX();
            x1 = projectile.getFrontX();
            if(
                ((x1 >= p2Left && x1 < p2Right) || (x0 >= p2Left && x0 < p2Right)) && ((y0 >= p2Bottom && y0 < p2Top) || (y1 >= p2Bottom && y1 < p2Top))
                || (projectile.isFirstFrame() && (x1 < p2Left) && (p2Right < p1Right) && ((y0 >= p2Bottom && y0 < p2Top) || (y1 >= p2Bottom && y1 < p2Top)))
            )
            {
                /*Calculate a general hit poisition.*/
                var hitX = ((x1 - x0) / 2) + x0;
                var hitY = ((y1 - y0) / 2) + y0;
                if(p2.setRegisteredHit(projectile.getAttackState(p2.Hits[projectile.Id]),projectile.getHitState(p2.Hits[projectile.Id]),projectile.FlagsToSend,frame,projectile.BaseDamage,projectile.EnergyToAdd,false,true,hitX,hitY,projectile.Direction,p1.Id,projectile.getHitId(frame),projectile.Id,projectile.OverrideFlags,projectile.Owner,projectile.Fx,projectile.Fy,0,0,projectile.HitSound,projectile.BlockSound,projectile.getHitStop(),projectile.MaxHits,projectile.Params))
                {
                    p1.changeEnergy(projectile.EnergyToAdd);
                    projectile.hitPlayer(frame);
                }
            }
            else
            {
                /*test against the other player's projectiles*/
                for(var i = 0; i < p2.Projectiles.length; ++i)
                    this.tryProjectileHitProjectile(frame,x0,x1,y0,y1,projectile,p2.Projectiles[i]);
            }
        }

    }
    /*Handles projectiles hitting another projectile*/
    CDHelper.prototype.tryProjectileHitProjectile = function(frame,x0,x1,y0,y1,projectile,otherProjectile)
    {
        if(!!projectile.IsDisintegrating || !!otherProjectile.IsDisintegrating)
            return;
        if(!otherProjectile.IsActive)
            return;
        var otherProjectileBottom = parseInt(otherProjectile.Element.style.bottom);
        var otherProjectileTop = parseInt(otherProjectile.Element.style.bottom) + parseInt(otherProjectile.Element.style.height);
        var otherProjectileLeft = 0;
        var otherProjectileRight = 0;

        if(projectile.Direction < 0)
        {
            otherProjectileRight = STAGE.MAX_STAGEX - parseInt(otherProjectile.Element.style.right);
            otherProjectileLeft = STAGE.MAX_STAGEX - parseInt(otherProjectile.Element.style.right) - parseInt(otherProjectile.Element.style.width);

            if(((x0 >= otherProjectileLeft && x0 < otherProjectileRight) || (x1 >= otherProjectileLeft && x1 < otherProjectileRight)) && ((y0 >= otherProjectileBottom && y0 < otherProjectileTop) || (y1 >= otherProjectileBottom && y1 < otherProjectileTop)))
            {
                /*the projectiles may nullify, or one may vaporize the other - e.g. super moves*/
                projectile.hitProjectile(frame,otherProjectile)
            }
        }
        else
        {
            otherProjectileLeft = parseInt(otherProjectile.Element.style.left);
            otherProjectileRight = parseInt(otherProjectile.Element.style.width) + parseInt(otherProjectile.Element.style.left);

            if(((x1 >= otherProjectileLeft && x1 < otherProjectileRight) || (x0 >= otherProjectileLeft && x0 < otherProjectileRight)) && ((y0 >= otherProjectileBottom && y0 < otherProjectileTop) || (y1 >= otherProjectileBottom && y1 < otherProjectileTop)))
            {
                /*the projectiles may nullify, or one may vaporize the other - e.g. super moves*/
                projectile.hitProjectile(frame,otherProjectile)
            }
        }
    }


    CDHelper.prototype.moveOtherPlayers = function(player)
    {
        var myRect = player.getRect();
        var collisions = GetPlayersAtPosition_(myRect,player).reverse();
        for(var i = 0, length = collisions.length; i < length; ++i)
        {
            var otherPlayer = collisions[i];
            var otherRect = otherPlayer.getRect();

            if(otherPlayer.getMidX() >= player.getMidX()) /*must move to the right. If there isn't enough space, then move to the left*/
            {
                var deltaX = 0;
                if(otherPlayer.Direction == 1)
                {
                    deltaX = otherRect.Left - myRect.Right;
                    if((Math.abs(deltaX) + otherRect.Right) > STAGE.MAX_STAGEX)
                        deltaX = otherRect.Right - myRect.Left;
                }
                else
                {
                    deltaX = myRect.Right - otherRect.Left;
                    if((deltaX + otherRect.Right) > STAGE.MAX_STAGEX)
                        deltaX = myRect.Left - otherRect.Right;
                }
                this.moveX(deltaX,otherPlayer,false,false,false,player.Id);
            }
            else /*must move to the left. If there isn't enough space, then move to the right*/
            {
                var deltaX = 0;
                if(otherPlayer.Direction == 1)
                {
                    deltaX = otherRect.Right - myRect.Left;
                    if((otherRect.Left - deltaX) < STAGE.MIN_STAGEX)
                        deltaX = otherRect.Left - myRect.Right;
                }
                else
                {
                    deltaX = myRect.Left - otherRect.Right;
                    if((otherRect.Left - Math.abs(deltaX)) < STAGE.MIN_STAGEX)
                        deltaX = myRect.Right - otherRect.Left;
                }
                this.moveX(deltaX,otherPlayer,false,false,false,player.Id);
            }
        }
    }


    CDHelper.prototype.fixX = function(amount,player,dontOverrideSign,canFixStageX)
    {
        if(!!amount)
        {
            var originalAmount = amount;
            if(!dontOverrideSign)
            {
                /*the amount is relative to the players direction, so it must be converted to "left/right" positive being right, and negative being left*/
                if(player.Direction > 0)
                {
                    if(amount > 0) {amount = -Math.abs(amount);} else {amount = Math.abs(amount);}
                } 
                else
                {
                    if(amount > 0) {amount = Math.abs(amount);} else {amount = -Math.abs(amount);}
                }
            }
            var direction = amount / Math.abs(amount);

            player.moveCircleToBottom();
            var match = getMatch();
            var myRect = player.getRect();
            var stageFixX = 0;

            if(amount > 0) /*moving right*/
            {
                amount = match.getStage().clampX(myRect.Right,amount);
                if(!amount) return amount;

                myRect.OldRight = myRect.Right;
                myRect.Right += amount;

                var collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.RIGHT_AND_CHECK_LEFT).reverse();
                for(var i = 0, length = collisions.length; i < length; ++i)
                {
                    collisions[i].moveCircleToTop();
                    var otherRect = collisions[i].getRect();

                    var impededAmount = myRect.Right - otherRect.Left;

                    if(!!impededAmount)
                    {
                        if(myRect.Right <= otherRect.Right)
                        {
                            this.moveX(-impededAmount,player,true,false,true);
                        }
                        else
                        {
                            impededAmount = Math.abs(otherRect.Right - myRect.Left) * direction;
                            this.moveX(impededAmount,player,true,false,true);
                        }
                    }
                }
            }
            else /*moving left*/
            {
                amount = match.getStage().clampX(myRect.Left,amount);
                if(!amount) return amount;

                myRect.OldLeft = myRect.Left;
                myRect.Left += amount;


                var collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.LEFT_AND_CHECK_RIGHT).reverse();
                for(var i = 0, length = collisions.length; i < length; ++i)
                {
                    collisions[i].moveCircleToTop();
                    var otherRect = collisions[i].getRect();

                    var impededAmount = myRect.Left - otherRect.Right;

                    if(!!impededAmount)
                    {
                        if(myRect.Left >= otherRect.Left)
                        {
                            this.moveX(-impededAmount,player,true,false,true);
                        }
                        else
                        {
                            impededAmount = Math.abs(myRect.Right - otherRect.Left) * direction;
                            this.moveX(impededAmount,player,true,false,true);
                        }
                    }
                }
            }
        }


        return amount;
    }



    CDHelper.prototype.moveX = function(amount,player,dontOverrideSign,canFixStageX,doubleImpededAmount,ignoredPlayer)
    {
        if(!!amount)
        {
            var originalAmount = amount;
            if(!dontOverrideSign)
            {
                /*the amount is relative to the players direction, so it must be converted to "left/right" positive being right, and negative being left*/
                if(player.Direction > 0)
                {
                    if(amount > 0) {amount = -Math.abs(amount);} else {amount = Math.abs(amount);}
                } 
                else
                {
                    if(amount > 0) {amount = Math.abs(amount);} else {amount = -Math.abs(amount);}
                }
            }

            player.moveCircleToBottom();
            var match = getMatch();
            var myRect = player.getRect(); //!!player.IsInAttackFrame ? player.getImgRect() : player.getRect();
            var stageFixX = 0;

            if(amount > 0) /*moving right*/
            {
                amount = match.getStage().clampX(myRect.Right,amount);
                if(!amount) return amount;

                myRect.OldRight = myRect.Right;
                myRect.Right += amount;

                var collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.RIGHT);
                for(var i = 0, length = collisions.length; i < length; ++i)
                {
                    if(player.Flags.Pose.has(POSE_FLAGS.ALLOW_OVERLAP))
                        continue;
                    if(!!ignoredPlayer && (ignoredPlayer == collisions[i].Id))
                        continue;

                    collisions[i].moveCircleToTop();
                    var otherRect = collisions[i].getRect();

                    var impededAmount = myRect.Right - otherRect.Left;
                    var unimpededAmount = otherRect.Left - myRect.OldRight;

                    var amountPushed = 0;

                    if(!!impededAmount)
                    {
                        if(collisions[i].isRightCornered())
                            impededAmount = getStage().moveX(impededAmount/2);

                        /*if both players are on the ground, or both players in air, then they can push each other*/
                        if((player.isOnGround() && collisions[i].isOnGround()) || (!player.isOnGround() && !collisions[i].isOnGround()) || (collisions[i].isRightCornered()))
                        {
                            amountPushed = this.moveX(!!doubleImpededAmount ? impededAmount : impededAmount/2,collisions[i],true,false,true);
                        }
                        /*if a player is on the ground, then they can not push each other - unless room needs to be made for the airborne player to land*/
                        else if(player.Y != collisions[i].Y)
                        {
                            amountPushed = 0;
                            //unimpededAmount = 0;
                            stageFixX = impededAmount;
                        }
                    }
                    amount = unimpededAmount + amountPushed;
                }
                /*if the player is right cornered, then other players must be moved out of the way*/
                if(player.isRightCornered())
                {
                    collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.LEFT);
                    for(var i = 0, length = collisions.length; i < length; ++i)
                    {
                        if(!!ignoredPlayer && (ignoredPlayer == collisions[i].Id))
                            continue;
                        collisions[i].moveCircleToTop();
                        var otherRect = collisions[i].getRect();

                        var impededAmount = myRect.Left - otherRect.Right;

                        var amountPushed = 0;
                        if(!!impededAmount)
                        {
                            if(collisions[i].isLeftCornered())
                                impededAmount = getStage().moveX(impededAmount/2);

                            this.moveX(impededAmount,collisions[i],true);
                        }
                    }
                }

            }
            else /*moving left*/
            {
                amount = match.getStage().clampX(myRect.Left,amount);
                if(!amount) return amount;

                myRect.OldLeft = myRect.Left;
                myRect.Left += amount;


                var collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.LEFT);
                for(var i = 0, length = collisions.length; i < length; ++i)
                {
                    if(player.Flags.Pose.has(POSE_FLAGS.ALLOW_OVERLAP))
                        continue;
                    if(!!ignoredPlayer && (ignoredPlayer == collisions[i].Id))
                        continue;
                    collisions[i].moveCircleToTop();
                    var otherRect = collisions[i].getRect();

                    var impededAmount = myRect.Left - otherRect.Right;
                    var unimpededAmount =  otherRect.Right - myRect.OldLeft;

                    var amountPushed = 0;
                    if(!!impededAmount)
                    {
                        if(collisions[i].isLeftCornered())
                            impededAmount = getStage().moveX(impededAmount/2);
                        /*if both players are on the ground, or both players in air, then they can push each other*/
                        if((player.isOnGround() && collisions[i].isOnGround()) || (!player.isOnGround() && !collisions[i].isOnGround()) || (collisions[i].isRightCornered()))
                        {
                            amountPushed = this.moveX(!!doubleImpededAmount ? impededAmount : impededAmount/2,collisions[i],true,false,true);
                        }
                        /*if a player is on the ground, then they can not push each other - unless room needs to be made for the airborne player to land*/
                        else if(player.Y != collisions[i].Y)
                        {
                            amountPushed = 0;
                            //unimpededAmount = 0;
                            stageFixX = impededAmount;
                        }
                    }

                    amount = unimpededAmount + amountPushed;
                }
                /*if the player is left cornered, then other players must be moved out of the way*/
                if(player.isLeftCornered())
                {
                    collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.RIGHT);
                    for(var i = 0, length = collisions.length; i < length; ++i)
                    {
                        if(!!ignoredPlayer && (ignoredPlayer == collisions[i].Id))
                            continue;
                        collisions[i].moveCircleToTop();
                        var otherRect = collisions[i].getRect();

                        var impededAmount = myRect.Right - otherRect.Left;

                        if(!!impededAmount)
                        {
                            if(collisions[i].isRightCornered())
                                impededAmount = getStage().moveX(impededAmount/2);

                            this.moveX(impededAmount,collisions[i],true);
                        }
                    }
                }

            }
            amount = player.warpX(amount,true);
            if(!!canFixStageX && !!stageFixX)
                getStage().fixX(stageFixX);
        }


        return amount;
    }



    /* Returns the amount that can actually be used */
    CDHelper.prototype.moveY = function(amount,player)
    {
        if(!!amount)
        {
            var myRect = player.getRect();
            var myMidX = player.getMidX();
            if(amount > 0) /*moving up*/
            {
                amount = getStage().clampY(myRect.Top,amount);
                if(!amount) return amount;
                player.moveCircleToTop();

                myRect.OldTop = myRect.Top;
                myRect.Top += amount;

                var collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.UP);
                for(var i = 0, length = collisions.length; i < length; ++i)
                {
                    var otherPlayer = collisions[i];
                    otherPlayer.moveCircleToBottom();
                    var otherMidX = otherPlayer.getMidX();
                    var amountRejected = player.Flags.Pose.has(POSE_FLAGS.ALLOW_OVERLAP) ? 0 : player.Circle.rejectX(otherPlayer.Circle);
                
                
                    if(!!amountRejected)
                    {
                        if(myMidX > otherMidX) /*on right side of the other player*/
                        {
                            amountRejected = Math.abs(amountRejected);
                            /*must move the current player away from the play that was contacted*/
                            if(player.isRightCornered())
                                this.moveX(-amountRejected,otherPlayer,true);
                            else
                                this.moveX(amountRejected,player,true);
                        }
                        else /*on left side of other player*/
                        {
                            amountRejected = -Math.abs(amountRejected);
                            /*must move the current player away from the play that was contacted*/
                            if(player.isLeftCornered())
                                this.moveX(-amountRejected,otherPlayer,true);
                            else
                                this.moveX(amountRejected,player,true);
                        }
                    }
                }
            }
            else /*moving down*/
            {
                amount = getStage().clampY(myRect.Bottom,amount);
                if(!amount) return amount;
                player.moveCircleToBottom();

                myRect.OldBottom = myRect.Bottom;
                myRect.Bottom += amount;


                var collisions = GetPlayersAtPosition_(myRect,player,CONSTANTS.DOWN);
                for(var i = 0, length = collisions.length; i < length; ++i)
                {
                    var otherPlayer = collisions[i];
                    var otherRect = otherPlayer.getRect();
                    otherPlayer.moveCircleToTop();
                    var otherMidX = otherPlayer.getMidX();
                    var amountRejected = player.Flags.Pose.has(POSE_FLAGS.ALLOW_OVERLAP) ? 0 : player.Circle.rejectX(otherPlayer.Circle);
                
                    if(!!amountRejected)
                    {
                        if(myMidX > otherMidX) /*on right side of the other player*/
                        {
                            amountRejected = Math.abs(amountRejected);
                            /*must move the current player away from the play that was contacted*/
                            if(player.isRightCornered())
                                this.moveX(-amountRejected,otherPlayer,true);
                            else
                                this.moveX(amountRejected,player,true);
                        }
                        else /*on left side of other player*/
                        {
                            amountRejected = -Math.abs(amountRejected);
                            /*must move the current player away from the play that was contacted*/
                            if(player.isLeftCornered())
                                this.moveX(-amountRejected,otherPlayer,true);
                            else
                                this.moveX(amountRejected,player,true);
                        }
                    }
                    /*special case: when the airborne player is jumping and cornered*/
                    else if(HasIntersection_(player, otherPlayer) && (player.isLeftCornered() || player.isRightCornered()))
                    {
                        if(myMidX > otherMidX) /*on right side of the other player*/
                        {
                            amountRejected = myRect.Left - otherRect.Right;
                            /*must move the current player away from the play that was contacted*/
                            this.moveX(amountRejected,otherPlayer,true);
                        }
                        else /*on left side of other player*/
                        {
                            amountRejected = myRect.Right - otherRect.Left;
                            /*must move the current player away from the play that was contacted*/
                            this.moveX(amountRejected,otherPlayer,true);
                        }
                    }
                }
            }
            amount = player.warpY(amount);
        }
        //getStage().scrollY();

        if(!!amount)
            getStage().requestScrollY(amount > 0, player.Y);
        return amount;
    }


    /*Returns true if any player is airborne*/
    CDHelper.prototype.isAnyPlayerAirborne = function()
    {
        var match = getMatch();
        for(var i = 0, length = match.getTeamB().getPlayers().length; i < length; ++i)
            if(match.getTeamB().getPlayer(i).isAirborne())
                return true;
        for(var i = 0, length = match.getTeamA().getPlayers().length; i < length; ++i)
            if(match.getTeamA().getPlayer(i).isAirborne())
                return true;

        return false;
    }


    /*Returns the player closest to the left side of the screen*/
    CDHelper.prototype.getLeftMostPlayer = function()
    {
        var match = getMatch();

        var minX = 9999;
        var retVal = null;

        var tALength = match.getTeamA().getPlayers().length;
        var tBLength = match.getTeamB().getPlayers().length;

        if(!tALength || !tBLength)
            return null;

        for(var i = 0; i < tALength; ++i)
        {
            if(match.getTeamA().getPlayer(i).getLeftX() < minX)
            {
                minX = match.getTeamA().getPlayer(i).getLeftX();
                retVal = match.getTeamA().getPlayer(i);
            }
        }
        for(var i = 0; i < tBLength; ++i)
        {
            if(match.getTeamB().getPlayer(i).getLeftX() < minX)
            {
                minX = match.getTeamB().getPlayer(i).getLeftX();
                retVal = match.getTeamB().getPlayer(i);
            }
        }

        return retVal;
    }
    /*Returns the player closest to the right side of the screen*/
    CDHelper.prototype.getRightMostPlayer = function()
    {
        var match = getMatch();

        var maxX = -9999;
        var retVal = null;

        var tALength = match.getTeamA().getPlayers().length;
        var tBLength = match.getTeamB().getPlayers().length;

        if(!tALength || !tBLength)
            return null;

        for(var i = 0; i < tALength; ++i)
        {
            if(match.getTeamA().getPlayer(i).getLeftX() > maxX)
            {
                maxX = match.getTeamA().getPlayer(i).getLeftX();
                retVal = match.getTeamA().getPlayer(i);
            }
        }
        for(var i = 0; i < tBLength; ++i)
        {
            if(match.getTeamB().getPlayer(i).getLeftX() > maxX)
            {
                maxX = match.getTeamB().getPlayer(i).getLeftX();
                retVal = match.getTeamB().getPlayer(i);
            }
        }

        return retVal;
    }
    /**/
    CDHelper.prototype.isLeftMostPlayer = function(id)
    {
        var p = this.getLeftMostPlayer();
        return !!p && p.Id == id;
    }
    /**/
    CDHelper.prototype.isRightMostPlayer = function(id)
    {
        var p = this.getRightMostPlayer();
        return !!p && p.Id == id;
    }

    /*checks if any player from ther other team is within the given distance*/
    CDHelper.prototype.getGrappledPlayer = function(team,x,y,distance,airborneFlags,isAirborne,grappleDirection)
    {
        var match = getMatch();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0, length = match.getTeamB().getPlayers().length; i < length; ++i)
                    if(match.getTeamB().getPlayer(i).canBeGrappled(x,y,distance,airborneFlags,isAirborne,grappleDirection))
                        return match.getTeamB().getPlayer(i);
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0, length = match.getTeamA().getPlayers().length; i < length; ++i)
                    if(match.getTeamA().getPlayer(i).canBeGrappled(x,y,distance,airborneFlags,isAirborne,grappleDirection))
                        return match.getTeamA().getPlayer(i);
                break;
            }
        }
        return null;
    }

    /*checks if players are within the given distance*/
    CDHelper.prototype.isWithinDistanceX = function(p1,p2,distance,useFront)
    {
        if(!useFront)
        {
            var x = p1.getMidX();
            return (
                   (Math.abs(x - p2.getMidX()) < distance)
                );
        }
        else
        {
            var p1Rect = p1.getImgRect();
            var p2Rect = p2.getImgRect();

            if(p1Rect.Left < p2Rect.Left)
            {
                //on left side
                return (p2Rect.Left - p1Rect.Right) < distance;
            }
            else
            {
                //on right side
                return (p1Rect.Left - p2Rect.Right) < distance;
            }
        }
    }

    /*checks if players are within the given distance*/
    CDHelper.prototype.getImgDistanceX = function(p1,p2)
    {
        return (p1.LeftOffset < p2.LeftOffset)
            //on left side
            ? p2.LeftOffset - p1.RightOffset
            //on right side
            : p1.LeftOffset - p2.RightOffset;
    }

    /*returns the distance between the 2 players*/
    CDHelper.prototype.getDistanceX = function(p1,p2)
    {
        return Math.abs(p1.getMidX() - p2.getMidX());
    }

    /*returns the initial velocity need to make up the distance between the 2 players*/
    CDHelper.prototype.getInitialCloseGapVelocityX = function(p1,p2,vy)
    {
        var x1 = !!p1 ? p1.getMidX() : 0;
        var x2 = !!p2 ? p2.getMidX() : 0;
        return this.getVx(x1,x2,vy);
    }

    /*returns the initial velocity need to make up the distance between the 2 coordinates*/
    CDHelper.prototype.getVx = function(x1,x2,vy)
    {
        return (Math.abs(x1 - x2) * CONSTANTS.G) / (2 * vy) * 5;
    }

    /*Returns true if any player from the other team is on the left*/
    CDHelper.prototype.isAnyPlayerFromOtherTeamMoreLeft = function(x,team)
    {
        var match = getMatch();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                var nbPlayers = match.getTeamB().getPlayers().length;
                if(nbPlayers == 0 || !match.getTeamB().getPlayers().every(function(a){return a.isVisible();}))
                    return null;
                for(var i = 0; i < nbPlayers; ++i)
                    if(!!match.getTeamB().getPlayer(i).isVisible() && (match.getTeamB().getPlayer(i).getMidX() < x))
                        return true;
                break;
            }
            case CONSTANTS.TEAM2:
            {
                var nbPlayers = match.getTeamA().getPlayers().length;
                if(nbPlayers == 0 || !match.getTeamA().getPlayers().every(function(a){return a.isVisible();}))
                    return null;
                for(var i = 0; i < nbPlayers; ++i)
                    if(!!match.getTeamA().getPlayer(i).isVisible() && (match.getTeamA().getPlayer(i).getMidX() < x))
                        return true;
                break;
            }
        }
        return false;
    }

    /*Returns true if any player from the other team is on the right*/
    CDHelper.prototype.isAnyPlayerFromOtherTeamMoreRight = function(x,team)
    {
        var match = getMatch();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                var nbPlayers = match.getTeamB().getPlayers().length;
                if(nbPlayers == 0 || !match.getTeamB().getPlayers().every(function(a){return a.isVisible();}))
                    return null;
                for(var i = 0; i < nbPlayers; ++i)
                    if(!!match.getTeamB().getPlayer(i).isVisible() && (match.getTeamB().getPlayer(i).getMidX() > x))
                        return true;
                break;
            }
            case CONSTANTS.TEAM2:
            {
                var nbPlayers = match.getTeamA().getPlayers().length;
                if(nbPlayers == 0 || !match.getTeamA().getPlayers().every(function(a){return a.isVisible();}))
                    return null;
                for(var i = 0; i < nbPlayers; ++i)
                    if(!!match.getTeamA().getPlayer(i).isVisible() && (match.getTeamA().getPlayer(i).getMidX() > x))
                        return true;
                break;
            }
        }
        return false;
    }

    CDHelper.prototype.getRearEnemy = function(myTeam, myDirection, myRect, myTarget)
    {
        match = getMatch();
        switch(myTeam)
        {
            case CONSTANTS.TEAM1:
            {
                var nbPlayers = match.getTeamB().getPlayers().length;
                for(var i = 0; i < nbPlayers; ++i)
                {
                    var foe = match.getTeamB().getPlayer(i);
                    var foeRect = foe.getRect();
                    if(myDirection == -1 && (myRect.Right > foeRect.Right))
                        return foe.Index;
                    else if(myDirection == 1 && (myRect.Left < foeRect.Left))
                        return foe.Index;
                }
                break;
            }
            case CONSTANTS.TEAM2:
            {
                var nbPlayers = match.getTeamA().getPlayers().length;
                for(var i = 0; i < nbPlayers; ++i)
                {
                    var foe = match.getTeamA().getPlayer(i);
                    var foeRect = foe.getRect();
                    if(myDirection == -1 && (myRect.Right > foeRect.Right))
                        return foe.Index;
                    else if(myDirection == 1 && (myRect.Left < foeRect.Left))
                        return foe.Index;
                }
                break;
            }
        }
        return myTarget;
    }

    return new CDHelper();
}

//var cd_ = CreateCDHelper();