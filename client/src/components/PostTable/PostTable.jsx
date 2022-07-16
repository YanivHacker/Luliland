import React, {useEffect, useState} from 'react'
import './postTable.css'
import { DataGrid} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import {getAllPosts} from "../../services/PostService";

const columns = [
    { field: '_id', headerName: 'ID', width: 300, sortable: false},
    { field: 'userEmail', headerName: 'Email', width: 300, sortable: false},
    { field: 'content', headerName: 'Content', width: 300, sortable: false},
    { field: 'numOfComments', headerName: 'Amount of comments', width: 160, sortable: false, valueGetter: (params) => `${ params.row?.allCommentIDs?.length ||'0'}` },
    { field: 'createdAt', headerName: 'Created at', width: 180, sortable: false, valueGetter: (params) => {
            try{
                const creationDate = new Date(Number(params.row.creationDate))
                return `${creationDate.getUTCDate()}/${creationDate.getUTCMonth() + 1}/${creationDate.getUTCFullYear()} ${creationDate.getUTCHours()}:${creationDate.getUTCMinutes()}:${creationDate.getUTCSeconds()} UTC`
            }catch{
                return 'unknown'
            }
        }
    },
    {field: 'isDeleted', headerName: 'Is deleted', width: 120, sortable: false, renderCell: (params) => params.row?.isDeleted? <DoneIcon style={{color:"green"}}/> : <ClearIcon style={{color:"red"}}/>}
]


export default function PostTable(){
    const [allPostList,setAllPostList] = useState()
    useEffect(() => {
        const initializePostList = async () => {
            try{
                const allPostList = await getAllPosts()
                setAllPostList(allPostList)
            }catch{
                setAllPostList([])
            }
        }
        initializePostList()
    }, [])
    return (
        <>
            <div className="userTable">
                <DataGrid
                    rows={allPostList ?? []}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    getRowId={post => post._id}
                />
            </div>
        </>
    )
}