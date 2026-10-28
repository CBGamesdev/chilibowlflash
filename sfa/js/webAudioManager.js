var CreateWebAudioManager = function () {
	if (!window.AudioContext && !window.webkitAudioContext)
		return null;

	var getWebAudioContext = function () {
		if (!!window.AudioContext)
			return new AudioContext();
		else
			return new webkitAudioContext();
	};

	var context_ = getWebAudioContext();
	var items_ = {};
	var sounds_ = [];
	var extension_ = ".ogg";
	var id_ = 0;
	var nbLoading_ = 0;
	var maxNbLoading_ = 0;
	var isEnabled_ = BrowserDetect.browser !== "Explorer";
	var pnlAudio = window.document.getElementById("pnlAudio");

	var WebAudioManager = function() {
		this.init();
	};

	WebAudioManager.prototype.init = function() {
		if (!!context_)
			return;

		var createWebAudioContext = (function (context) {
			return function () {
				context = getWebAudioContext();
			}
		})(context_);

		if (!!window.attachEvent) {
			window.attachEvent('onload', createWebAudioContext, true);
		} else {
			window.addEventListener('load', createWebAudioContext, true);
		}
	};

	WebAudioManager.prototype.isLoading = function() {
		return nbLoading_ !== maxNbLoading_;
	};

	WebAudioManager.prototype.onLoadingChanged = function() {
		if (nbLoading_ !== maxNbLoading_) {
			pnlAudio.innerHTML = nbLoading_ + "/" + maxNbLoading_;
			pnlAudio.className = "loading";
		} else {
			pnlAudio.className = "done-loading";
			pnlAudio.innerHTML = "done";
			game_.onAudioDoneLoading();
		}
	};

	WebAudioManager.prototype.onStartLoading = function() {
		++maxNbLoading_;
		this.onLoadingChanged();
		game_.onAudioLoading();
	};

	WebAudioManager.prototype.onDoneLoading = function() {
		++nbLoading_;
		this.onLoadingChanged();
	};

	WebAudioManager.prototype.setBuffer = function (key, thisRef) {
		return function (buffer) {
			items_[key].Elements[0] = buffer;
			thisRef.onDoneLoading();
		}
	};

	WebAudioManager.prototype.onError = function (key, thisRef) {
		return function (err) {
			console.log("Error loaing [" + key + "]. " + err);
			thisRef.onDoneLoading();
		}
	};

	WebAudioManager.prototype.loadBase64 = function (path, nbChannels, defaultVolume, base64Data, loop) {
		if (!!__debugMode || !isEnabled_) return;
		if (!items_[path]) {
			//nbChannels = nbChannels || 1;
			nbChannels = 1;
			try {
				items_[path] = {
					Channels: nbChannels
					, CurrentChannel: 0
					, Elements: []
					, Source: null
					, DefaultVolume: defaultVolume || 1
					, Loops: loop || false
					, PausedAt: 0
					, StartedAt: 0
					, StartOffset: 0
				};
				for (var i = 0; i < nbChannels; ++i) {
					this.onStartLoading();
					var byteArray = Base64Binary.decodeArrayBuffer(base64Data.replace("data:audio/ogg;base64,", ""));
					context_.decodeAudioData(byteArray, this.setBuffer(path, this), this.onError(path, this));
				}

			} catch (err) {
				items_[path] = null;
			}
		}

		return path;
	};

	WebAudioManager.prototype.play = function (path) {
		if (!isEnabled_)
			return;

		if (!!items_[path]) {
			var buffer = items_[path].Elements[0];
			if (!!buffer && !items_[path].IsPlaying) {
				var source = context_.createBufferSource();
				source.buffer = buffer;
				source.loop = items_[path].Loops;
				source.connect(context_.destination);

				source.start(0, items_[path].StartOffset % buffer.duration);
				items_[path].Source = source;
				items_[path].StartedAt = context_.currentTime;

				//enure we can't play looping sounds (theme music) multiple times!
				if (items_[path].Loops)
					items_[path].IsPlaying = true;
			}
		}
	};

	WebAudioManager.prototype.pause = function (path) {
		if (!!items_[path]) {
			var buffer = items_[path].Elements[0];
			if (!!buffer) {
				var source = items_[path].Source;
				if (!!source) {
					items_[path].StartOffset += context_.currentTime - items_[path].StartedAt;
					source.disconnect();
					source.stop();
				}
				items_[path].Source = null;
				items_[path].IsPlaying = false;
			}
		}
	};

	WebAudioManager.prototype.stop = function (path) {
		if (!!items_[path]) {
			this.pause(path);
			items_[path].StartOffset = 0;
		}
	};

	WebAudioManager.prototype.stopAll = function() {
		for (var i in items_) {
			this.stop(i);
		}
	};

	return new WebAudioManager();
};
