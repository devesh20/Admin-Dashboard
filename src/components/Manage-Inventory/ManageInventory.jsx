import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Table, Popconfirm, Button, Space, Form } from 'antd'
import { isElement, isEmpty } from 'lodash'
import { data } from 'autoprefixer'


function ManageInventory() {
    const [gridData, setGridData] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingKey, setEditingKey] = useState("")
    const [editRow, setEdit] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
        setGridData(response.data)
        setLoading(false)
    }

    // console.log("gridData", gridData);

    const handleDelete = (value) => {
        const dataSource = [...modifiedData]
        const filteredData = dataSource.filter(item => item.id !== value.id)
        setGridData(filteredData)
    }

    const modifiedData = gridData.map(({body, ...item}) => (
        {
            ...item,
            key: item.id,
            comment: isEmpty(body) ? item.comment : body,
        }
    ))
    
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            align: "center",
            editable: true,
        },
        {
            title: "Comment",
            dataIndex: "comment",
            align: "center",
            editable: true,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            align: "center",
            render: (_, record) => {
                return modifiedData.length >= 1 ? (
                    <Space>
                    <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record)}
                    >
                        <Button type='primary' danger>
                            Delete
                        </Button>
                    </Popconfirm>
                    {editRow ? (
                        <span>
                            <Space size={"middle"}>
                            <Button
                            onClick={(e) => console.log(e)}
                            type='primary'
                            style={{marginRight: 8}}
                            >
                            Save
                            </Button>
                            <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={() => setEdit(false)}
                            >
                            <Button>Cancel</Button>
                            </Popconfirm>
                            </Space>
                        </span>

                    ) : (
                        <Button type='primary' onClick={() => setEdit(true)}>
                            Edit
                        </Button>
                    )}
                    </Space>
                ): null
            },
        },
    ];

    const isEditing = (record) => {
        return record.key === editingKey
    }

    const mergedColumns = columns.map((col) => {
        if(!col.editable){
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            })
        }
    })
    

  return (
    <div>
        <Table
        columns={mergedColumns}
        dataSource={modifiedData}
        bordered
        loading={loading}
        />

    </div>
  )
}

export default ManageInventory