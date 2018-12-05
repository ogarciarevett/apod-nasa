import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import logo from '../../assets/logo.png';
import api from './api';
import styles from './ApodComponent.module.scss';

export default class ApodComponent extends Component {
  state = {
    loading: false,
    apodRes: {},
    hasError: false,
    info: null,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({
        loading: true,
      });
      const { status, data } = await axios.get(
        `${api.BASE_URL}/apod?api_key=${api.API_KEY}`,
      );
      this.setState({
        loading: false,
      });
      if (status >= 400) throw new Error('Something bad its happening here :O');
      this.setState({ apodRes: data });
    } catch (error) {
      this.setState({
        loading: false,
      });
      this.setState({ error, hasError: true, info: error.message });
      return Promise.reject(error);
    }
  }

  render() {
    const { apodRes, hasError, info, loading } = this.state;
    if (loading)
      return (
        <div className={styles.loaderContainer}>
          <Loader type='CradleLoader' />
        </div>
      );
    return (
      <div className={styles.ApodComponent}>
        {hasError ? (
          <div className={styles.errorContainer}>
            <h1 className={styles.error}>{info}</h1>
          </div>
        ) : (
          <div className={styles.ApodContainer}>
            <div className={styles.ApodTitle}>
              {' '}
              <img src={logo} alt='logo' />
              <h1>Astronomy Picture of the Day</h1>{' '}
            </div>

            <a
              className={styles.hdurl}
              href={apodRes.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={apodRes.hdurl} alt='hd-url' />
            </a>
            <div className={styles.ApodDetails}>
              <h2>{apodRes.title}</h2>
              <p className={styles.explanation}> {apodRes.explanation} </p>
              <p>
                {' '}
                by: <b>{apodRes.copyright || 'NASA'}</b>
              </p>
              <p> date: {apodRes.date} </p>
              <p>Media type: {apodRes.media_type}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
