A5.u.drag.useDragScrolling = 'auto';
if (typeof DLG1_DlgObj == 'object') DLG1_DlgObj._destroy();
var DLG1_DlgObj = new A5.DialogComponentHelper('DLG1', {
	ajaxURL: '/',
	_embeddedMode: false,
	_livePreviewInBuilder: false,
	componentGUID: '99fc88dd-bda0-4137-8fc4-fd0100929fce',
	columnInfo: {
		'BUFFER0': {
			info: {
				controlType: 'Textbox'
			},
			hiddenVal: false,
			type: 'input,label',
			isCalc: false,
			hlp: '',
			isArray: false,
			dataType: 'C'
		},
		'BUFFER1': {
			info: {
				controlType: 'Textbox'
			},
			hiddenVal: false,
			type: 'input,label',
			isCalc: false,
			hlp: '',
			isArray: false,
			dataType: 'C'
		},
		'BUFFER2': {
			info: {
				controlType: 'Textbox'
			},
			hiddenVal: false,
			type: 'input,label',
			isCalc: false,
			hlp: '',
			isArray: false,
			dataType: 'C'
		},
		'THRESHOLD_CONTROL': {
			info: {
				controlType: 'Slider'
			},
			hiddenVal: false,
			type: 'control',
			isCalc: false,
			hlp: '',
			isArray: false,
			dataType: 'N'
		},
		'THRESHOLD_VALUE': {
			info: {
				controlType: 'Textbox'
			},
			hiddenVal: false,
			type: 'input,label',
			isCalc: false,
			hlp: '',
			isArray: false,
			dataType: 'C'
		},
		'MOTION_VALUE': {
			info: {
				controlType: 'Textbox'
			},
			hiddenVal: false,
			type: 'input,label',
			isCalc: false,
			hlp: '',
			isArray: false,
			dataType: 'C'
		}
	},
	originalValues: [{
		'THRESHOLD_CONTROL': '0',
		'BUFFER0': '',
		'BUFFER1': '',
		'BUFFER2': '',
		'THRESHOLD_VALUE': '',
		'MOTION_VALUE': ''
	}],
	defaultValues: {
		THRESHOLD_CONTROL: '0',
		BUFFER0: '',
		BUFFER1: '',
		BUFFER2: '',
		THRESHOLD_VALUE: '',
		MOTION_VALUE: ''
	},
	datePickerMonthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	datePickerDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	datePickerTodayButton: 'Today',
	datePickerCloseButton: '',
	datePickerFirstDayOfWeek: 1,
	resetFormMessage: 'Are you sure you want to reset the form?',
	resetFormTitle: 'Warning',
	resetFormIcon: 'css/MobBlue/MessageQuestion.png',
	dirtyFormMessage: 'You must first save your changes or cancel changes by clicking the Reset button.',
	dirtyFormTitle: 'Notice',
	dirtyFormIcon: 'css/MobBlue/MessageInfo.png',
	deleteRecordDialogTitle: 'Delete Record',
	deleteRecordDialogMessage: 'Are you sure you want to delete this record?',
	ssDateFormat: 'dd/MM/yyyy',
	styleName: 'MobBlue',
	_fieldHelpers_DIALOG2: [],
	parentComponentAlias: '',
	submitIfHasClientSideErrors: true,
	rowErrors: {
		showMessageBox: false,
		messageBoxTitle: 'Error',
		style: 'color: red; width: 6in; height: 2in;'
	},
	fieldErrors: {
		type: 'block',
		className: 'errorText',
		inputClassName: 'MobBlueEditError',
		edit: {
			container: {
				className: 'MobBlueEditBGError'
			}
		},
		icon: 'css/MobBlue/EditError.png',
		global: {
			contId: 'DLG1.GLOBALERRORS',
			hoverClassName: 'errorTextHighlight',
			hoverInputClassName: 'errorInputHighlight'
		}
	}
});
A5.__componentObj = DLG1_DlgObj;
DLG1_DlgObj._tabObjects = [];
// start A5.loadJavascript...
(function(doc, nav) {
	var video, width, height, context;
	var bufidx = 0,
		buffers = [];
	var currentStream;
	// True for user, false for environment
	var direction = true;

	function initialize() {
		video = document.getElementById("v");
		width = video.width;
		height = video.height;

		var canvas = document.getElementById("c");
		context = canvas.getContext("2d");

		for (var i = 0; i < 2; i++) {
			buffers.push(new Uint8Array(width * height));
		}

		var navigator = window.navigator;
		navigator.getUserMedia({
			video: {facingMode: direction ? 'user' : 'environment'}
		}, startStream, function() {});
		requestAnimationFrame(draw);
	}

	function startStream(stream) {
		currentStream = stream;
		video.src = URL.createObjectURL(stream);
		video.play();
	}

	function switchStream() {
		direction = !direction;
		video.pause();
		for (let track of currentStream.getTracks()) {
			track.stop();
		}
		var navigator = window.navigator;
		navigator.getUserMedia({
			video: {facingMode: direction ? 'user' : 'environment'}
		}, startStream, function() {});
	}

	function draw() {
		var frame = readFrame();
		if (frame) {
			markLightnessChanges(frame.data);
			context.putImageData(frame, 0, 0);
		}
		requestAnimationFrame(draw);
	}

	function readFrame() {
		try {
			context.drawImage(video, 0, 0, width, height);
		} catch (e) {
			return null;
		}
		return context.getImageData(0, 0, width, height);
	}

	function markLightnessChanges(data) {
		var buffer = buffers[bufidx++ % buffers.length];
		for (var i = 0, j = 0; i < buffer.length; i++, j += 4) {
			var current = lightnessValue(data[j], data[j + 1], data[j + 2]);
			data[j] = data[j + 1] = data[j + 2] = 0;
			data[j + 3] = 255 * lightnessHasChanged(i, current);
			buffer[i] = current;
		}

		var red = buffer[0];
		var green = buffer[1];
		var blue = buffer[2];
		var sum = Number(red) + Number(green) + Number(blue);

		DLG1_DlgObj.setValue('buffer0', red)
		DLG1_DlgObj.setValue('buffer1', green)
		DLG1_DlgObj.setValue('buffer2', blue)

		if (sum <= Number(DLG1_DlgObj.getValue('threshold_value'))) {
			DLG1_DlgObj.setValue('motion_value', sum);
		}
	}

	function lightnessHasChanged(index, value) {
		return buffers.some(function(buffer) {
			return Math.abs(value - buffer[index]) >= 15;
		});
	}

	function lightnessValue(r, g, b) {
		return (Math.min(r, g, b) + Math.max(r, g, b)) / 255 * 50;
	}

	window.addEventListener('load', initialize, false);
	// Add some hacky callback hooks.
	window._switchStream = switchStream;
})(document, navigator);

function trace() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i = 0; i < 9; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	DLG1_DlgObj.setValue('motion_value', text);
}
// end A5.loadJavascript
DLG1_DlgObj.lookups = {};
DLG1_DlgObj._onOrientationChange = function(e) {};
DLG1_DlgObj.setStateInfo({
	__dialogGuid: 'f5f43703-33f9-48b7-8775-31f398340b8a',
	argumentsBoundToCotrols: '',
	__sgr: '',
	__dtfmt: 'MM/dd/yyyy',
	__tfmt: ''
});
DLG1_DlgObj._cascadingControls = [];
DLG1_DlgObj._cascadingControlsChildren = [];
DLG1_DlgObj.setStateInfo({});
A5.msgBox.theme = 'MobBlue';
A5.msgBox.buttonWidth = '1in';
DLG1_DlgObj._defaultWindowTitleDirection = 'ltr';
DLG1_DlgObj._controlContainers = {}
DLG1_DlgObj._buttons = {};
DLG1_DlgObj._buttons['BUTTON_1'] = new A5.Button({
	layout: 'text',
	style: 'box-sizing: border-box; -moz-box-sizing: border-box; -ms-box-sizing: border-box; -webkit-box-sizing: border-box;',
	html: 'TRACE',
	onClick: function() {},
	theme: 'MobBlue'
});
DLG1_DlgObj._buttons['BUTTON_1'].bind('DLG1.V.R1.BUTTON_1');
DLG1_DlgObj._controls['THRESHOLD_CONTROL'] = {
	type: 'slider',
	settings: {
		theme: 'MobBlue',
		handle: {
			show: true
		},
		min: 0,
		max: 800,
		onChange: function(e) {
			var id = 'THRESHOLD_CONTROL';
			DLG1_DlgObj.setValueFrom('threshold_value', 'threshold_control');
		},
		step: 1
	}
}
DLG1_DlgObj.setVariables({});
DLG1_DlgObj._dataBoundControls = [];
DLG1_DlgObj._primaryTableAlias = '';
DLG1_DlgObj._hasPanels = false;
DLG1_DlgObj._hasOnSynchronizeEvent = false;
A5.__dtfmt = 'MM/dd/yyyy';
A5.__tfmt = '';
A5.__flagWorkingPreview = false;
A5.__flagIIS = false;
A5.__flagSimulateIIS = true;
DLG1_DlgObj._functions.calcOrientation = function() {
	if (typeof DLG1_DlgObj == 'undefined') return '';
	var orientation = DLG1_DlgObj.getOrientation();
	if (orientation == 'landscape') {
		//landscape
		if (DLG1_DlgObj._orientation != 'landscape') {
			DLG1_DlgObj._fireWatches(1);
			DLG1_DlgObj._orientation = 'landscape';
			DLG1_DlgObj._executeEvent('onOrientationChange', {
				orientation: 'landscape'
			});
		}
	} else {
		//portrait
		if (DLG1_DlgObj._orientation != 'portrait') {
			DLG1_DlgObj._fireWatches(1);
			DLG1_DlgObj._orientation = 'portrait';
			DLG1_DlgObj._executeEvent('onOrientationChange', {
				orientation: 'portrait'
			});
		}
	}
}
A5.flags.cordovaLoaded = true;
try {
	document.addEventListener('deviceready', function() {
		DLG1_DlgObj._executeEvent('onCordovaReady', {});
		DLG1_DlgObj._executeEvent('onPhoneGapReady', {});
		DLG1_DlgObj._cordovaReady = true;
		navigator.geolocation.getAccuratePosition = function(geolocationSuccess, geolocationError, options) {
			var _lastCheckedPosition = null;
			var _locationEventCount = 0;
			options = options || {};
			options.context = this;

			function _checkLocation(pos) {
				_lastCheckedPosition = pos;
				_locationEventCount++;
				if ((pos.coords.accuracy <= options.desiredAccuracy) && (_locationEventCount > options.ignoreResultCount)) {
					clearTimeout(_timerID);
					navigator.geolocation.clearWatch(_watchID);
					_foundPosition(pos);
				}
			}

			function _stopLocationCheck() {
				var error = {};
				error.code = 0;
				error.message = 'Timeout: No results';
				navigator.geolocation.clearWatch(_watchID);
				_lastCheckedPosition ? _foundPosition(_lastCheckedPosition) : geolocationError.call(options.context, error);
			}

			function _onError(error) {
				clearTimeout(_timerID);
				navigator.geolocation.clearWatch(_watchID);
				geolocationError.call(options.context, error);
			}

			function _foundPosition(pos) {
				geolocationSuccess.call(options.context, pos);
			}
			if (!options.maxWait) {
				options.maxWait = 10000;
			}
			if (!options.desiredAccuracy) {
				options.desiredAccuracy = 20;
			}
			if (!options.timeout) {
				options.timeout = options.maxWait;
			}
			if (!options.ignoreResultCount) {
				options.ignoreResultCount = 1;
			}
			options.maximumAge = 0;
			options.enableHighAccuracy = true;
			var _watchID = navigator.geolocation.watchPosition(_checkLocation, _onError, options);
			var _timerID = setTimeout(_stopLocationCheck, options.maxWait);
		}
	}, false);
} catch (err) {}
DLG1_DlgObj._waitGif = 'css/A5System/Images/wait.gif';
DLG1_DlgObj._layoutMode = 'containerwidth';
DLG1_DlgObj._responsiveRulesMode = 'firsttrue';
DLG1_DlgObj.__controlNesting = {}
DLG1_DlgObj._listsDV = [];
DLG1_DlgObj._listControls = [];
DLG1_DlgObj._localStorageSettings = {
	namespace: 'ALPHA_99fc88ddbda041378fc4fd0100929fce',
	friendlyname: '',
	description: '',
	persistvariablevalues: false,
	__version: 1,
	persistcomponentstate: false,
	workingpreviewtestingfolder: '',
	restore: {
		variables: false,
		data: false,
		state: false
	},
	compressdata: false,
	minify: false,
	variablesToNotPersist: '',
	workingPreviewTestingMode: 'Browser',
	compressListData: false
}
DLG1_DlgObj.__r = ['3rkeltoSdQc=']
$e.add(window, 'resize', function() {
	DLG1_DlgObj._findActiveLayoutRule();
});
DLG1_DlgObj._staticHTMLMode = false
DLG1_DlgObj._EDITOR_EDITORSET = {};
DLG1_DlgObj.styleName = 'MobBlue';
DLG1_DlgObj.styleVersion = 2
DLG1_DlgObj.framesInfo = {};
DLG1_DlgObj._noPersist = []
$e.add('DLG1.V.R1.BUTTON_1', A5.d.evnts.click, function(e) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i = 0; i < 9; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	DLG1_DlgObj.setValue('motion_value', text);
}, this, false, 'DLG1.V.R1.BUTTON_1');
DLG1_DlgObj.prepare();
DLG1_DlgObj.populate(DLG1_DlgObj.originalValues[0]);
DLG1_DlgObj._fireWatches(1);


if (!A5.flags.isMobile) $e.add(window, 'resize', DLG1_DlgObj._functions.calcOrientation);
else $e.add(window, 'orientationchange', DLG1_DlgObj._orientationChangeHandler, DLG1_DlgObj, true);
DLG1_DlgObj._functions.calcOrientation();

setTimeout(function() {}, 0);

DLG1_DlgObj._executeEvent('onInitializeComplete');
DLG1_DlgObj.initialized = true;

DLG1_DlgObj._onRenderComplete = function() {
	DLG1_DlgObj._runJSOnLoad();
	DLG1_DlgObj._findActiveLayoutRule();
};

setTimeout(function() {
	DLG1_DlgObj._executeEvent('onRenderComplete');
	DLG1_DlgObj.flagRenderComplete = true;
	DLG1_DlgObj._restoreFromLocalStorage();
}, 1);

var o2 = 'portrait';
if (window.innerHeight < window.innerWidth) o2 = 'landscape';
DLG1_DlgObj._screen = {
	h: window.innerHeight,
	w: window.innerWidth,
	o: o2
};

DLG1_DlgObj._getOnlineStatus();
try {
	window.addEventListener("offline", function() {
		DLG1_DlgObj._fireOnConnectionChangeEvent()
	});
	window.addEventListener("online", function() {
		DLG1_DlgObj._fireOnConnectionChangeEvent()
	});
} catch (err) {}

setTimeout(function() {}, 10);;
DLG1_DlgObj._activeLanguage = '<Default>';