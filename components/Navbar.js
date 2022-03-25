import Link from 'next/link'
import React, { Component } from 'react'
import styles from '../styles/Navbar.module.css'
export default class Navbar extends Component {
    constructor() {
        super();
        this.collapseState = React.createRef();;
    }
    dectctWidth = () => {
        let mediaQuery = window.matchMedia("(max-width: 640px)");
        if (mediaQuery.matches) {
            this.collapseState.current.classList.add(styles.navCollapsed);;
        }
        else {
            if (this.collapseState.current.classList.contains(styles.navCollapsed)) {
                this.collapseState.current.classList.remove(styles.navCollapsed);;
            }
            else if (this.collapseState.current.classList.contains(styles.navExpanded)) {
                this.collapseState.current.classList.remove(styles.navExpanded);;
            }
        }
    }

    componentDidMount() {
        this.dectctWidth();
        window.addEventListener('resize', this.dectctWidth);
    }

    toggleCollapse = () => {
        if (this.collapseState.current.classList.contains(styles.navCollapsed)) {
            this.collapseState.current.classList.remove(styles.navCollapsed);
            this.collapseState.current.classList.add(styles.navExpanded);
        }
        else {
            this.collapseState.current.classList.add(styles.navCollapsed);
            this.collapseState.current.classList.remove(styles.navExpanded);
        }
    }
    render() {
        return (
            <nav className={styles.mainnav}>
                <ul className={styles.navMainUl}>
                    <li><Link href="/"><img src='/logo/ieducator.png' alt="iEducator" /></Link></li>
                    <button className={styles.navExpand} onClick={this.toggleCollapse}><i className="fas fa-bars    "></i></button>
                </ul>
                <div className={styles.navCollapse} ref={this.collapseState}>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About us</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
