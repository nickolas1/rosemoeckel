window._skel_config = {
	prefix: 'css/style',
	boxModel: 'border',
	/*resetCSS: true,*/
	normalizeCSS: true,
	useOrientation: true,
	breakpoints: {
		wide: {
		    range: "*",
		    containers: 1280,
			grid: {
				gutters: "2%"
			}
		},
		normal: {
		    range: "-1280",
		    containers: 960,
		    grid: {
		        gutters: "2%"
			}		
		},
		narrow: {
		    range: "-960",
		    containers: "fluid",
		    grid: {
		        gutters: "2%"
		    }
		},
		narrower: {
		    range: "-750",
		    containers: "fluid",
		    grid: {
		        collapse: 1
		    }
		},
		mobile: {
		    range: "-480",
		    containers: "fluid",
		    grid: {
		        collapse: 2
		    }
		}
	}
};