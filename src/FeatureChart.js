import React from 'react'
import ReactDOM from 'react-dom'
import Chart from 'chart.js'

class FeatureChart extends React.Component {
  constructor(props) {
    super(props)
    this.chart = null
    this.chartInstance = null
  }

  componentDidMount() {
    this.configureChart()
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    // console.log(prevProps.data.datasets[0].label)
    if (
      prevProps.data.datasets[0].label !== this.props.data.datasets[0].label
    ) {
      // THIS LINE IS IMPROTANT !!!!
      this.chartInstance.destroy()
      this.configureChart()
    }
  }

  configureChart = () => {
    const chartCanvas = ReactDOM.findDOMNode(this.chart)

    const {data} = this.props

    this.chartInstance = new Chart(chartCanvas, {
      type: 'bar',
      data,
      options: {
        tooltips: {
          enabled: false,
          custom: function(tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip')

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div')
              tooltipEl.id = 'chartjs-tooltip'
              tooltipEl.innerHTML = '<table></table>'
              document.body.appendChild(tooltipEl)
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0
              return
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform')
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign)
            } else {
              tooltipEl.classList.add('no-transform')
            }

            function getBody(bodyItem) {
              return bodyItem.lines
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || []
              var bodyLines = tooltipModel.body.map(getBody)

              var innerHtml = '<thead>'

              titleLines.forEach(function(title) {
                console.log(title)
                innerHtml += '<tr><th>' + title + '</th></tr>'
              })
              innerHtml += '</thead><tbody>'

              const newBody = bodyLines
                .map(el => {
                  let [country, value] = el[0].split(':')
                  if (parseFloat(value) === 0) return null
                  else if (parseFloat(value) > 0) {
                    return [
                      'higher than average by',
                      parseFloat(value).toFixed(2),
                    ]
                  } else {
                    return [
                      'lower than average by',
                      -1 * parseFloat(value).toFixed(2),
                    ]
                  }
                })
                .filter(el => el !== null)

              newBody.forEach(function(body, i) {
                const value = body[1]

                var colors =
                  value > 0
                    ? tooltipModel.labelColors[0]
                    : tooltipModel.labelColors[1]
                var style = 'background:' + colors.backgroundColor
                style += '; border-color:' + colors.borderColor
                style += '; border-width: 1px'
                var span = '<span style="' + style + '"></span>'
                innerHtml += '<tr><td>' + span + body.join(' ') + '</td></tr>'
              })
              innerHtml += '</tbody>'

              var tableRoot = tooltipEl.querySelector('table')
              tableRoot.innerHTML = innerHtml
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect()

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1
            tooltipEl.style.position = 'absolute'
            tooltipEl.style.left =
              position.left + window.pageXOffset + tooltipModel.caretX + 'px'
            tooltipEl.style.top =
              position.top + window.pageYOffset + tooltipModel.caretY + 'px'
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
            tooltipEl.style.padding =
              tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
            tooltipEl.style.pointerEvents = 'none'
          },
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              // stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              display: true,
              stacked: true,
              barThickness: 25,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }

  componentWillUnmount() {
    this.chartInstance.destroy()
  }

  render() {
    return (
      <div>
        <canvas
          ref={chart => {
            this.chart = chart
          }}
        />
      </div>
    )
  }
}

export default FeatureChart
