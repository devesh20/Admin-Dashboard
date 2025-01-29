import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Table, Popconfirm, Button, Space, Form, Input } from 'antd'
import { isEmpty } from 'lodash'



function ManageInventory() {
    const [gridData, setGridData] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingKey, setEditingKey] = useState("")
    const [editRow, setEdit] = useState(false)
    const [form] = Form.useForm()

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
    
    const edit = (record) => {
        form.setFieldsValue({
            name: record.name || "",
            email: record.email || "",
            comment: record.comment || "",
            ...record
        });
        setEditingKey(record.key)
        setEdit(true)
    };

    const cancel = () => {
        setEditingKey("")

    }

    const save = async (key) => {
        try{
            const row = await form.validateFields()
            const newData = [...modifiedData]
            const index = newData.findIndex((item) => key === item.key)
            if(index > -1){
                const item = newData[index]
                newData.splice(index, 1, {...item, ...row})
                setGridData(newData)
                setEditingKey("")
            }
        }catch(error) {
            console.log("Error", error);
            
        }
    };

    const editableCell = ({
        editing,
        dataIndex,
        title,
        record,
        children,
        ...restProps

    }) => {
        const input = <Input/>
        return (
            <td {...restProps}>
                {editing ? 
                (
                    <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${title}`,
                        },
                    ]}
                    >
                        {input}
                    </Form.Item>
                ) : (
                    children
                )
                }
            </td>
        )
    }

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
                const editable = isEditing(record)
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
                    {editable ? (
                        <span>
                            <Space size={"middle"}>
                            <Button
                            onClick={(e) => save(record.key)}
                            type='primary'
                            style={{marginRight: 8}}
                            >
                            Save
                            </Button>
                            <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={cancel}
                            >
                            <Button>Cancel</Button>
                            </Popconfirm>
                            </Space>
                        </span>

                    ) : (
                        <Button type='primary' onClick={() => edit(record)}>
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
                form,
            }),
        }
    })
    

  return (
    <div>
        <Form form={form} component={false}>
            <Table
            components={{
                body: {
                    cell: editableCell,
                },
            }}
            columns={mergedColumns}
            dataSource={modifiedData}
            bordered
            loading={loading}
            />
        </Form>

    </div>
  )
}

export default ManageInventory