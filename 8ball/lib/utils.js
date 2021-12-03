/* box2d abbreviations */
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	b2PolygonDef = Box2D.Collision.Shapes.b2PolygonDef,
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

/* useful classes */
function Point(x,y) {
	this.x = x;
	this.y = y;
};

function getMousePos(evt) {
    var rect = CANVAS.getBoundingClientRect();
    return new Point(	evt.clientX - rect.left, 
    					evt.clientY - rect.top);
};

/* converte un punto del canvas in un punto del mondo box2d */
function p2b(p) {
	return new b2Vec2(p.x / SCALE, p.y / SCALE);
};
/* converte un punto del mondo box2d in un punto del canvas */
function b2p(p) {
	return new Point(p.x * SCALE, p.y * SCALE);
};
/* calcola il punto medio fra due punti */
function centerPoint(a,b) {
	return new Point((a.x + b.x) / 2, (a.y + b.y) / 2);
};
/* calcola la distanza fra due punti */
function distanceBetween(a,b) {
	return Math.sqrt(Math.pow(Math.abs(a.x-b.x), 2)+Math.pow(Math.abs(a.y-b.y), 2));
};
function calculateFontSize(ctx, font, maxW, maxH, text) {
	var size = 0;
	var width, height;
	
	do {
		size++;
		ctx.font = String(size)+"px " + font;
		width = ctx.measureText(text).width;
		height = fontSize2Height(size);
	} while (width <= maxW && height <= maxH);

	return size - 1;
};
function loadDefault() {
	localStorage.setItem("1", SLOT1);
	localStorage.setItem("2", SLOT2);
	localStorage.setItem("3", SLOT3);
	localStorage.setItem("4", SLOT4);
	localStorage.setItem("5", SLOT5);
};
function fontSize2Height(size) {
	return size*0.7;
};
function fontHeight2Size(height) {
	return height/0.7;
};
function random(min, max) {
	return Math.floor(min + (Math.random()*1000)%(max-min+1));
}
