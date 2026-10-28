var CreateUtils = function() {
	var loadingCount_ = 0;

	var Utils = function() {};

	Utils.prototype.addBase64Audio = function (src, callbackFn, context) {
		src = "js/sounds/" + src.replace(".js", soundManager_.getExtension()) + ".js";
		return this.addScript(src, callbackFn, context);
	};

	Utils.prototype.addBase64Image = function (src, callbackFn, context) {
		return this.addScript(src, callbackFn, context);
	};

	Utils.prototype.addScript = function (src, callbackFn, context) {
		if (!window.document.getElementById(src)) {
			var script = window.document.createElement("script");
			script.id = src;
			script.src = src;
			script.type = "text/javascript";
			script.onload = (function (startTime, onload, thisValue) {
				return function () {
					var duration = Date.now() - startTime;
					if (!!onload) {
						if (!!thisValue)
							onload.call(thisValue);
						else
							onload();
					}
				}
			})(Date.now(), callbackFn, context);
			script.onerror = function() {
				Alert("not found");
			};
			window.document.body.appendChild(script);
			return true;
		} else
			return false;
	};

	Utils.prototype.releaseArray = function (arr) {
		while (arr.length > 0) {
			if (!!arr[0].release)
				arr[0].release();

			delete arr[0];
			arr.splice(0, 1);
		}
	};

	Utils.prototype.clearElement = function (element) {
		if (!!element.src)
			element.src = "";
		if (!!element.className)
			element.className = "";
		if (!!element.style)
			element.style.backgroundImage = "";
	};

	Utils.prototype.removeFromDOM = function (element) {
		if (!!element) {
			while (element.children.length > 0)
				utils_.removeChildrenFromDOM(element.children[0]);

			var parentNode = element.parentNode;
			if (!!parentNode) {
				this.clearElement(element);
				parentNode.removeChild(element);
			} else {
				this.clearElement(element);
				element = null;
			}
		}
	};

	Utils.prototype.removeChildrenFromDOM = function (element, keepOrginalElement) {
		if (!!element) {
			if (!element.parentNode) {
				if (!keepOrginalElement) {
					this.clearElement(element);
					element = null;
				}
			} else if (element.children.length === 0) {
				if (!keepOrginalElement) {
					this.clearElement(element);
					element.parentNode.removeChild(element);
				}
			} else {
				while (element.children.length > 0) {
					utils_.removeChildrenFromDOM(element.children[0]);
				}
			}
		}
	};

	return new Utils();
};

var utils_ = CreateUtils();

var CreateStuffLoader = function() {
	var stuff_ = {};
	var nbElements_ = 0;
	var callback_ = null;
	var context_ = null;
	var reportProgressCallback_ = null;

	var Report_ = function () {
		if (!!reportProgressCallback_) {
			reportProgressCallback_.call(context_ || window, nbElements_);
		}
	};

	var OnDone_ = function (loader, index) {
		/*every time something finishes loading, this function will be executed*/
		if (!--nbElements_) {
			if (!!callback_) {
				callback_.call(context_ || window);
			}
			//stuff_ = {};

			//callback_ = null;
		}
		if (!!stuff_[index]) {
			stuff_[index].State = LOADING_STATES.DONE;
		}
		Report_();
	};

	var DownloadImage_ = function (index) {
		if (!window.document.images.namedItem(index)) {
			/*add image to the DOM, but off screen*/
			var img = new Image();
			img.onload = CreateOnDoneCallback_(index);
			img.id = index;
			img.style.position = "absolute";
			img.style.display = "none";
			img.style.top = "10000px";
			img.src = stuff_[index].Src;
			//window.document.body.appendChild(img);
		} else {
			CreateOnDoneCallback_(index)();
		}
	};

	var DownloadBase64Image_ = function (index) {
		if (!utils_.addBase64Image(stuff_[index].Src, CreateOnDoneCallback_(index)))
			OnDone_(null, index);
	};

	var DownloadBase64Audio_ = function (index) {
		if (!utils_.addBase64Audio(stuff_[index].Src, CreateOnDoneCallback_(index)))
			OnDone_(null, index);
	};

	var DownloadScript_ = function (index) {
		if (!utils_.addScript(stuff_[index].Src, CreateOnDoneCallback_(index)))
			OnDone_(null, index);
	};

	/***********************/
	var StuffLoader = function() {};

	StuffLoader.prototype.queue = function (src, type) {
		if (!stuff_[src]) {
			stuff_[src] = {Type: type, State: LOADING_STATES.WAITING, Src: src};
		}
	};

	StuffLoader.prototype.start = function (reportProgressCallback, callback, context) {
		for (var i in stuff_)
			++nbElements_;

		if (!nbElements_) {
			callback.call(context || window);
			return;
		}

		callback_ = callback;
		context_ = context;
		reportProgressCallback_ = reportProgressCallback;

		Report_();

		for (var i in stuff_) {
			if (stuff_[i].State === LOADING_STATES.WAITING) {
				switch (stuff_[i].Type) {
					case RESOURCE_TYPES.IMAGE: {
						DownloadImage_(i);
						break;
					}
					case RESOURCE_TYPES.BASE64AUDIO: {
						DownloadBase64Audio_(i);
						break;
					}
					case RESOURCE_TYPES.BASE64IMAGE: {
						DownloadBase64Image_(i);
						break;
					}
					case RESOURCE_TYPES.SCRIPT: {
						DownloadScript_(i);
						break;
					}
				}
			}
		}
		stuff_ = {};
	};

	var instance = new StuffLoader();

	var CreateOnDoneCallback_ = (function (thisRef) {
		return function (index) {
			return function () {
				OnDone_(thisRef, index);
			}
		}
	})(instance);

	return instance;
};

var stuffLoader_ = CreateStuffLoader();