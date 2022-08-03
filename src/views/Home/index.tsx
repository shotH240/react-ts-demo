// @flow
import * as React from 'react';
import style from './style/index.module.scss';

interface NavListTarget {
  label: string,
  path: string
}

type Props = {
  state: object
};
type State = {
  target: string,
  navList: Array<NavListTarget>
};


export default class Home extends React.Component<Props, State>{
  constructor({ props }: any) {
    super(props);
    this.state = {
      target: 'test',
      navList: [
        { label: '基础类型', path: '' },
      ]
    }
  }
  async componentDidMount() {
    console.log('cdd==', style, this.props.state, this.state)
    await this.setState({
      target:'666'
    })
    const someValue: any = 'test';
    const svn: number = (someValue as string).length;

    const arr: Array<string | boolean> = [false, 'catt']
    console.log('svn==', svn, arr)
    console.log('this==', this.state.target)
  }

  toPage(path: string) {
    console.log('path=', path)
  }

  navListComponent() {
    return (
      <div className={style['nav-list']}>
        {this.state.navList.map((item, index) => {
          return (
            <div
              className={style.block}
              key={index}
              onClick={() => this.toPage(item.path)}>{item.label}</div>
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div className={style.main}>
        {/* { navList} */}
        { this.navListComponent() }
      </div>
    );
  };
};