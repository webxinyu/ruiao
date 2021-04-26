import React,{ Component } from 'react';
import axios from 'axios';

import store from '../../Store/Store';
import styles from './footer.module.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe(() => {
           this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/footer.json').then((response) => {
            const footerObj = {
                type: 'GET_FOOTER',
                footerData:response.data
            };
            store.dispatch(footerObj);
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
        const {footerData} = this.state;

        return (
            <div className={styles.typePage}>
                <ul>
                    {footerData && footerData.list.map((item,index) => {
                        return (
                            <li key={"Footer" + index}>{item}</li>
                        )
                    })}
                </ul>
                <div className={styles.serve}>
                    <p>地址：{footerData && footerData.address}</p>
                    <p>咨询热线：{footerData && footerData.tel}</p>
                    <p>固话：{footerData && footerData.fixed}</p>
                    <button>在线留言</button>
                    <button>咨询客服</button>
                </div>
            </div>
        )
    }
}

export default Footer;