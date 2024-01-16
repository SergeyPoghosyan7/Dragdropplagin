import React, {useState, useRef, useEffect} from "react";
import SortableTree, {
    addNodeUnderParent,
    removeNodeAtPath,
    changeNodeAtPath,
    toggleExpandedForAll
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
// import css from "./menu.module.scss"
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {Button, TextField} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useDispatch, useSelector} from "react-redux";
import {changeMenu, getMenu, postMenu} from "../redux/slices/menuSlice";
import "../endlessMenu/menu.css"
import { useSearchParams } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    
  });


    

function Tree() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const [fileUrl , setFileUrl]= useState('')
    const [fileUrl2 , setFileUrl2]= useState('')
    const [searchFocusIndex, setSearchFocusIndex] = useState(0);
    const [searchFoundCount, setSearchFoundCount] = useState(null);
    const [imgObj , setImgObj]= useState(
[

]
    )
    const [idObj, setIdObj ] = useState([])
    const [ rowId , setRowId] = useState("")
    const inputEl = useRef();
    const [collaps, setCollaps] = useState(false)
    const {menu} = useSelector(state => state.menuReducer)
    const dispatch = useDispatch()
    const [treeData, setTreeData] = useState(menu);
    const [dis, setDis]= useState("block")
   const [valEdit , setValEdit] = useState("")
   const [valAdd , setValAdd] = useState("")
    const [searchParams, setSearchParams] =  useSearchParams()
    const [rowInfo2 , setRowinfo2] = useState([])
    useEffect(()=>{
  setSearchParams({
    add:"false"
  })
    },[])

    useEffect(() => {
        dispatch(getMenu())
    }, [])
    useEffect(() => {
        setTreeData(menu)

    }, [menu])

    useEffect(() => {
            treeData.map((menu, index) => {
                dispatch(changeMenu({menu :menu ,index : index}))
            })
    }, [treeData , menu])

    function createNode() {
        console.log(treeData , "teree data");
setFileUrl2('')    
   const value = inputEl.current.value;
        //    treeData[treeData.length-1].img =
        setSearchParams({
            add:"false"
          })
    

        if (value === "") {
            inputEl.current.focus();
            return;
        }

        let newTree = addNodeUnderParent({
            treeData: treeData,
            parentKey: null,
            expandParent: true,
            getNodeKey,
            newNode: {
                id: Math.random(),
                title: value
            }
        });
        setIdObj(newTree.newNode)
        console.log(idObj);
        dispatch(postMenu({title : inputEl.current.value}))
        setTreeData(newTree.treeData);
      
        inputEl.current.value = "";
    }

     function editInp(rowInfo) {
        setSearchParams({
            edit:"true",
            title:rowInfo.node.title
           })
              setValEdit(rowInfo.node.title)
     }
    function updateNode(rowInfo ,valEdit) {
     console.log(rowInfo, "row.id");

let dataImg = {
  id:rowInfo.node.id,
  img: fileUrl2,
  title:rowInfo.node.title
  
} 
console.log(imgObj, "imgObj");
// newTree.treeData.map((el)=>{
    
// })
console.log(treeData, "tree data 222");
 setImgObj([
   ...imgObj,{
    id:rowInfo.node.id,
    img: fileUrl2,
    title:rowInfo.node.title,


 } 

 
 ])
//  console.log(rowInfo.node.id);
  console.log(imgObj , "imgobj");
    
  dataImg= {}
        setSearchParams({
            edit:"false",
            title:rowInfo.node.title
           })
// console.log(rowInfo);
// console.log(rowInfo.node.title , "ldld");
   setValEdit(rowInfo.node.title)
  rowInfo.node.img = fileUrl2
        const {node, path} = rowInfo;
        const {children} = node;
        inputEl.value = valEdit
        const value = inputEl.value;

        if (value === "") {
            inputEl.current.focus();
            return;
        }

        let newTree = changeNodeAtPath({
            treeData,
            path,
            getNodeKey,
            newNode: {
                children,
                title: value
            }
        });

        setTreeData(newTree);
        inputEl.value = ""; 
//           setSearchParams({
   
//    })

    }
  

    function addInp(rowInfo) {
        setSearchParams({
            addMenu:"true",
            title:rowInfo.node.title
           })
    }
    function addNodeChild(rowInfo , valAdd ) { 
  
    //    console.log(rowInfo);
    //    console.log(inputEl);
     

        let {path} = rowInfo;
        inputEl.value = valAdd
      console.log(inputEl);
        const value = valAdd
//   console.log( valAdd, "value");
        if (value === "") {
            inputEl.current.focus();
            return;
        }

        let newTree = addNodeUnderParent({
            treeData: treeData,
            parentKey: path[path.length - 1],
            expandParent: true,
            getNodeKey,
            newNode: {
                title: value
            }
        });
        setTreeData(newTree.treeData);
        inputEl.value = ""; 
          setSearchParams({
           
           })
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setFileUrl(url);  
         console.log(fileUrl  , "fileurl");

     };
    function removeNode(rowInfo) {
  
        const {path} = rowInfo;  
            console.log(rowInfo);
        setTreeData(
            removeNodeAtPath({
                treeData,
                path,
                getNodeKey
            })
        );
    }

    function updateTreeData(treeData) {
        setTreeData(treeData);
        console.log(treeData , "treeData");
    }

    function expand(expanded) {
// console.log(expanded);
        setTreeData(
            toggleExpandedForAll({
                treeData,
                expanded
            })
        );
    }
    function collapseAll(state) {
        // console.log(state, "state");
        expand(state);
    }
  
 const rightUpdateNode = () => updateNode()
    const getNodeKey = ({treeIndex}) => treeIndex;

    return ( 

   
        <>  
<div className="minHeader">
    {/* <div className="minHeaderIcons"> 
       <div className="star">
        <AccountBoxIcon/>
            </div>
        <div className="star">
            ⭐
            </div>
    
    
    </div> */}
</div>
        <div className="header">
             <div className="menuName">
                Մենյու
             </div>
             <div className="menuName2">
                Տեղեկություն
                
             </div>
             
                </div>
        <div>
            <div className="allGlav">

      
            <div className="menuContainer">
                <div className="collapsFlags">

              <div className="flags">
                <div className="flag">
                    <img src="https://www.worldometers.info/img/flags/am-flag.gif" width="25px" height="15px"  />
                </div>
                <div className="flag">
                    <img src="https://www.worldometers.info/img/flags/us-flag.gif" width="25px" height="15px"  />
                </div>
                <div className="flag">
                    <img src="https://www.worldometers.info/img/flags/small/tn_rs-flag.gif" width="25px" height="15px"  />
                </div>
              </div>
             <div className="collaps" onClick={() => {
                    setCollaps(!collaps)
                    collapseAll(collaps)
                }}>
                {
                        collaps ?  <VisibilityOffIcon/>
                            :
                            <VisibilityIcon/>
                    }
                </div>  
                </div>
                <div className="addMenuBox">
                    {

                    }
                   
                        {searchParams.get("add") == "true"? <>
                        <div className="menuAddInp">

                
                         <input
                         placeholder="Add Menu"
                        className="addMenuInput"
                        ref={inputEl} type="text"/>
                    
                    <Button
                        onClick={createNode}
                        sx={{height: "25px", background: "#61dafb"}}
                        variant="contained" href="#contained-buttons" >Add</Button>        </div></>  : 
                   <div className="addGlavCategories"><Button sx={{"color":"black", "border":"2px solid rgb(91, 80, 80)", }} onClick={()=>{
                  setSearchParams({
                    add:"true"
                  })
                //   setFileUrl('')
                //   setFileUrl2("")
             
                        }}>
                              +  
                        </Button>   </div>     }
                       
                    
                   
                  
                </div>
                
            
            <div>
<input type="text" style={{"display":"none"}}/>
            </div>
  


                <SortableTree
                    className="menu"
          
                    isVirtualized={false}
                    treeData={treeData}
                    onChange={(treeData) => updateTreeData(treeData)}
                    searchFocusOffset={searchFocusIndex}
                    searchFinishCallback={(matches) => {
                
                        setSearchFoundCount(matches.length+1);
                        setSearchFocusIndex(
                            // console.log()
                            matches.length > 0 ? searchFocusIndex % matches.length : 0
                        );
                        
                    }}
            
                    canDrag={({node}) => !node.dragDisabled}
 
                    generateNodeProps={(rowInfo) => ({

                        // buttonsbuttonsbuttonsbuttonsbuttonsbuttonsbuttons
                        // buttonsbuttonsbuttonsbuttonsbuttonsbuttonsbuttons
                               // buttonsbuttonsbuttonsbuttonsbuttonsbuttonsbuttons  
                       buttons : [
                            <>

                      
                            <div className="buttons">
                                <div className="iconAddMenu">



           {/* {console.log(rowInfo, "rowinfo")} */}
       
  

                                              {
                                           
                                                imgObj.map((el , ind)=>{
                       
                        
                              
                        if (el.title==rowInfo.node.title  ) {
                          
                                el.id="add"
                                
                                  return(   
                                    <>
                                    <div>

                                        
                                    <img src={el.img} className="imgGlavDiv" style={{"width":"25px", "borderRadius":"15px" , "display":"block"}} /> 
                                      </div>  
                                      </> 
                                      ) 
                         
                        //     else{
                        //      el.id= "add"
                                           
                        //     return(              
                        //         <img src={el.img} style={{"width":"25px", "borderRadius":"15px" , "display":"block"}} />
                        //           ) 
                        //    }
                             
                      }
                                                    
                          
            //             if (el.title==rowInfo.node.title  && el.id!="add") {
            //                 console.log("xcssssssssssssssssssssssssssssssssssssssssssssssssssss");
                   
            //      el.id= "add"
                                           
            //                 return(              
            //                     <img src={el.img} style={{"width":"25px", "borderRadius":"15px" , "display":"block"}} />
            //                       )              
            //           }
            //           if (el.id == "add"  ) {
            //    el.id ='l'
              
            //    for (let i = 0; i < imgObj.length-1; i++) {
                           
            //              if (imgObj[i].title == treeData[i].title) {  
            //                console.log("acssssssssssssssssssssssssssssssssssssssssssssssssssss");
                
            //                  imgObj[i].img =''
                       
            //              }else if(i > 1){
            //                 el.id=""
            //                 if (imgObj[i].title == treeData[i-1].title) {
                                
            //                 }
            //    console.log("llssssssssssssssssssssssssssssssssssssssssssssssssssss");

            //                 imgObj[i].img =''
                       
            //              }
                
                      
            //          }

            //           }
                    
                    
                                         
                  
                                            
                                            
                                            
                                                })
                                              }               
                                                   
                                   
                                 
                                </div>
                   
                                         {searchParams.get("addMenu")== "true"  && searchParams.get("title")== rowInfo.node.title  ?
            <>
            <div className="inpChildEdit">

            <input id="outlined-basic" label="Outlined" className="catInpAdd"  variant="outlined"  style={{borderRadius:"15px" ,  marginBottom:"10px" , opacity: "0.9"}} onChange={(e)=>{
                 setValAdd(e.target.value)
            }}/>
       
            {/* <input className="catInpAdd" style={{borderRadius:"15px" ,}} onChange={(e)=>{
                 setValAdd(e.target.value)
            }}/>  */}
            <Button style={{marginTop:"15px" , backgroundColor:"white", marginBottom:"10px" , opacity: "0.9"}} className="catBtnAdd" onClick={()=>{
      addNodeChild(rowInfo, valAdd)
      setFileUrl('')
      setFileUrl2("")
            }} >
                Add+
            </Button>
             </div>
      {      console.log(rowInfo , "row")}
            </>:null}
                                         {searchParams.get("edit")== "true"  && searchParams.get("title") == rowInfo.node.title  ?
            <>
            <div className="inpChildEdit">

           
            <input className="catInpAdd"  value={valEdit} style={{borderRadius:"15px" ,  marginBottom:"10px" , opacity: "0.9"}}   onChange={(e)=>{
                setValEdit(e.target.value)
            }}/> 
            <Button  style={{marginTop:"15px" , backgroundColor:"white" , marginBottom:"10px", opacity: "0.9"}} className="catBtnAdd" onClick={()=>{
                updateNode(rowInfo, valEdit)
              
          
                // rowInfo.node.img = fileUrl2    
                //   setFileUrl2(fileUrl) 
                   setFileUrl('')
               
          
            }}> 
          Save
            </Button>
             </div>
      {      console.log(rowInfo , "row")}
            </>:null}
                                <div
                    
                                    className="editAddDeleteBtn1"
                                    onClick={(event) => editInp(rowInfo)}>
                                     
                                    <EditIcon/>
                                </div>
                                <div
                                    className="editAddDeleteBtn2"
                                    onClick={(event) =>addInp(rowInfo)}
                                >
                                    <AddBoxIcon/>
                                </div>
                                <div
                                    className="editAddDeleteBtn3"
                                    onClick={(event) => removeNode(rowInfo)}>
                                    <DeleteIcon/>
                                </div>
                            </div>

                       </> ],
                        style: {
                            height: "50px",
                            border: "1px solid",
                            display:"flex",
                            gap:"120px",
                            marginTop:"20px",
                            justifyContent: "center",
                            alignItems: "center",
                         
                        },
                 
                    })  }
               />      </div>   

           {searchParams.get('title') && searchParams.get('edit') == "true"? <div className="nameCat" id="square">
   <div className="nameCatTitle">

   <Stack spacing={2} sx={{ width: '100%' ,    position: "absolute",
    border:"1px solid blues"}}>
       <div className="alertDiv">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '150px' , position: "absolute", top:"60px" , height:"85px"}}>
          This is a success message!
        </Alert>
      </Snackbar>
   </div>
    </Stack>
 
    <p>
    <TextField id="standard-basic" label={searchParams.get("title")} variant="standard"  value={valEdit} onChange={(e)=>{
        setValEdit(e.target.value)
    }}/>

    </p>
   </div>
   <div className="addIcons">
    <p>Ավելացնել Icon</p>
    
    <div className="addDivIcon2">

     <label htmlFor="filled-basic1">  <div className="divFileUrl" onClick={()=>{
       
    }}> <input id="filled-basic1" label="" type="file" style={{display:"none"}}  onChange={handleFileChange}variant="filled" />


         <div className="textFileUrl">
          {fileUrl.length > 1?   <img src={fileUrl} width="50px" style={{borderRadius:"15px"}} alt="" srcset="" />:          <img src="https://static.thenounproject.com/png/396915-200.png" width="50px" alt="" srcset="" />
}
     
  {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
         <path d="M18.5625 0H3.4375C1.54201 0 0 1.65863 0 3.69748V16.6387C0 18.6775 1.54201 20.3361 3.4375 20.3361H11.6016C11.9294 20.3361 12.2286 20.1356 12.3732 19.8189C12.5175 19.5024 12.4819 19.1249 12.2812 18.8461L10.0334 15.7213L16.2635 7.19745L20.2812 12.353V13.9118C20.2812 14.4223 20.666 14.8361 21.1406 14.8361C21.6153 14.8361 22 14.4223 22 13.9118V3.69748C22 1.65863 20.458 0 18.5625 0V0ZM16.9008 5.13729C16.7345 4.92389 16.4879 4.80203 16.2288 4.8069C15.9698 4.81124 15.7266 4.94086 15.5666 5.15986L8.94875 14.2138L6.69524 11.0814C6.53242 10.855 6.28149 10.7227 6.01562 10.7227C6.01529 10.7227 6.01479 10.7227 6.01445 10.7227C5.74808 10.7231 5.49681 10.8563 5.3345 11.0834L3.44321 13.728C3.15384 14.1327 3.22417 14.713 3.60031 15.0243C3.97662 15.3357 4.51608 15.2599 4.80545 14.8553L6.01764 13.1604L9.84991 18.4874H3.4375C2.48984 18.4874 1.71875 17.658 1.71875 16.6387V3.69748C1.71875 2.67814 2.48984 1.84874 3.4375 1.84874H18.5625C19.5102 1.84874 20.2812 2.67814 20.2812 3.69748V9.47515L16.9008 5.13729ZM6.01562 3.32773C4.59396 3.32773 3.4375 4.57166 3.4375 6.10084C3.4375 7.63002 4.59396 8.87395 6.01562 8.87395C7.43729 8.87395 8.59375 7.63002 8.59375 6.10084C8.59375 4.57166 7.43729 3.32773 6.01562 3.32773ZM6.01562 7.02521C5.54179 7.02521 5.15625 6.61051 5.15625 6.10084C5.15625 5.59117 5.54179 5.17647 6.01562 5.17647C6.48946 5.17647 6.875 5.59117 6.875 6.10084C6.875 6.61051 6.48946 7.02521 6.01562 7.02521ZM22 17.6092C22 18.1198 21.6153 18.5336 21.1406 18.5336H18.7773V21.0756C18.7773 21.5862 18.3926 22 17.918 22C17.4433 22 17.0586 21.5862 17.0586 21.0756V18.5336H14.6953C14.2206 18.5336 13.8359 18.1198 13.8359 17.6092C13.8359 17.0987 14.2206 16.6849 14.6953 16.6849H17.0586V14.1429C17.0586 13.6323 17.4433 13.2185 17.918 13.2185C18.3926 13.2185 18.7773 13.6323 18.7773 14.1429V16.6849H21.1406C21.6153 16.6849 22 17.0987 22 17.6092Z" fill="white"/>
         </svg>  */}
         </div>
       </div>  </label>
 
    </div>      <Button variant="contained" sx={{   position:" relative",
   top: "15px",left:"35px",backgroundColor:" rgb(221, 43, 90)"}} onClick={()=>{
    handleClick()

     setFileUrl2(fileUrl)
    //  setFileUrl("")
    // setImgObj({
    //     []
    // })
     
   }}>Պահպանել</Button>
   </div></div>  
          :<div className="nameCat" >
          <div className="nameCatTitle">
           <p>
{valEdit}

           </p>
          </div>
          <div className="addIcons">
           <p>Ավելացնել Icon</p>
           <div className="addDivIcon2">
       
            <label htmlFor="filled-basic1">  <div className="divFileUrl" onClick={()=>{
              
           }}> <input id="filled-basic1" label="" type="file" style={{display:"none"}}  variant="filled" />
       
       
                <div className="textFileUrl">
                 
                 <img src="https://static.thenounproject.com/png/396915-200.png" width="50px" alt="" srcset="" />
            

                </div>
              </div>  </label>
           </div>
          </div></div>} 
   
          </div>
          
        </div>
  
        </>
    );
}

export default Tree;