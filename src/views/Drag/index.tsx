import React, { useState, useEffect } from 'react'
import { getDefaultList, DefaultList } from './utils/config';
import { dragDefaultContentHandler } from './utils/handle';
import style from './index.module.scss';
export default function Drag() {
  const [defaultList, setDefaultList] = useState(getDefaultList());
  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    console.log('onload')
    return () => {
      console.log('unmount==')
    }
  }, [])

  useEffect(() => {
    const clearEvent = dragDefaultContentHandler(style, {
      setActiveList,
      setDefaultList,
      defaultList,
      activeList
    })
  }, [activeList, defaultList])
  return (
    <div className={style.main} draggable>
      <div className={style['drag-content']}>
        {activeList.map((item:DefaultList) => (
            <div className={style['active-box']} key={item.value} draggable data-set={item.value}>{item.label}</div>
          )) }
      </div>
      <div className={style['default-list']} draggable>
        {defaultList.map((item) => (
          <div className={style.box} key={item.value} draggable data-set={item.value}>{item.label}</div>
        )) }
      </div>
      <div onClick={() => {
        console.log('aaaa', activeList)
      } }>{defaultList.map(item => item.value).join('-')}</div>
    </div>
  )
}