import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 400; //px
const height = 250; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp

/**
 * Generates an Isotopic distribution image
 * @param {object} result - resulting object of the che_calc function
 * @param {number} fromId - id of the user that requested the formula
 * @param {function} callback what to do when the img is generated
 */
export function generateIsotopicDistributionImage(result) {
  const peaks = result.isotopicDistribution;
  const xs = peaks.map((point) => point.x);
  const xMin = Math.floor(Math.min(...xs) - 1);
  const xMax = Math.ceil(Math.max(...xs) + 1);

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour,
  });

  // See https://www.chartjs.org/docs/latest/configuration
  const configuration = {
    type: 'scatter',
    data: {
      datasets: [
        {
          data: peaks,
          pointRadius: 0,
          borderWidth: 0,
          borderColor: 'rgba(255, 0, 0, 1)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          type: 'scatter',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          title: {
            text: 'Relative intensity',
            display: true,
          },
        },
        x: {
          min: xMin,
          max: xMax,
          title: {
            text: 'm/z',
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'rgb(255, 99, 132)',
          },
        },
        title: {
          display: true,
          text: 'Isotopic distribution',
        },
      },
    },
    plugins: [VerticalLinePlugin],
  };
  return chartJSNodeCanvas.renderToBuffer(configuration);

  // return chartJSNodeCanvas.renderToStream(configuration);
}

const VerticalLinePlugin = {
  afterDatasetDraw: (chart, params) => {
    // Only draw after animation has finished and is the desired dataset
    if (params.meta.type == 'scatter') {
      const ctx = chart.ctx;
      ctx.save();
      params.meta.data.forEach((point) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x, chart.chartArea.bottom);
        ctx.stroke();
      });
      ctx.restore();
    }
  },
};
