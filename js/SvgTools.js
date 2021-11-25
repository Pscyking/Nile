const SVG_DATA = {
	"Menu":
	{
		"Bot": {
			"Translate": [0, 50],
			"M": [0, 325],
			"C":
			[
				[
					[0, 325],
					[75, 350],
					[150, 350]
				],
				[
					[225, 350],
					[275, 300],
					[350, 300]
				],
				[
					[425, 300],
					[500, 375],
					[500, 375]
				],
				[
					[500, 375],
					[425, 350],
					[350, 350]
				],
				[
					[275, 350],
					[225, 400],
					[150, 400]
				],
				[
					[75, 400],
					[0, 325],
					[0, 325]
				]
			]
		},
		"Mid": {
			"Translate": [0, 50],
			"M": [0, 175],
			"C":
			[
				[
					[0, 175],
					[75, 200],
					[150, 200]
				],
				[
					[225, 200],
					[275, 150],
					[350, 150]
				],
				[
					[425, 150],
					[500, 225],
					[500, 225]
				],
				[
					[500, 225],
					[425, 200],
					[350, 200]
				],
				[
					[275, 200],
					[225, 250],
					[150, 250]
				],
				[
					[75, 250],
					[0, 175],
					[0, 175]
				]
			]
		},
		"Top": {
			"Translate": [0, 50],
			"M": [0, 25],
			"C":
			[
				[
					[0, 25],
					[75, 50],
					[150, 50]
				],
				[
					[225, 50],
					[275, 0],
					[350, 0]
				],
				[
					[425, 0],
					[500, 75],
					[500, 75]
				],
				[
					[500, 75],
					[425, 50],
					[350, 50]
				],
				[
					[275, 50],
					[225, 100],
					[150, 100]
				],
				[
					[75, 100],
					[0, 25],
					[0, 25]
				]
			]
		}
	},

	"Logo":
	{
		"Top": {
			"Translate": [67, 0],
			"M": [122, 383],
			"C":
			[
				[
					[122, 383],
					[154, 354],
					[154, 321]
				],
				[
					[154, 250],
					[111, 212],
					[111, 136]
				],
				[
					[111, 9],
					[252, 5],
					[252, 5]
				],
				[
					[252, 5],
					[134, 28],
					[134, 134]
				],
				[
					[134, 213],
					[168, 233],
					[168, 299]
				],
				[
					[168, 361],
					[122, 383],
					[122, 383]
				]
			]
		},
		"Mid": {
			"Translate": [67, 0],
			"M": [0,432],
			"C":
			[
				[
					[0,432],
					[200,442],
					[200,319]
				],
				[
					[200,265],
					[148,211],
					[148,127]
				],
				[
					[148,8],
					[327,0],
					[327,0]
				],
				[
					[327,0],
					[194,19],
					[194,99]
				],
				[
					[194,218],
					[369,319],
					[278,422]
				],
				[
					[171,544],
					[0,432],
					[0,432]
				]
			]
		},
		
		"Bot": {
			"Translate": [67, 0],
			"M": [252,499],
			"C":
			[
				[
					[252,499],
					[345,428],
					[345,353]
				],
				[
					[345,293],
					[298,260],
					[250,196]
				],
				[
					[215,149],
					[217,108],
					[217,108]
				],
				[
					[217,108],
					[231,159],
					[264,190]
				],
				[
					[347,269],
					[367,319],
					[366,354]
				],
				[
					[365,441],
					[252,499],
					[252,499]
				]
			]
		}
	}
};

let ANIM_T0 = 0,
	ANIM_TΩ = 0;

function AnimateLogo(svgNameA, svgNameB, duration = 400)
{
	ANIM_T0 = new Date().getTime();
	ANIM_TΩ = ANIM_T0 + duration;

	const timer = setInterval(Animate, 10);
	function Animate()
	{
		const T = new Date().getTime();
		if (T >= ANIM_TΩ)
		{
			SetPath(svgNameA, svgNameB, 1);
			clearInterval(timer);
			return;
		}
		
		const δ = (T-ANIM_T0) / duration;
		const γ = easeInOutCubic(δ);
		if (Math.random() < 0.1)
			console.log(`δ${δ} → γ${γ}`);
		SetPath(svgNameA, svgNameB, γ);
	}
}

function easeInOut(x) { return -(Math.cos(Math.PI * x) - 1) / 2; }
function easeInOutCubic(x) {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

function SetPath(svgNameA, svgNameB, prog)
{
	const dataA = SVG_DATA[svgNameA];
	const dataB = SVG_DATA[svgNameB];
	const avg = SvgDataMorph(dataA, dataB, prog);

	for (const k of ['Top', 'Mid', 'Bot'])
	{
		const σ = avg[k];
		$(`#DynamicLogo path.${k}`)
			.attr('transform', `translate(${σ.Translate[0]}, ${σ.Translate[1]})`)
			.attr('d', IconObjToPathD(σ));
	}
}

function SvgDataMorph(dataA, dataB, prog)
{
	let avg = { Top: {}, Mid: {}, Bot: {} };

	for (const key in avg)
	{
		const a = dataA[key];
		const b = dataB[key];
		const σ = avg[key];

		σ.Translate = ArrayInterpolate(a.Translate, b.Translate, prog);
		σ.M = ArrayInterpolate(a.M, b.M, prog);
		σ.C = [];

		for (let i = 0; i < 6; i++)
		{
			let ci = [];

			const ai = a.C[i];
			const bi = b.C[i];
			for (let j = 0; j < 3; j++)
				ci[j] = ArrayInterpolate(ai[j], bi[j], prog);

			σ.C[i] = ci;
		}
	}

	return avg;
}

function ArrayInterpolate(arrA, arrB, prog)
{
	let ret = [];
	for (let i = 0; i < arrA.length; i++)
		ret[i] = Math.round((1-prog)*arrA[i] + (prog)*arrB[i]);
	return ret;
}

function IconObjToPathD(obj)
{
	let str = `M${obj.M[0]},${obj.M[1]} `;

	for (let i = 0; i < 6; i++)
	{
		const ci = obj.C[i];
		str += 'C';
		for (let j = 0; j < 3; j++)
		{
			const cj = ci[j];
			str += `${cj[0]},${cj[1]} `
		}
	}

	return str;
}
