import React from 'react';
import { Line } from 'react-chartjs-2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

export class GoogleTrends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { profile } = this.props;
    if (!profile) return true;
    if (nextState.copied) return true;
    if (profile.ticker !== nextProps.profile.ticker) return true;
    return false;
  }

  render() {
    const { profile, prop, imgProp, keyword } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 14 }}>Not available at this time... </div>
      );
    }
    if (!profile[prop] || !profile[prop].data) {
      return (
        <div style={{ fontSize: 14 }}>Not trends data at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} trends`} src={profile[imgProp].url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile[imgProp].url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
      );
    }

    const initialData = profile[prop].data;
    const data = {
      labels: initialData.map(d => d.formattedTime),
      datasets: [
        {
          // label: 'interest over time',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: initialData.map(d => d.value[0])
        }
      ]
    };
    const options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 10
          },
        }],
      },
    }
    return (
      <div style={{ width: '100%', padding: 5, fontSize: 14 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold' }}><span className='green'>Keyword trends: </span>{keyword}</div>
        <Line data={data} height={160} options={options} />
        <span style={{ fontSize: 10 }}>Source: Google Trends</span>
      </div>
    );
  }
}

export default GoogleTrends;
