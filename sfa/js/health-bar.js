/*logic for the health bar*/

var HEALTHBAR = 
{
    LIFE_OFFSETX:-292
    ,DAMAGE_OFFSETX:-288
    ,ANIMATION_RATE:2
    ,MAX:288
};
var CreateHealthBar = function(pnlHealthbarID,team)
{
    var damageMultiplier_ = 1;

    var HealthBar = function()
    {
        this.Max = HEALTHBAR.MAX;
        this.Amount = this.Max;
        this.CurrentDamage = 0;
        this.HealthbarElement = window.document.getElementById(pnlHealthbarID);
        this.DamageElement = null;
        this.LifeElement = null;
        this.Team = team;
        this.IsInitialized = false;
    }

    HealthBar.prototype.getMax = function() { return this.Max; }
    HealthBar.prototype.setMax = function(value) { this.Max = value; }
    HealthBar.prototype.getAmount = function() { return this.Amount; }
    HealthBar.prototype.setAmount = function(value) { this.Amount = value; }
    HealthBar.prototype.getCurrentDamage = function() { return this.CurrentDamage; }
    HealthBar.prototype.setCurrentDamage = function(value) { this.CurrentDamage = value; }
    HealthBar.prototype.getHealthbarElement = function() { return this.HealthbarElement; }
    HealthBar.prototype.setHealthbarElement = function(value) { this.HealthbarElement = value; }
    HealthBar.prototype.getDamageElement = function() { return this.DamageElement; }
    HealthBar.prototype.setDamageElement = function(value) { this.DamageElement = value; }
    HealthBar.prototype.getLifeElement = function() { return this.LifeElement; }
    HealthBar.prototype.setLifeElement = function(value) { this.LifeElement = value; }
    HealthBar.prototype.getTeam = function() { return this.Team; }
    HealthBar.prototype.setTeam = function(value) { this.Team = value; }
    HealthBar.prototype.isInitialized = function() { return this.IsInitialized; }
    HealthBar.prototype.setInitialized = function(value) { this.IsInitialized = value; }



    /**/
    HealthBar.prototype.release = function()
    {
        utils_.removeChildrenFromDOM(this.HealthbarElement, true);
    }


    HealthBar.prototype.init = function()
    {
        var img = window.document.createElement("div");
        img.className = "health-bar-item";
        spriteLookup_.set(img,"images/misc/misc/health-bar.png");

        this.setDamageElement(window.document.createElement("div"));
        this.DamageElement.className = "damage";
        this.DamageElement.style.width = "0px";
        this.DamageElement.style.display = "none";
        this.setLifeElement(window.document.createElement("div"));
        this.LifeElement.className = "life";
        this.LifeElement.style.width = this.Amount + "px";

        this.HealthbarElement.appendChild(img);
        this.HealthbarElement.appendChild(this.LifeElement);
        this.HealthbarElement.appendChild(this.DamageElement);

        /*
        imageLookup_.getBgB64(img,"images/misc/bars-sprites.png");
        imageLookup_.getBgB64(this.DamageElement,"images/misc/health-bar-damage.png");
        imageLookup_.getBgB64(this.LifeElement,"images/misc/health-bar-life.png");
        imageLookup_.getBgB64(this.HealthbarElement,"images/misc/bars-sprites.png");
        */
        this.IsInitialized = true;
    }

    HealthBar.prototype.reset = function()
    {
        this.setCurrentDamage(0);
        if(this.getTeam() == 1)
            this.DamageElement.style.right = "";
        else if(this.getTeam() == 2)
            this.DamageElement.style.left = "";

        this.setAmount(this.Max);
        this.DamageElement.style.width = "0px";
        this.LifeElement.style.width = this.Amount + "px";
    }

    HealthBar.prototype.setDamageMultiplier = function(amount)
    {
        damageMultiplier_ = Math.max(amount,0);
    }

    //changes healthbar
    HealthBar.prototype.change = function(delta)
    {
        /*return this.Amount;*/

        delta *= damageMultiplier_;

        var newAmount = Math.min(Math.max(this.Amount - delta,0), this.Max);
        var damage = this.Amount - newAmount;
        this.LifeElement.style.width = newAmount + "px";
        if(!!damage)
        {
            this.setCurrentDamage(this.CurrentDamage + damage);
            var offset = HEALTHBAR.LIFE_OFFSETX + newAmount;
            if(this.getTeam() == 1)
                this.DamageElement.style.right = offset + "px";
            else if(this.getTeam() == 2)
                this.DamageElement.style.left = offset + "px";
            this.DamageElement.style.width = this.CurrentDamage + "px";
            this.DamageElement.style.display = "";
        }

        this.setAmount(newAmount);
        return this.Amount;
    }

    HealthBar.prototype.frameMove = function(frame)
    {
    }

    HealthBar.prototype.render = function(frame)
    {
        if(!!this.CurrentDamage && (frame % HEALTHBAR.ANIMATION_RATE == 0))
        {
            this.setCurrentDamage(this.CurrentDamage - 1)
            this.DamageElement.style.width = this.CurrentDamage + "px";
        }
    }
    return new HealthBar(pnlHealthbarID,team);
}