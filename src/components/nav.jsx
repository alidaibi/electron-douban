import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <div className='app-nav'>
        <div className='app-nav-module'>
          <div className='app-nav-module-name'>推荐</div>
          <div className='app-nav-module-item app-nav-module-item-active'>
            <i className='icon iconfont icon-PCbofangye_remen' />
            <span>热门电影</span>
          </div>
          <div className='app-nav-module-item'>
            <i className='icon iconfont icon-dianyingpiao' />
            <span>即将上映</span>
          </div>
          <div className='app-nav-module-item'>
            <i className='icon iconfont icon-koubei' />
            <span>最佳口碑</span>
          </div>
          <div className='app-nav-module-item'>
            <i className='icon iconfont icon-fenxiang' />
            <span>Top250</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
