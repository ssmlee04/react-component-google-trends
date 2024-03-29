import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

export class GoogleTrends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { profile, prop = 'google_trends', imgProp = 'google_trends_img', theme = 'light', count = 60 } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} google trends`} src={profile[imgProp].url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile[imgProp].url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
      );
    }

    const initialData = _.get(profile, `${prop}.data`, []).slice(-1 * count);
    const keyword = _.get(profile, `${prop}.keyword`) || profile.keyword;
    const dataColor = theme === 'light' ? 'rgba(66, 133, 244, 0.3)' : 'rgba(0, 192, 255, 0.5)';
    const gridColor = theme === 'light' ? 'rgba(80, 80, 80, 0.1)' : 'rgba(255, 255, 255, 0.2)';
    const data = {
      labels: initialData.map(d => dayjs.unix(d.time).format('YYYYMM')),
      datasets: [
        {
          fill: true,
          lineTension: 0.5,
          backgroundColor: dataColor,
          borderColor: dataColor,
          borderCapStyle: 'butt',

          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 2,

          pointBorderWidth: 1,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          // pointHitRadius: 2,
          data: initialData.map(d => d.value)
        }
      ]
    };
    const fontColor = theme === 'light' ? '#444444' : '#dddddd';
    const options = {
      legend: {
        display: false,
        label: {
          fontColor,
          fontSize: 12
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: gridColor
          },
          ticks: {
            fontColor,
            fontSize: 12
          },
        }],
        yAxes: [{
          gridLines: {
            color: gridColor
          },
          ticks: {
            fontColor,
            fontSize: 12
          },
        }]
      },
    };
    return (
      <div style={{ width: '100%', padding: 5, fontSize: 12 }} className={`theme-black-${theme}`}>
        <div className={`theme-darkred-${theme}`} style={{ fontWeight: 'bold' }}>{profile.ticker} - {profile.name}&nbsp;<span className={`theme-green-${theme}`}>Google Trends Analysis</span></div>
        {keyword ? <div className='mb-2'><span style={{ fontSize: 12 }}>Keyword: <b className={`theme-red-${theme}`}>{keyword}</b></span></div> : null}
        <Line data={data} height={160} options={options} />
        <div style={{ fontSize: 12, padding: 5, paddingTop: 2 }}>Crafted by <a href='https://twitter.com/tradeideashq' target='_blank' className={`theme-darkred-${theme}`}>@tradeideashq</a> with <span style={{ fontSize: 16, color: 'red' }}>❤️</span></div>
      </div>
    );
  }
}

export default GoogleTrends;
