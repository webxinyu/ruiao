import React,{ Component } from 'react';
import axios from 'axios';

import store from '../../Store/Store';

import styles from './homeAbout.module.css';

class HomeAbout extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/homeAbout.json').then((response) => {
            const aboutObj = {
                type: 'GET_ABOUT',
                aboutData:response.data
            };
            store.dispatch(aboutObj);
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }

    render() {
        const { aboutData } = this.state;
        return (
            <div className={styles.typePage}>
                <h1>{ aboutData && aboutData.title }</h1>
                <span> </span>
                <div className={styles.content}>
                    <img alt="aboutImg" src={aboutData && aboutData.img} />
                </div>
                <article>{aboutData && aboutData.description}</article>
            </div>
        )
    }

}

export default HomeAbout;