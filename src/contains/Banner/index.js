import React,{ Component } from 'react';
import styles from './banner.module.css';
import store from '../../Store/Store';
import axios from "axios";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state.bannerId = 0;
        clearInterval(this.timer);
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState())
        });
        this.timer = setInterval(() => {
            this.bannerLoop();
        }, 3000)
    }

    componentWillUnmount() {
        if (this.timer != null){
            clearInterval(this.timer);
        }
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }

    bannerLoop() {
        this.setState({
            bannerId:this.state.bannerId + 1
        });
        if(this.state.bannerId > this.state.productBannerList.length - 1) {
            this.setState({
                bannerId:0
            });
        }
    }

    render() {
        const { productBannerList,bannerId } = this.state;
        return (
            <div className={styles.typePage}>
                <ul>
                    {productBannerList && productBannerList.map((item, index) => {
                        return (
                            <li style={bannerId === index ? {opacity: "0",display:"none"} : {opacity: "1",display:"block"}} key={"productBanner"+index}>
                                <img alt="bannerImg" src={item} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Banner;