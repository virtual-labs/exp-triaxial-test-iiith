'use strict';

document.addEventListener('DOMContentLoaded', function() {

	const restartButton = document.getElementById('restart');
	const instrMsg = document.getElementById('procedure-message');

	restartButton.addEventListener('click', function() {restart();});

	function randomNumber(min, max) {
		return Number((Math.random() * (max - min + 1) + min).toFixed(2));
	};

	function logic(tableData)
	{
		const waterContents = [randomNumber(7, 9), randomNumber(10, 12), randomNumber(12, 14), randomNumber(15, 16), randomNumber(17, 18)], soilMasses = [randomNumber(1500, 1600), randomNumber(1750, 1800), randomNumber(2150, 2200), randomNumber(2100, 2150), randomNumber(2000, 2150),];
		let xVals = [], yVals = [], maxIx = 0;
		tableData.forEach(function(row, index) {
			row['Soil Sample No.'] = index + 1;
			row['Water Content(%)'] = Number(waterContents[index]);
			row['Wet Compacted Soil Mass(g)'] = Number(soilMasses[index]);
			row['Wet Density(g/cc)'] = (soilMasses[index] / soilVol).toFixed(2);
			row['Dry Density(g/cc)'] = Number((row['Wet Density(g/cc)'] / (1 + waterContents[index] / 100)).toFixed(2));
			xVals.push(row['Water Content(%)']);
			yVals.push(row['Dry Density(g/cc)']);

			if(yVals[maxIx] < yVals[index])
			{
				maxIx = index;
			}
		});

		document.getElementById('optWater').innerHTML = "Optimum Moisture Content = " + String(xVals[maxIx]) + " %";
		document.getElementById('maxDensity').innerHTML = "Maximum Dry Density = " + String(yVals[maxIx]) + " g/cm<sup>3</sup>";
		return trace(xVals, yVals, 'Graph');
	};

	function limCheck(obj, translate, lim, step)
	{
		if(obj.pos[0] === lim[0])
		{
			translate[0] = 0;
		}

		if(obj.pos[1] === lim[1])
		{
			translate[1] = 0;
		}

		if(translate[0] === 0 && translate[1] === 0)
		{
			if(step === 2)
			{
				document.getElementById("output1").innerHTML = "Mass of mould = " + String(720) + " g";
			}

			else if(step === 3)
			{
				document.getElementById("output2").innerHTML = "Mass of soil = " + String(280) + " g";
			}

			else if(step === 4)
			{
				diameter = randomNumber(6, 7);
				area = (Math.PI * diameter * diameter / 4).toFixed(2);
				document.getElementById("output3").innerHTML = "Shear Box Diameter = " + String(diameter) + " cm";
				document.getElementById("output4").innerHTML = "Shear Box Area, A = " + String(area) + " cm" + "2".sup();
			}

			else if(step === enabled.length - 2)
			{
				const retTrace = logic(tableData);
				generateTableHead(table, Object.keys(tableData[0]));
				generateTable(table, tableData);
				drawGraph([retTrace], ['Water Content(%)', 'Dry Density(g/cc)'], 'plot');

				document.getElementById("main").style.display = 'none';
				document.getElementById("graph").style.display = 'inline-block';

				document.getElementById("apparatus").style.display = 'none';
				document.getElementById("observations").style.width = '40%';
				if(small)
				{
					document.getElementById("observations").style.width = '85%';
				}
			}
			return step + 1;
		}

		return step;
	};

	function updatePos(obj, translate)
	{
		obj.pos[0] += translate[0];
		obj.pos[1] += translate[1];
	};

	function canvas_arrow(ctx, fromx, fromy, tox, toy) {
		const headlen = 5, dx = tox - fromx, dy = toy - fromy, angle = Math.atan2(dy, dx);
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
		ctx.moveTo(tox, toy);
		ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	};

	class rect {
		constructor(height, width, x, y, color) {
			this.height = height;
			this.width = width;
			this.pos = [x, y];
			this.color = color; 
		};

		draw(ctx) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		};

		heightChange(change, lim) {
			if(this.height === lim)
			{
				return 1;
			}

			this.height += change;
			return 0;
		};
	};

	class multiRect {
		constructor(height, width, x, y, gap, color) {
			this.height = height;
			this.width = width;
			this.pos = [x, y];
			this.gap = [...gap];
			this.color = color;
			
			this.arr = [new rect(this.height, this.width, this.pos[0], this.pos[1], color), new rect(this.height, this.width, this.pos[0] + this.gap[0], this.pos[1] + this.height + this.gap[1], color)];
		};

		draw(ctx) {
			this.arr.forEach((elem, ind) => {
				elem.draw(ctx);
			});
		};
	};

	class loader {
		constructor(height, width, radius, x, y) {
			this.height = height;
			this.width = width;
			this.pos = [x, y];
			this.marginHoriz = 0.05 * this.height;
			this.cylStart = 0.4 * this.height;
			this.radius = radius;
			this.angle = 0;
			this.drains = false;
			this.arrows = false;
		};

		draw(ctx) {
			const marginVert = 0.1 * this.width, heightVert = 0.90 * this.height, widthVert = 0.05 * this.width, heightHoriz = 0.05 * this.height, gaugeCenterY = 0.25 * this.height, baseWidth = 0.6 * this.width, baseHeight = 0.05 * this.height, pipeWidth = 0.025 * this.width, arrowPad = 10, arrowGap = 20;
			ctx.fillStyle = data.colors.gray;

			ctx.beginPath();
			ctx.rect(this.pos[0] + marginVert, this.pos[1], widthVert, heightVert);
			ctx.rect(this.pos[0] + this.width - marginVert, this.pos[1], -widthVert, heightVert);
			ctx.rect(this.pos[0], this.pos[1] + heightVert, this.width, this.height - heightVert);
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.rect(this.pos[0], this.pos[1] + this.marginHoriz, this.width, heightHoriz);
			ctx.rect(this.pos[0] + this.width / 2 - baseWidth / 2, this.pos[1] + heightVert - baseHeight, baseWidth, baseHeight);
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(this.pos[0] + this.width / 2, this.pos[1] + gaugeCenterY, this.radius, 0, 2 * Math.PI);
			canvas_arrow(ctx, this.pos[0] + this.width / 2, this.pos[1] + gaugeCenterY, this.pos[0] + this.width / 2 + this.radius * Math.sin(this.angle), this.pos[1] + gaugeCenterY - this.radius * Math.cos(this.angle));

			ctx.moveTo(this.pos[0] + this.width / 2, this.pos[1] + gaugeCenterY - this.radius);
			ctx.lineTo(this.pos[0] + this.width / 2, this.pos[1] + this.marginHoriz + heightHoriz);

			ctx.moveTo(this.pos[0] + this.width / 2, this.pos[1] + gaugeCenterY + this.radius);
			ctx.lineTo(this.pos[0] + this.width / 2, this.pos[1] + this.cylStart);
			ctx.fill();
			ctx.stroke();

			if(this.drains)
			{
				ctx.fillStyle = data.colors.lightBlue;
				ctx.beginPath();
				ctx.moveTo(this.pos[0] + this.width / 2, this.pos[1] + heightVert - baseHeight - 10);
				ctx.lineTo(this.pos[0] + this.width / 2, this.pos[1] + heightVert / 2 + this.height / 2 + 10);
				ctx.lineTo(this.pos[0] + this.width + 20, this.pos[1] + heightVert / 2 + this.height / 2 + 10);
				ctx.lineTo(this.pos[0] + this.width + 20, this.pos[1] + heightVert / 2 + this.height / 2 + 10 - pipeWidth);
				ctx.lineTo(this.pos[0] + this.width / 2 + pipeWidth, this.pos[1] + heightVert / 2 + this.height / 2 + 10 - pipeWidth);
				ctx.lineTo(this.pos[0] + this.width / 2 + pipeWidth, this.pos[1] + heightVert - baseHeight - 10);

				ctx.moveTo(this.pos[0] + this.width / 2 - baseWidth / 2 + 30, this.pos[1] + heightVert - baseHeight);
				ctx.lineTo(this.pos[0] + this.width / 2 - baseWidth / 2 + 30, this.pos[1] + heightVert / 2 + this.height / 2 + 10);
				ctx.lineTo(this.pos[0] - 20, this.pos[1] + heightVert / 2 + this.height / 2 + 10);
				ctx.lineTo(this.pos[0] - 20, this.pos[1] + heightVert / 2 + this.height / 2 + 10 - pipeWidth);
				ctx.lineTo(this.pos[0] + this.width / 2 - baseWidth / 2 + 30 - pipeWidth, this.pos[1] + heightVert / 2 + this.height / 2 + 10 - pipeWidth);
				ctx.lineTo(this.pos[0] + this.width / 2 - baseWidth / 2 + 30 - pipeWidth, this.pos[1] + heightVert - baseHeight);
				ctx.stroke();
				ctx.fill();
			}

			ctx.beginPath();
			for(let i = 0; this.arrows && arrowPad + i * arrowGap < baseWidth; i += 1)
			{
				canvas_arrow(ctx, this.pos[0] + this.width / 2 - baseWidth / 2 + arrowPad + i * arrowGap, this.pos[1] + gaugeCenterY + this.radius, this.pos[0] + this.width / 2 - baseWidth / 2 + arrowPad + i * arrowGap, this.pos[1] + this.cylStart - 5);
			}
			ctx.stroke();
		};
	};

	class shearBox {
		constructor(height, width, x, y) {
			this.height = height;
			this.width = width;
			this.pos = [x, y];
			this.gap = [0, 0];
		};

		draw(ctx) {
			const margin = 20, handleWidth = 20, stonesHeight = 20;
			new multiRect(this.height / 2, this.width, this.pos[0], this.pos[1], this.gap, data.colors.yellow).draw(ctx);
			new multiRect(stonesHeight, this.width - 2 * margin, this.pos[0] + margin, this.pos[1], [this.gap[0], this.height - 2 * stonesHeight], data.colors.lightBlue).draw(ctx);

			ctx.fillStyle = data.colors.gray;
			ctx.beginPath();
			ctx.moveTo(this.pos[0] + this.width - margin, this.pos[1]);
			ctx.lineTo(this.pos[0] + this.width - margin, this.pos[1] - this.height * 0.5);
			ctx.lineTo(this.pos[0] + 1.6 * this.width - margin, this.pos[1] - this.height * 0.5);
			ctx.lineTo(this.pos[0] + 1.6 * this.width - margin, this.pos[1] + this.height / 2);
			ctx.lineTo(this.pos[0] + 1.6 * this.width - margin - handleWidth, this.pos[1] + this.height / 2);
			ctx.lineTo(this.pos[0] + 1.6 * this.width - margin - handleWidth, this.pos[1] - this.height * 0.5 + handleWidth);
			ctx.lineTo(this.pos[0] + this.width, this.pos[1] - this.height * 0.5 + handleWidth);
			ctx.lineTo(this.pos[0] + this.width, this.pos[1]);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		};

		shear(change) {
			this.gap[0] += change;
		};
	};

	class soil {
		constructor(height, width, x, y) {
			this.height = height;
			this.width = width;
			this.pos = [x, y];
			this.stoneHeight = 0.1 * this.height;
		};

		draw(ctx) {
			new rect(this.height - 2 * this.stoneHeight, this.width, this.pos[0], this.pos[1] + this.stoneHeight, data.colors.soilBrown).draw(ctx);
			new multiRect(this.stoneHeight, this.width, this.pos[0], this.pos[1], [0, this.height - 2 * this.stoneHeight], data.colors.lightGray).draw(ctx);
		};

		shear(change) {
			this.soils[this.soils.length - 1].pos[0] += change;
		};
	};

	class chamber {
		constructor(height, width, x, y) {
			this.height = height;
			this.width = width;
			this.pos = [x, y];
			this.waterHeight = 0;
			this.topHeight = 0.1 * this.height;
			this.arrows = false;
		};

		draw(ctx) {
			const margin = 0.05 * this.width, gap = 20, arrowLen = 25, pad = 20;
			new rect(this.topHeight, this.width, this.pos[0], this.pos[1], "black").draw(ctx);
			new rect(this.height - this.topHeight, this.width - 2 * margin, this.pos[0] + margin, this.pos[1] + this.topHeight, "white").draw(ctx);
			new rect(-this.waterHeight, this.width - 2 * margin, this.pos[0] + margin, this.pos[1] + this.height, data.colors.blue).draw(ctx);

			ctx.fillStyle = "black";
			ctx.beginPath();
			for(let i = 0; this.arrows && this.topHeight + pad + i * gap < this.height; i += 1)
			{
				canvas_arrow(ctx, this.pos[0] + margin, this.pos[1] + this.topHeight + pad + i * gap, this.pos[0] + margin + arrowLen, this.pos[1] + this.topHeight + pad + i * gap);
				canvas_arrow(ctx, this.pos[0] + this.width - margin, this.pos[1] + this.topHeight + pad + i * gap, this.pos[0] + this.width - margin - arrowLen, this.pos[1] + this.topHeight + pad + i * gap);
			}
			ctx.stroke();
		};

		addWater(change) {
			if(this.waterHeight >= this.height - this.topHeight)
			{
				return 1;
			}

			this.waterHeight += change;
			return 0;
		};
	};

	function lineFromPoints(p, q)
	{
		const m = (q[1] - p[1]) / (q[0] - p[0]), c = p[1] - m * p[0];
		const xVals = math.range(p[0], q[0], 1).toArray();
		const yVals = xVals.map(function (x) {
			return Number((m * x + c).toFixed(2));
		});

		return [xVals, yVals];
	};

	function trace(Xaxis, Yaxis, name)
	{
		let xVals = [], yVals = [];

		Xaxis.forEach(function(xcoord, i) {
			let xTemp, yTemp;
			if(i !== Xaxis.length - 1)
			{
				[xTemp, yTemp] = lineFromPoints([Xaxis[i], Yaxis[i]], [Xaxis[i + 1], Yaxis[i + 1]]);
			}

			xVals = xVals.concat(xTemp);
			yVals = yVals.concat(yTemp);
		});

		const retTrace = {
			x: xVals,
			y: yVals,
			name: name,
			type: 'scatter',
			mode: 'lines',
		};

		return retTrace;
	};

	function drawGraph(traces, text, id) {
		try {
			const layout = {
				width: 400,
				height: 400,
				xaxis: {
					title: {
						text: text[0],
						font: {
							family: 'Courier New, monospace',
							size: 18,
							color: '#000000'
						}
					},
					range: [0, 20],
					dtick: 5
				},
				yaxis: {
					title: {
						text: text[1],
						font: {
							family: 'Courier New, monospace',
							size: 18,
							color: '#000000'
						}
					},
					range: [1, 2.4],
					dtick: 0.2
				}
			};

			const config = {responsive: true};
			Plotly.newPlot(id, traces, layout, config);
		}

		catch (err) {
			console.error(err);
			alert(err);
		}
	};

	function init()
	{
		document.getElementById("output1").innerHTML = "Mass of mould = ____ g";
		document.getElementById("output2").innerHTML = "Mass of soil = ____ g";
		document.getElementById("output3").innerHTML = "Shear Box Diameter = ____ cm";
		document.getElementById("output4").innerHTML = "Shear Box Area, A = ____ cm" + "2".sup();

		objs = {
			"chamber": new chamber(150, 150, 540, 180),
			"membrane": new rect(110, 80, 575, 215, data.colors.yellow),
			"soil": new soil(120, 60, 585, 210),
			"drainage": "",
			"loader": new loader(330, 270, 20, 480, 50),
		};
		keys = [];

		enabled = [["loader"], ["loader", "soil"], ["loader", "soil", "membrane"], ["loader", "soil", "membrane", "chamber"], ["loader", "soil", "membrane", "chamber", "drainage"], ["loader", "soil", "membrane", "chamber"], ["loader", "soil", "membrane", "chamber"], ["loader", "soil", "membrane", "chamber"], []];
		step = 0;
		translate = [0, 0];
		lim = [-1, -1];
		arrows = false;
	};

	function restart() 
	{ 
		window.clearTimeout(tmHandle); 

		document.getElementById("main").style.display = 'block';
		document.getElementById("graph").style.display = 'none';
		document.getElementById("apparatus").style.display = 'block';
		document.getElementById("observations").style.width = '';

		table.innerHTML = "";
		init();

		tmHandle = window.setTimeout(draw, 1000 / fps); 
	};

	function generateTableHead(table, data) {
		let thead = table.createTHead();
		let row = thead.insertRow();
		data.forEach(function(key, ind) {
			let th = document.createElement("th");
			let text = document.createTextNode(key);
			th.appendChild(text);
			row.appendChild(th);
		});
	};

	function generateTable(table, data) {
		data.forEach(function(rowVals, ind) {
			let row = table.insertRow();
			Object.keys(rowVals).forEach(function(key, i) {
				let cell = row.insertCell();
				let text = document.createTextNode(rowVals[key]);
				cell.appendChild(text);
			});
		});
	};

	function check(event, translate, step, flag=true)
	{ 
		if(translate[0] !== 0 || translate[1] !== 0)
		{
			return step;
		}

		const canvasPos = [(canvas.width / canvas.offsetWidth) * (event.pageX - canvas.offsetLeft), (canvas.height / canvas.offsetHeight) * (event.pageY - canvas.offsetTop)];
		const errMargin = 10;

		let hover = false;
		canvas.style.cursor = "default";
		keys.forEach(function(val, ind, arr) {
			if(canvasPos[0] >= objs[val].pos[0] - errMargin && canvasPos[0] <= objs[val].pos[0] + objs[val].width + errMargin && canvasPos[1] >= objs[val].pos[1] - errMargin && canvasPos[1] <= objs[val].pos[1] + objs[val].height + errMargin)
			{
				if(step === 5 && val === "chamber")
				{
					hover = true;
					translate[1] = 1;
				}

				else if(step === 6 && val === "chamber")
				{
					hover = true;
					if(flag)
					{
						arrows = true;
					}
				}
			}
		});

		if(!flag && hover)
		{
			canvas.style.cursor = "pointer";
			translate[0] = 0;
			translate[1] = 0;
			lim[0] = 0;
			lim[1] = 0;
		}

		return step;
	};

	const canvas = document.getElementById("main");
	canvas.width = 840;
	canvas.height = 400;
	canvas.style = "border:3px solid";
	const ctx = canvas.getContext("2d");
	ctx.lineWidth = 3;

	const border = "black", lineWidth = 3, fps = 150;
	const msgs = [
		"Click on 'Axial Loading Device' in the apparatus menu to add a loading device to the workspace.", 
		"Click on 'Soil Sample' in the apparatus menu to add a soil sample to the device base with porous stones on the top and bottom.",
		"Click on 'Membrane' in the apparatus menu to add a membrane around the soil sample.", 
		"Click on 'Cylindrical Chamber' in the apparatus menu to enclose the sample in a cylindrical cell.",
		"Click on 'Drainage' in the apparatus menu to attach drainage pipes to the chamber and sample.",
		"Click on the chamber to fill it with water.",
		"Click on the chamber to start the machine and apply the required forces.",
		"Click the restart button to perform the experiment again.",
	];

	let diameter, area;
	let step, translate, lim, objs, keys, enabled, small, arrows;
	init();

	const tableData = [
		{ "Soil Sample No.": "", "Water Content(%)": "", "Wet Compacted Soil Mass(g)": "", "Wet Density(g/cc)": "", "Dry Density(g/cc)": "" }, 
		{ "Soil Sample No.": "", "Water Content(%)": "", "Wet Compacted Soil Mass(g)": "", "Wet Density(g/cc)": "", "Dry Density(g/cc)": "" }, 
		{ "Soil Sample No.": "", "Water Content(%)": "", "Wet Compacted Soil Mass(g)": "", "Wet Density(g/cc)": "", "Dry Density(g/cc)": "" }, 
		{ "Soil Sample No.": "", "Water Content(%)": "", "Wet Compacted Soil Mass(g)": "", "Wet Density(g/cc)": "", "Dry Density(g/cc)": "" }, 
		{ "Soil Sample No.": "", "Water Content(%)": "", "Wet Compacted Soil Mass(g)": "", "Wet Density(g/cc)": "", "Dry Density(g/cc)": "" }, 
	];

	const objNames = Object.keys(objs);
	objNames.forEach(function(elem, ind) {
		const obj = document.getElementById(elem);
		obj.addEventListener('click', function(event) {
			if(elem === "drainage")
			{
				objs['loader'].drains = true;
				step += 1;
				return;
			}

			keys.push(elem);
			step += 1;
		});
	});

	canvas.addEventListener('mousemove', function(event) {check(event, translate, step, false);});
	canvas.addEventListener('click', function(event) {
		step = check(event, translate, step);
	});

	const table = document.getElementsByClassName("table")[0];

	function responsiveTable(x) {
		if(x.matches)	// If media query matches
		{ 
			small = true;
			if(step === enabled.length - 1)
			{
				document.getElementById("observations").style.width = '85%';
			}
		} 

		else
		{
			small = false;
			if(step === enabled.length - 1)
			{
				document.getElementById("observations").style.width = '40%';
			}
		}
	};

	let x = window.matchMedia("(max-width: 1023px)");
	responsiveTable(x); // Call listener function at run time
	x.addListener(responsiveTable); // Attach listener function on state changes

	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height); 
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		let ctr = 0;
		document.getElementById("main").style.pointerEvents = 'none';

		objNames.forEach(function(name, ind) {
			document.getElementById(name).style.pointerEvents = 'auto';
			if(keys.includes(name) || !(enabled[step].includes(name)))
			{
				document.getElementById(name).style.pointerEvents = 'none';
			}

			if(keys.includes(name)) 
			{
				if(enabled[step].includes(name))
				{
					ctr += 1;
				}
				objs[name].draw(ctx);
			}
		});

		if(ctr === enabled[step].length && !translate[0] && !translate[1])
		{
			document.getElementById("main").style.pointerEvents = 'auto';
		}

		if(arrows)
		{
			objs['chamber'].arrows = true;
			objs['loader'].arrows = true;
			step += 1;
			arrows = false;
		}

		if(translate[0] !== 0 || translate[1] !== 0)
		{
			let temp = step;

			if(step === 5)
			{
				temp += objs['chamber'].addWater(translate[1]);
				if(temp !== step)
				{
					translate[1] = 0;
				}
			}

			step = temp;
		}

		document.getElementById("procedure-message").innerHTML = msgs[step];
		tmHandle = window.setTimeout(draw, 1000 / fps);
	};

	let tmHandle = window.setTimeout(draw, 1000 / fps);
});
