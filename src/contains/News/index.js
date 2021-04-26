import React,{ Component } from 'react';
import styles from './news.module.css';
import axios from 'axios';

import store from '../../Store/Store';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state.newsClassifyId = 0;
        this.source = axios.CancelToken.source() //生成取消令牌用于组件卸载阻止axios请求
    }


    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });
        axios.get('http://localhost:3000/data/news.json').then((response) => {
           const newsObj = {
               type: "GET_NEWSLIST",
               newsListData:response.data
           };
           store.dispatch(newsObj);
        });
    }

    componentWillUnmount() {
        this.source.cancel("组件销毁，终止请求");
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { newsListData,newsClassifyId } = this.state;
        return (
            <div>
                <div className={styles.banner}>
                    <img alt="newsBanner" src={newsListData && newsListData.banner} />
                </div>
                <div className={styles.typePage}>
                    <div className={styles.nav}>
                        <div className={styles.titleCon}>
                            <p>&nbsp;</p>
                            <div className={styles.title}>
                                <h2>新闻资讯</h2>
                                <h3>News</h3>
                            </div>
                        </div>
                        <ul>
                            {newsListData && newsListData.news.length > 0 && newsListData.news.map((item,index) => {
                                return (
                                    <li key={"classify"+index}>{item.classify}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <ul className={styles.newsList}>
                        {newsListData && newsListData.news[newsClassifyId].list.map((item,index) => {
                            return (
                                <li key={"newsList"+index}>
                                    <div className={styles.newListImg}>
                                        <img alt="newsListImg" src={item.img} />
                                    </div>
                                    <div className={styles.newsListContent}>
                                        <h4>{item.title}</h4>
                                        <p>{item.content}</p>
                                        <time>{item.time}</time>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default News;