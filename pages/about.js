import React, { Component } from 'react'
import Head from 'next/head'
import styles from '../styles/About.module.css'
export default class About extends Component {
  render() {
    return (
      <>
        <Head>
          <title>About us - iEducator</title>
        </Head>
        <div className={styles.container}>
          <h1 className={styles.textCenter}>About iEducator</h1>
          <h2>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas delectus illo illum ut? Iusto recusandae fuga
            cupiditate ab, laboriosam possimus debitis incidunt obcaecati aspernatur quisquam qui autem minus id, animi
            similique temporibus facere asperiores! Culpa assumenda quibusdam, voluptatum quisquam neque ullam
            distinctio provident iure repudiandae porro veniam perspiciatis non quasi!
          </p>
          <h2>Services Offered</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, quaerat. Nostrum eligendi animi mollitia
            placeat, voluptas et voluptates. Earum ipsum facilis, pariatur molestiae ea vero eius sit atque possimus
            voluptatibus?
          </p>
          <p>We offer the following services:</p>
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
            <li>Service 4</li>
            <li>Service 5</li>
            <li>Service 6</li>
            <li>Service 7</li>
            <li>Service 8</li>
          </ul>
          <h2>Contact Us</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, dolorum? Delectus quod illum, facere
            explicabo fugit architecto quo earum. Iusto cum consequuntur facilis dolorum quia cumque esse dolores
            aliquid voluptatem nisi! Ipsam a necessitatibus nulla deserunt omnis optio esse ipsum.
          </p>
        </div>
      </>
    )
  }
}
