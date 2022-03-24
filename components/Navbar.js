import Link from 'next/link'
import React, { Component } from 'react'
import styles from '../styles/Navbar.module.css'
export default class Navbar extends Component {
    dectctWidth = () => {
        let navCollapse = document.getElementById("navCollapse");
        let mediaQuery = window.matchMedia("(max-width: 640px)");
        if (mediaQuery.matches) {
            navCollapse.style.display = 'none';
            navCollapse.style.height = '0px';
        }
        else {
            navCollapse.style.display = 'block';
            navCollapse.style.height = 'auto';
            return true;
        }

    }

    componentDidMount() {
        this.dectctWidth();
        window.addEventListener('resize', this.dectctWidth);
    }

    toggleCollapse = () => {
        let navCollapse = document.getElementById("navCollapse");
        if (navCollapse.style.height === '0px') {
            navCollapse.style.display = 'block';
            setTimeout(() => {
                navCollapse.style.height = '44px';
            }, 1);
            return true;
        }
        else {
            navCollapse.style.height = '0px';
            setTimeout(() => {
                navCollapse.style.display = 'none';
            }, 150);
            return true;
        }
    }
    render() {
        return (
            <nav className={styles.mainnav}>
                <ul className={styles.navMainUl}>
                    <li><Link href="/"><img src='/logo/ieducator.png' alt="iEducator" /></Link></li>
                    <button className={styles.navExpand} onClick={this.toggleCollapse}><i className="fas fa-bars    "></i></button>
                </ul>
                <div className={styles.navCollapse} id="navCollapse">
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
