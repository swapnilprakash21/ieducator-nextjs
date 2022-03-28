import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css';
import AOS from 'aos'
import "aos/dist/aos.css";
import Typed from 'react-typed';

export default class Index extends Component {
    componentDidMount() {
        AOS.init();
    }
    render() {
        return (
            <>
                <Head>
                    <title>iEducator - Making Education a Reality For All</title>
                </Head>
                <div>
                    <div className={styles.header}>

                        <div>
                            <img src="/img/studentClassroom.jpg" alt="" id="slide" />
                            <div className={styles.headerContent}>
                                <div className={styles.headerLogo}></div>
                                <h1 className={styles.headerTitle}>Innovative Solutions For Making Education <span style={{ 'color': '#0dcaf0' }}><Typed strings={['Accessible For All', 'A Reality For All Citizens', 'A Holistic Experience',]} typeSpeed={40} backSpeed={50} loop></Typed></span></h1>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sdgBox}>
                        <img src="/img/sdg_logo.png" alt="" className={styles.sdgImg} />
                        <div className={`${styles.container} ${styles.sdgContainer}`}>
                            <p className='mb-2'>
                                We are at the brink of a global transformation. The international community, through the United Nations, has set in motion a historic plan – 17 Sustainable Development Goals – that aims to build a more prosperous, more equal, and more secure world by the year 2030.
                            </p>
                            <p className='mb-2'>
                                The <a href="https://sdgs.un.org/2030agenda" target="_blank" rel="noopener noreferrer" className={styles.sdgLink}>17 SDGs and 169 targets</a> are part of the 2030 Agenda for Sustainable Development adopted by 193 Member States at the UN General Assembly Summit in September 2015, and which came into effect on 1 January 2016. These goals are the result of an unprecedented consultative process that brought national governments and millions of citizens from across the globe together to negotiate and adopt the global path to sustainable development for the next 15 years.
                            </p>
                            <div>
                                <h1 className='mb-2'>India&apos;s Leading Role</h1>
                                <p>
                                    The Government of India is strongly committed to the 2030 Agenda, including the SDGs, as evidenced by the statements of the Prime Minister and other senior Ministers at national and international meetings. India’s national development goals and its &quot;<span style={{ "fontStyle": "italic" }}>sab ka saath, sab ka vikas</span>&quot; or &quot;<span style={{ "fontStyle": "italic" }}>development with all, and for all,</span>&quot; policy initiatives for inclusive development converge well with the SDGs, and India will play a leading role in determining the success of the SDGs, globally.   As Prime Minister Narendra Modi noted, &quot;<span style={{ "fontStyle": "italic" }}>These goals reflect our evolving understanding of the social, economic and environmental linkages that define our lives.</span>&quot;.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.solBox}>
                        <div className={styles.sol}>
                            <div className={styles.probDescContainerMain}>
                                <div className={styles.probDescContainer}>
                                    <div className={styles.left}>
                                        <img src="/img/qualityEducation.jpg" alt="" className={styles.problemImage} />
                                    </div>
                                    <div className={`${styles.right}`}>
                                        <h2>Possible steps that can be taken to accomplish the India 2030 agenda.</h2>
                                        <p className={styles.problemDesc}>
                                            It&apos;s absolutely true that the future and overall development of any country depends upon the fact that
                                            how educated its citizens are.
                                        </p>
                                        <p className={styles.problemDesc}>

                                            Though, gaining a professional degree is not possible for everyone due to various reasons, but what
                                            actually matters is the basic education, i.e. one should know how to read and write.
                                        </p>
                                        <p className={styles.problemDesc}>
                                            India has shown significant improvement in education since 1947 until today. However, we believe that
                                            there is always some room for improvement in every field. So let us have a look upon ways that can help us
                                            improve our education system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.solContainer}>
                                {
                                    this.props.data.data.map((element) => {
                                        const src = element.attributes.img.data.attributes.url;
                                        return <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000" data-aos-easing="ease-in-out"
                                            data-aos-once="true" className={styles.solutionCard} key={element.id}>
                                            <div className={styles.solImgContainer}>
                                                <img src={src} alt={element.attributes.title} className={styles.solImg} />
                                            </div>
                                            <div className={styles.solContent}>
                                                <h2>{element.id}. {element.attributes.title}</h2>
                                                <p>
                                                    {element.attributes.desc}
                                                </p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={`${styles.container} ${styles.conclusionBox}`}>
                                <p>
                                    The education system of ancient India has always marked its impression all over the world. So why not achieve another milestone in education by making some more improvements! With little effort, planning, hard-work and a positive attitude, we can definitely take our education system to new heights!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


// Fetching the solutions from the ieducator api using getStaticProps
export async function getStaticProps() {
    const res = await fetch('https://ieducator-api-strapi-sp.herokuapp.com/api/solutions?populate=*&sort=id');
    const data = await res.json();
    return {
        props: { data },
    }
}