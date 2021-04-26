import React,{ Component } from 'react';
import styles from './navs.module.css';
import { Link } from 'react-router-dom';

class Navs extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className={styles.navs}>
               {/* logo */}
               <div className={styles.logo}>logo</div>
               {/* 导航部分*/}
               <div className={styles.navList}>
                   <Link to="/">
                       <span>首&nbsp;&nbsp;&nbsp;&nbsp;页</span>
                   </Link>
                   <Link to="/product">
                       <span>产品中心</span>
                   </Link>
                   <Link to="/news">
                       <span>新闻资讯</span>
                   </Link>
                   <Link to="/about">
                       <span>关于我们</span>
                   </Link>
               </div>
                {/* 搜索组件 */}
                <div className={styles.NavsSearch}>
                    搜索
                </div>
            </div>
        )
    }
}

export default Navs;