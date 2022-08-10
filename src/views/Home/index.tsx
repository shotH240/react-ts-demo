// @flow
import React, {useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import style from './style/index.module.scss';

interface NavListTarget {
  label: string,
  path: string
}

export default function Home(props:any){
  const navigate = useNavigate();
  const [target, setTarget] = useState('test');
  const navList:Array<NavListTarget> = [
    { label: '基础类型', path: '/basis' },
    { label: '拖拽', path: '/drag' },
  ];
  useEffect(() => {
    setTarget('666');
    // const someValue: any = 'test';
    // // const svn: number = (someValue as string).length;
    // // const arr: Array<string | boolean> = [false, 'catt']
    // // console.log('svn==', svn, arr)
    // // console.log('this==', target)
  }, [navigate, props.state, target])

  function toPage(path: string) {
    console.log('path=', path)
    navigate(path, { state: { query: 'test' } })
  }

  function NavListComponent() {
    return (
      <div className={style['nav-list']}>
        {navList.map((item, index) => {
          return (
            <div
              className={style.block}
              key={index}
              onClick={() => toPage(item.path)}>{item.label}</div>
          )
        })}
      </div>
    )
  }
  return (
    <div className={style.main}>
      <NavListComponent />
    </div>
  );
};