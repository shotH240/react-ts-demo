
export function dragDefaultContentHandler(style: any, callbackMap: any) {
  const { setDefaultList, defaultList, setActiveList, activeList } = callbackMap;
  // 存放被拖拽的defaultList子节点
  let draggedNode: any = null
  
  // 获取defaultList可拖拽节点
  const dragNodes = document.querySelectorAll(`.${style.box}`)

  // 选中区域节点
  const activeDragNode: any = document.querySelector(`.${style['drag-content']}`)
  
  // 最外层节点
  const mainNode: any = document.querySelector(`.${style.main}`);

  // 存放被拖拽的activeList子节点
  let dragActiveNode:any = null

  // 获取选中区域可拖拽节点
  const dragActiveNodes: any = document.querySelectorAll(`.${style['active-box']}`)

  if ([...dragActiveNodes].length) {
    dragActiveNodes.forEach((item:any)=> {
      item.ondragstart = (e:any) => {
        e.dataTransfer.setData('mainIndex', e.target.dataset.set)
        dragActiveNode = item
      }
  
      item.ondragover = (e: any) => {
        e.preventDefault()
      }

      item.ondrop = (e: any) => {
        if (dragActiveNode !== null && dragActiveNode !== item) {
          const temp = document.createElement('div')
          activeDragNode.replaceChild(temp, e.target)
          activeDragNode.replaceChild(e.target, dragActiveNode)
          activeDragNode.replaceChild(dragActiveNode, temp)

          const newId = +dragActiveNode.dataset.set
          const oldId = +e.target.dataset.set
          const newFindIndex = activeList.findIndex((newItem: any) => newItem.value === newId)
          const oldFindIndex = activeList.findIndex((oldItem: any) => oldItem.value === oldId)
          const newList = [...activeList]
          const oldItem = newList.splice(newFindIndex, 1, newList[oldFindIndex])[0]
          newList.splice(oldFindIndex, 1, oldItem)
          setActiveList([...newList])
        }
      }

      item.ondrop = (e: any) => {
        if (dragActiveNode !== null && dragActiveNode !== item) {
          const temp = document.createElement('div')
          activeDragNode.replaceChild(temp, e.target)
          activeDragNode.replaceChild(e.target, dragActiveNode)
          activeDragNode.replaceChild(dragActiveNode, temp)

          const newId = +dragActiveNode.dataset.set
          const oldId = +e.target.dataset.set
          const newFindIndex = activeList.findIndex((newItem: any) => newItem.value === newId)
          const oldFindIndex = activeList.findIndex((oldItem: any) => oldItem.value === oldId)
          const newList = [...activeList]
          const oldItem = newList.splice(newFindIndex, 1, newList[oldFindIndex])[0]
          newList.splice(oldFindIndex, 1, oldItem)
          setActiveList([...newList])
        }
      }
    })
  }

  dragNodes.forEach((item:any)=> {
    item.ondragstart = (e:any) => {
      e.dataTransfer.setData('index', e.target.dataset.set)
      draggedNode = item
    }

    item.ondragover = (e: any) => {
      e.preventDefault()
    }

    item.ondrop = (e: any) => {
      if (draggedNode !== null && draggedNode !== item) {
        const temp = document.createElement('div')
        const dragBox: any = document.querySelector(`.${style['default-list']}`)
        dragBox.replaceChild(temp, e.target)
        dragBox.replaceChild(e.target, draggedNode)
        dragBox.replaceChild(draggedNode, temp)
        // 更改数据源
        const newId = +draggedNode.dataset.set
        const oldId = +e.target.dataset.set
        const newFindIndex = defaultList.findIndex((newItem: any) => newItem.value === newId)
        const oldFindIndex = defaultList.findIndex((oldItem: any) => oldItem.value === oldId)
        const newList = [...defaultList]
        const oldItem = newList.splice(newFindIndex, 1, newList[oldFindIndex])[0]
        newList.splice(oldFindIndex, 1, oldItem)
        setDefaultList([...newList])
      }
    }
  })

  activeDragNode.ondragover = (e: any) => {
    e.preventDefault()
  }

  activeDragNode.ondrop = (e: any) => {
    e.stopPropagation()
    const res = +e.dataTransfer.getData('index')
    const findIndex = defaultList.findIndex((item: any) => item.value === res)
    const fit = activeList.filter((item: any) => item.value === res);
    if (fit.length) return;
    const newDefaultList = [...defaultList]
    const delItem = newDefaultList.splice(findIndex, 1)[0]
    // newDe
    const result = [...activeList, delItem]
    setDefaultList([...newDefaultList])
    setActiveList([...result])
  }

  mainNode.ondragover = (e: any) => {
    e.preventDefault()
  }

  mainNode.ondrop = (e: any) => {
    const res = +e.dataTransfer.getData('mainIndex')
    const findIndex = activeList.findIndex((item: any) => item.value === res)
    if (findIndex < 0) return;
    const newList = [...activeList]
    const delItem = newList.splice(findIndex, 1)[0]
    const result = [...defaultList, delItem]
    setActiveList([...newList])
    setDefaultList(result)
  }
}
// export function dragDefaultContentHandler(style: any, callbackMap: any) {
//   const { setDefaultList, defaultList } = callbackMap;
//   // 存放被拖拽的节点
//   let draggedNode:any = null
//   const defaultListNode: any = document.querySelector(`.${style['default-list']}`)
//   // console.log('defaultListNode', defaultListNode)
//   defaultListNode.addEventListener('dragstart', (e:any) => {
//     // console.log('e===', e.target, e.target.dataset)
//     if (e.target.dataset) {
//       draggedNode = e.target
//     }
//   })

//   defaultListNode.addEventListener('dragover', (e: any) => {
//     e.preventDefault()
//   })

//   defaultListNode.addEventListener('drop', (e: any) => {
//     console.log('dged', e.target, draggedNode, defaultListNode)
//     if (draggedNode !== null && draggedNode !== e.target) {
//       const temp = document.createElement('div')
//       // const dragBox: any = document.querySelector(`.${style['default-list']}`)
// //         dragBox.replaceChild(temp, e.target)
// //         dragBox.replaceChild(e.target, draggedNode)
//       defaultListNode.replaceChild(temp, e.target)
//       defaultListNode.replaceChild(e.target, draggedNode)
//       defaultListNode.replaceChild(draggedNode, temp)
//       console.log('dbl==', e.target, draggedNode)
//       const newId = +draggedNode.dataset.set
//       const oldId = +e.target.dataset.set

//       const newFindIndex = defaultList.findIndex((newItem: any) => newItem.value === newId)
//       const oldFindIndex = defaultList.findIndex((oldItem: any) => oldItem.value === oldId)
//       const newList = [...defaultList]
//       const oldItem = newList.splice(newFindIndex, 1, newList[oldFindIndex])[0]
//       newList.splice(oldFindIndex, 1, oldItem)
//       setDefaultList([...newList])
//       console.log('defaultList',newList)
//     }
//   })
//   // defaultListNode.addEventListener('ondragstart', (e:any) => {
//   //   console.log('e===', e.target)
//   // })
// }