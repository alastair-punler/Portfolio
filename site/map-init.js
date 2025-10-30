// map-init.js — text-only tooltips, no numeric scale
new svgMap({
  targetElementID: 'worldMap',

  mouseWheelZoomEnabled: true,
  mouseWheelZoomWithKey: true,

  // make every country the same color
  colorMin: '#d8b173',
  colorMax: '#d8b173',
  colorNoData: '#d0d5db',
  hideLegend: true,      // skip the numeric legend completely
  noDataText: '',

  data: {
    // all string fields for the tooltip
    data: {
      status: { name: 'Status', format: '{0}' },
      years:  { name: 'Years',  format: '{0}' },
      notes:  { name: 'Notes',  format: '{0}' }
    },

    // there’s no numeric dataset anymore, so applyData can be anything here
    // (svgMap just ignores it when all countries share one color)
    applyData: 'status',

    values: {

        GB: {
            status: 'Lived',
            years: '1996',
            notes: 'Born here, didnt stick around long. UK Citizen.',
            },

        SY: {
            status: 'Lived',
            years: '1996 - 1998',
            notes: 'Lived in Damascus. Followed expat parents around.<br>Too young to remember anything cool.'
        },
        AU: {
            status: 'Home',
            years: '1998 - 2002,  2008 - 2022, 2023 - Present',
            notes: "Perth, Western Australia is where I call home. <br> Citizen. <br> Where I studied and started my career.<br>Played a long hockey career here. <br> Worked multiple offshore gas developments in North West Shelf, both shallow and deepwater.",
            color: '#32a852',
        },
        NZ: {
            status: 'Lived',
            years: '2002 - 2004',
            notes: "Lived in New Plymouth, Taranaki (Hardcore) "
            },
        
        CA: {
            status: 'Lived',
            years: '2004 - 2008, 2013 - 2014',
            notes: "Moved to Calgary for 4 years fell in love with skiing & hockey. <br> Moved to Banff to play hockey post highschool.<br> Regular holiday destination: Fernie, BC"
            },

        US: {
            status: 'Lived & Worked',
            years: '2022 - 2023',
            notes: 'Lived in Houston, TX.<br>Rotated offshore GOM for a wildcat exploration well. '
            },
        SN: {
            status: 'Worked',
            years: '2023 & 2023',
            notes: 'In country rotations from Australia.<br>24x well deepwater oil development.'
      },
    }
  }
});