import React, {useEffect, useState} from 'react'
import './userTable.css'
import { DataGrid} from '@mui/x-data-grid';
import {getAllAddresses, getAllUsers} from "../../services/UserService";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import CustomGoogleMap from "../GoogleMap/CustomGoogleMap";

const columns = [
    { field: 'email', headerName: 'Email', width: 300, sortable: false},
    { field: 'firstName', headerName: 'First name', width: 130, sortable: false },
    { field: 'lastName', headerName: 'Last name', width: 130, sortable: false },
    { field: 'address', headerName: 'Address', width: 130, sortable: false },
    { field: 'numOfFriends', headerName: 'Amount Of Friends', width: 140, sortable: false, valueGetter: (params) => `${ params.row?.friends?.length ||'0'}` },
    { field: 'createdAt', headerName: 'Created at', width: 180, sortable: false, valueGetter: (params) => {
            try{
                const creationDate = new Date(Number(params.row.creationDate))
                return `${creationDate.getUTCDate()}/${creationDate.getUTCMonth() + 1}/${creationDate.getUTCFullYear()} ${creationDate.getUTCHours()}:${creationDate.getUTCMinutes()}:${creationDate.getUTCSeconds()} UTC`
            }catch{
                return 'unknown'
            }
        }
    },
    {field: 'isAdmin', headerName: 'Admin', width: 120, sortable: false, renderCell: (params) => params.row?.isAdmin? <DoneIcon style={{color:"green"}}/> : <ClearIcon style={{color:"red"}}/>},
    {field: 'isDeleted', headerName: 'Is deleted', width: 120, sortable: false, renderCell: (params) => params.row?.isDeleted? <DoneIcon style={{color:"green"}}/> : <ClearIcon style={{color:"red"}}/>}

]

export default function UserTable(){
    const [allUserList,setAllUserList] = useState([])
    const [addressesList,setAddressesList] = useState(null)
    useEffect(() => {
        const initializeUserList = async () => {
            try{
                const userList = await getAllUsers()
                setAllUserList(userList)
            }catch{
                setAllUserList([])
            }
        }
        initializeUserList()
    }, [])
    useEffect(()=>{
        const initializeAddressesList = async () => {
            console.log('xxx')
            try{
                const list = await getAllAddresses()
                console.log(`list from server:`)
                console.log(list)
                setAddressesList([{lat:12,lng:32}])
            }catch (err){
                console.log(err)
                setAddressesList([])
            }finally {
                console.log(addressesList)
            }
        }
        initializeAddressesList()
    },[])
    return (
        <>
            <div className="userTable">
                <DataGrid
                    rows={allUserList ?? []}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    getRowId={user => user.email}
                />
            </div>
            {addressesList &&
                <div className="googleMap">
                    <CustomGoogleMap points={addressesList}/>
                </div>
            }
        </>
    )
}