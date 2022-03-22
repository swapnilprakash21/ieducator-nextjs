import React, { Component } from 'react'
import styles from '../styles/404.module.css'
export default class NotFound extends Component {
    render() {
        return (
            <div className={styles.selectNone}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <span>404.</span>&nbsp;
                        <span>Not Found</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>
                        <span className={styles.fontBold}>Error:</span> The requested resource was not found on this server. Please make
                        sure that you have entered the correct
                        URL.
                    </p>
                </div>
            </div>
        )
    }
}
