import React, { Component } from 'react'
import styles from '../styles/Footer.module.css'
export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className={styles.footer}>
          <img src="/logo/ieducator.png" alt="iEducator Logo" className={styles.logo} />
          <div className={styles.footerContent}>
            <span className={styles.footerDesc}>Copyright &copy; 2022 iEducator - @swapnilprakash21</span>
            <a href="https://github.com/swapnilprakash21/ieducator-nextjs" target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>Source Code</a>
          </div>
        </footer>
      </div>
    )
  }
}
