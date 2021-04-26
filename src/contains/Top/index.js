import React,{ Component } from 'react';
import styles from './top.module.css';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={styles.topContainer}>
                <div className={styles.top}>
                    <h5>专注减速机，开窗机研发生产</h5>
                    <p>邮箱：150xxxxxx@163.com &nbsp;&nbsp;&nbsp;&nbsp;电话：150xxxxxx</p>
                </div>
            </div>
        )
    }
}

export default Top;