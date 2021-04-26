import React,{ Component } from 'react';
import styles from "./copyright.module.css";

import store from '../../Store/Store';
import axios from "axios";

class Copyright extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }


    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
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
        const { footerData } = this.state;
        return (
            <div className={styles.typePage}>
                <p className={styles.copyright}>{footerData && footerData.copyright}</p>
            </div>
        )
    }
}

export default Copyright;