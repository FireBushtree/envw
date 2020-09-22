import * as React from 'react'
import './index.less'

export interface SubNavigation {
  name: string
  description?: string
  systemCode?: string
  icon?: React.ReactElement | string
  onClick?: (value: SubNavigation) => any
}

export interface Navigation {
  name: string
  icon?: React.ReactElement | string
  children?: Array<SubNavigation>
}

export interface SuperviseProps {
  navigations: Array<Navigation>
  header: string | React.ReactElement
}

const Supervise: React.FC<SuperviseProps> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const currentNav = props.navigations[activeIndex]
  return (
    <div className="qw-navigation-supervise">
      <div className="qw-navigation-supervise-header">
        {props.header}
      </div>
      <div className="qw-navigation-supervise-navs">
        {props.navigations.map((item, index) => (
          <div
            onClick={() => {
              if (activeIndex === index) {
                return
              }

              setActiveIndex(index)
            }}
            key={index}
            className={`qw-navigation-supervise-navs-item ${
              activeIndex === index ? 'is-active' : ''
            }`}
          >
            <div className="qw-navigation-supervise-navs-icon">
              {item.icon}
            </div>
            <div className="qw-navigation-supervise-navs-name">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="qw-navigation-supervise-subnavs">
        {currentNav.children?.map((item, index) => (
          <div onClick={() => {
            item.onClick && item.onClick(item)
          }} key={index} className="qw-navigation-supervise-subnavs-item">
            <div className="qw-navigation-supervise-subnavs-icon">{item.icon}</div>
            <div className="qw-navigation-supervise-subnavs-detail">
              <div className="qw-navigation-supervise-subnavs-name">{item.name}</div>
              <div className="qw-navigation-supervise-subnavs-description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="qw-navigation-supervise-footer">
        伏泰·环境云提供云计算服务
      </div>
    </div>
  )
}

export default Supervise
