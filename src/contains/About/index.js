import React,{ Component } from 'react';
import axios from 'axios';
import store from '../../Store/Store';

import styles from './about.module.css';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }


    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });

        axios.get('http://localhost:3000/data/about.json').then((response) => {
            const aboutObj = {
                type: 'GET_ABOUTSHOW',
                aboutShowData:response.data
            };
            store.dispatch(aboutObj);
        })
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        };
        this.source.cancel("组件销毁，终止请求");
    }

    render() {
        const { aboutShowData } = this.state;
        return (
            <div>
                <div className={styles.banner}>
                    <img alt="aboutImg" src={aboutShowData && aboutShowData.banner} />
                </div>
                <div className={styles.introduceCon}>
                    <h1>{aboutShowData && aboutShowData.introduce.title}</h1>
                    <p>{aboutShowData && aboutShowData.introduce.content}</p>
                </div>
                <ul className={styles.threeCon}>
                    {aboutShowData && aboutShowData.three.map((item, index) =>{
                        return (
                            <li key={"three"+index}>
                                <h2>{item.title}</h2>
                                <h5>{item.content}</h5>
                                <div className={styles.imgCon}>
                                    <img alt="aboutListImg" src={item.img} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default About;