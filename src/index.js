import "./bootstrap.min.css";
import "./style.css";
const inputFile = document.querySelector("#inputFile"),
	startFrom = document.querySelector("#startFrom"),
	count = document.querySelector("#count"),
	selected = document.querySelector("#selected"),
	selectedTotal = document.querySelector("#selectedTotal"),
	missingOutput = document.querySelector("#missingOutput"),
	missingTotal = document.querySelector("#missingTotal");
/////////////[ Event Listeners ] //////////////////////
document.addEventListener("DOMContentLoaded", () => {
	inputFile.value = "";
	startFrom.value = "";
	count.value = "";
	missingTotal.value = "";
	missingOutput.value = "";
	selected.value = "";
	selectedTotal.value = "";
});
//event listener for help window
(function () {
	const msg = document.querySelector(".message");
	document.querySelector(".help").addEventListener("click", () => {
		msg.classList.add("is-visible");
		setTimeout(() => {
			msg.classList.add("is-open");
		}, 100);
	});
	document.querySelector(".hide").addEventListener("click", () => {
		msg.classList.remove("is-open");
		setTimeout(() => {
			msg.classList.remove("is-visible");
		}, 3000);
	});
})();

/////////////////////////////////////////////////
inputFile.addEventListener("change", readFileAndStore);

[inputFile, count, startFrom].forEach((item) =>
	item.addEventListener("change", () => {
		startTimer = setTimer();
		setTimeout(stopTimer, 5000);
		return;
	}),
);
//////[ Initialize variables ] ////////////////
let files, isAllNumber, missing, numberInFile, uniqNumber, startTimer;
//////[ All functions ]//////////////////////
function clearOutPutFields() {
	missingTotal.value = "";
	missingOutput.value = "";
	selected.value = "";
	selectedTotal.value = "";
	console.log("clearOutPutFields running");
	return;
}

////////////////////////// FILE READER FUNCTION //////////////////////////////
// inputFile.addEventListener("change", function () {
// 	let readFile = new FileReader();

// 	readFile.readAsText(this.files[0]);
// 	readFile.onload = function () {
// 		numberInFile = readFile.result.split("\n").map((item) => Number(item));
// 	};
// });
/// stores selected files as an object
function readFileAndStore() {
	///
	files = Object.entries(this.files);
	numberInFile = [];
	isAllNumber = files.every((file) => /\d+/g.test(file[1].name.replace(/\.\w+$/g, "")));
	///
	files.forEach((file) => {
		///
		if (!isAllNumber) {
			/////
			clearOutPutFields();
			selected.value = "Selecte all numberd file...";
			selected.classList.add("flash");
			/////
			const classExist = selectedTotal.classList.contains("bg-secondary");
			if (classExist) {
				missingTotal.classList.remove("bg-secondary");
				selectedTotal.classList.remove("bg-secondary");
			}
			/////
			return;
		} else {
			numberInFile.push(Number(file[1].name.replace(/\.\w+$/g, "").match(/\d+/g)[0]));
		}
	});
	console.log("readFileAndStore running");
	return;
}
//////////////////////[ CORE FUNCTION ]////////////////////////////////
function coreFunc() {
	if (inputFile.value == "") {
		selected.classList.add("flash");
		selected.value = "Select Files...";
		//
	} else if (isAllNumber) {
		////sort and uniqNumber
		uniqNumber = [...new Set(numberInFile)];
		/////////////////
		missing = [];

		for (let i = Number(startFrom.value) || 1; i <= Number(count.value); i++) {
			if (uniqNumber.indexOf(i) === -1) {
				missing.push(i);
			}
		}
		selected.classList.remove("flash");

		missingTotal.value = missing.length;
		selectedTotal.value = uniqNumber.length;

		missingOutput.value = missing.join(",  ");
		selected.value = uniqNumber.join(",  ");

		missingTotal.classList.add("bg-secondary");
		selectedTotal.classList.add("bg-secondary");
	}
	console.log("coreFunc running");
	return;
}
// /// TIMER FUNCTIONS ////////////////////////////////////////////////////////
function setTimer() {
	const interval = setInterval(coreFunc, 500);
	document.querySelector("#L6").style.display = "inline-block";
	console.log("setTimer running");
	return interval;
}
function stopTimer() {
	clearInterval(startTimer);
	document.querySelector("#L6").style.display = "none";
	console.log("stopTimer running");
	return;
}
