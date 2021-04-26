import React,{ Component } from 'react';
import axios from 'axios';

import store from '../../Store/Store';
import styles from './homeNews.module.css';



class HomeNews extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state.newsId = 0;
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }


    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/homeNews.json').then((response) => {
            const newsObj = {
              type:"GET_NEWS",
              newsData:response.data
            };
            store.dispatch(newsObj);
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // 阻止轻轻
        this.source.cancel("组件卸载，取消请求")
    }
    /* 点击新闻列表事件 */
    newsListClick(index) {
        this.setState({
            newsId:index
        })
    }

    render() {
        const {newsData,newsId} = this.state;
        const newsList = newsData && newsData.list;
        return (
            <div className={styles.typePage}>
                <h1>{newsData && newsData.title}</h1>
                <span> </span>
                <div className={styles.content}>
                    <div className={styles.newsImg}>
                        <img alt="homeNewsImg" src={newsList && newsList[newsId].img} />
                    </div>
                    <div className={styles.rightContent}>
                        <h6>{newsList && newsList[newsId].title}</h6>
                        <article>{newsList && newsList[newsId].summary}</article>
                        <button>了解详情</button>
                    </div>
                </div>
                <ul>
                    {newsList && newsList.map((item,index) => {
                        if (index < 4) {
                            return (
                                <li
                                    onClick={() => this.newsListClick(index)}
                                    key={"newsList"+index}>
                                    <span style={{backgroundColor:(item.id === (newsId + 1) ? "#0c4da2" : "#ccc")}}>{item.id}</span>
                                    {item.title}
                                    <time>{item.date}</time>
                                </li>
                            )
                        } else {
                            return false;
                        }
                    })}
                </ul>
            </div>
        )
    }
}

export default HomeNews;