import React, { useState, useEffect } from 'react'
import { getDefaultList, DefaultList } from './utils/config';
// import { dragDefaultContentHandler } from './utils/handle';
import { format } from './utils/handle';
import style from './index.module.scss';
// 存放被拖拽的activeList子节点
let dragActiveNode:any = null
let draggedNode:any = null
export default function Drag() {
  const [defaultList, setDefaultList] = useState(getDefaultList());
  const [activeList, setActiveList] = useState<Array<DefaultList>>([]);

  useEffect(() => {
    console.log('onload')
    return () => {
      console.log('unmount==')
    }
  }, [])

  // useEffect(() => {
  //   const clearEvent = dragDefaultContentHandler(style, {
  //     setActiveList,
  //     setDefaultList,
  //     defaultList,
  //     activeList
  //   })
  // }, [activeList, defaultList])
  function preventDefault(e: any) {
    e.preventDefault()
  }

  function dragStart(e: any, key: string) {
    e.dataTransfer.setData(key, e.target.dataset.set)
    if (key === 'index') {
      draggedNode = e.target
    } else {
      dragActiveNode = e.target
    }
  }

  function activeBoxDrop(e: any) {
    if (dragActiveNode !== null && dragActiveNode !== e.target) {
      const newId = +dragActiveNode.dataset.set
      const oldId = +e.target.dataset.set
      const newFindIndex = activeList.findIndex((newItem: any) => newItem.value === newId)
      const oldFindIndex = activeList.findIndex((oldItem: any) => oldItem.value === oldId)
      const newList = [...activeList]
      const oldItem = newList.splice(newFindIndex, 1, newList[oldFindIndex])[0]
      newList.splice(oldFindIndex, 1, oldItem)
      setActiveList([...format([...activeList], newFindIndex, oldFindIndex)])
    }
  }

  function defaultBoxDrop(e: any) {
    if (draggedNode !== null && draggedNode !== e.target) {
        // 更改数据源
        const newId = +draggedNode.dataset.set
        const oldId = +e.target.dataset.set
        const newFindIndex = defaultList.findIndex((newItem: any) => newItem.value === newId)
        const oldFindIndex = defaultList.findIndex((oldItem: any) => oldItem.value === oldId)
        setDefaultList([...format([...defaultList], newFindIndex, oldFindIndex)])
    }
  }

  function activeDragNode(e: any) {
    e.stopPropagation()
    const res = +e.dataTransfer.getData('index')
    const findIndex = defaultList.findIndex((item: any) => item.value === res)
    const fit = activeList.filter((item: any) => item.value === res);
    if (fit.length) return;
    const newDefaultList = [...defaultList]
    const delItem = newDefaultList.splice(findIndex, 1)[0]
    // newDe
    const result:Array<DefaultList> = [...activeList, delItem]
    setDefaultList([...newDefaultList])
    setActiveList([...result])
  }

  function activeMainDragNode(e: any) {
    const res = +e.dataTransfer.getData('mainIndex')
    const findIndex = activeList.findIndex((item: any) => item.value === res)
    if (findIndex < 0) return;
    const newList = [...activeList]
    const delItem = newList.splice(findIndex, 1)[0]
    const result = [...defaultList, delItem]
    setActiveList([...newList])
    setDefaultList(result)
  }
  return (
    <div
      className={style.main}
      draggable
      onDragOver={(e: any) => preventDefault(e)}
      onDrop={(e:any) => activeMainDragNode(e) }>
      <div
        className={style['drag-content']}
        onDragOver={(e: any) => preventDefault(e)}
        onDrop={(e:any) => activeDragNode(e) }
        >
        {activeList.map((item:DefaultList) => (
          <div
            className={style['active-box']}
            key={item.value}
            draggable
            data-set={item.value}
            onDragStart={(e: any) => dragStart(e, 'mainIndex')}
            onDragOver={(e: any) => preventDefault(e)}
            onDrop={(e:any) => activeBoxDrop(e) }
          >{item.label}</div>
          )) }
      </div>
      <div className={style['default-list']} draggable>
        {defaultList.map((item) => (
          <div
            className={style.box}
            key={item.value}
            draggable
            data-set={item.value}
            onDragStart={(e: any) => dragStart(e, 'index')}
            onDragOver={(e: any) => preventDefault(e)}
            onDrop={(e: any) => defaultBoxDrop(e)}
          >{item.label}</div>
        )) }
      </div>
      <div onClick={(e) => {
        console.log('aaaa', activeList)
        // activeBoxDragStart(e)
      } }>{defaultList.map(item => item.value).join('-')}</div>
    </div>
  )
}